/**
 * The NetworkService class defines the `getInstance` method that lets clients access
 * the unique NetworkService instance. I wanted to do this since we only want/need 1 firebase instance.
 */
import { initializeApp, FirebaseOptions } from "firebase/app";
import {
  Firestore,
  getFirestore,
  getDoc,
  doc,
  initializeFirestore,
  FirestoreSettings,
  collection,
  query,
  getDocs,
  DocumentData,
  QueryConstraint,
} from "firebase/firestore";
import {
  NetworkResponse,
  ResponseData,
  NetworkQueryResponse,
  NoDocumentsError,
} from "./NetworkResponse";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  PopulationOptions,
  Populate,
  COLLECTION_NAME,
  getCollectionForReference,
} from "./PopulationOptions";
import { createError } from "../utils/createError";

export class NetworkService {
  private static instance: NetworkService;
  private static db: Firestore;
  /**
   * The NetworkService's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor(firebaseOptions: FirebaseOptions, settings: FirestoreSettings) {
    // initialize firebase
    const firebaseApp = initializeApp(firebaseOptions);
    initializeFirestore(firebaseApp, settings);
    NetworkService.db = getFirestore();
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the NetworkService class while keeping
   * just one instance of each subclass around.
   */

  public static getInstance(
    firebaseOptions: FirebaseOptions,
    settings: FirestoreSettings
  ): NetworkService {
    if (!NetworkService.instance) {
      NetworkService.instance = new NetworkService(firebaseOptions, settings);
    }
    return NetworkService.instance;
  }

  public static getDb(): Firestore {
    return NetworkService.db;
  }

  private collateDocumentData(
    cascade: Promise<NetworkResponse>[],
    refsToPopulate: string[],
    parent: NetworkResponse
  ): Promise<NetworkResponse> {
    return Promise.all(cascade)
      .then((cascadeResponses) => {
        cascadeResponses.forEach((cascadeResponse, index) => {
          if (parent.data) {
            parent.data[refsToPopulate[index]] = cascadeResponse.data;
          }
        });
        return Promise.resolve(parent);
      })
      .catch((error) => {
        parent.error = error;
        return Promise.resolve(parent);
      });
  }

  /**
   * Why am I doing things this way - doesn't this effectively eat errors by not sending errors via Promise.reject?
   * It does, but this should allow documents to be fetched EVEN IF they have problems in populating foreign keys.
   * Also it will successfully fetch a bunch of documents using Promise.all() - no need for allSettled which afaik is unavailable.
   */
  public async getDocument(
    documentId: string,
    collectionName: COLLECTION_NAME,
    populationOptions?: PopulationOptions
  ): Promise<NetworkResponse> {
    const documentRef = doc(NetworkService.db, collectionName, documentId);
    const response = new NetworkResponse();
    return getDoc(documentRef)
      .then((docSnap) => {
        if (!docSnap.exists()) {
          return Promise.reject(
            new Error(`Document ${documentId} does not exist in Collection ${collectionName}.`)
          );
        }
        const data: ResponseData = docSnap.data();
        data.id = docSnap.id;
        response.data = data;
        if (populationOptions && populationOptions.toPopulate) {
          const cascade: Promise<NetworkResponse>[] = [];
          const refsToPopulate: string[] = [];
          populationOptions.toPopulate
            .filter((docRefToPopulate: Populate) => {
              // this may not exist because some documents may have optionally populated refs
              return data[docRefToPopulate.refName];
            })
            .forEach((docRefToPopulate: Populate) => {
              // these will not be null
              const refValueToPopulate = data[docRefToPopulate.refName].id;
              const refsCollection = getCollectionForReference(docRefToPopulate.refName);
              if (refValueToPopulate && refsCollection) {
                cascade.push(
                  this.getDocument(refValueToPopulate, refsCollection, docRefToPopulate.cascade)
                );
                refsToPopulate.push(docRefToPopulate.refName);
              }
            });
          return this.collateDocumentData(cascade, refsToPopulate, response);
        } else {
          return Promise.resolve(response);
        }
      })
      .catch((error) => {
        response.error = error;
        return Promise.resolve(response);
      });
  }

  public async getDocuments(
    collectionName: COLLECTION_NAME,
    queryConstraints: QueryConstraint[],
    populationOptions?: PopulationOptions
  ): Promise<NetworkQueryResponse> {
    //Get the collection ref
    const collectionRef = collection(NetworkService.db, collectionName);
    //Create the query
    const q = query(collectionRef, ...queryConstraints);
    const response = new NetworkQueryResponse();
    try {
      //Execute the query
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        throw new NoDocumentsError(collectionName);
      }
      const querySnapshotData: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        //Get the data for each doc
        const docData = doc.data();
        docData.id = doc.id;
        querySnapshotData.push(docData);
      });
      if (populationOptions && populationOptions.toPopulate) {
        const collatePromises: Promise<NetworkResponse>[] = [];
        querySnapshotData.forEach((doc) => {
          //Create cascade for each doc
          const cascade: Promise<NetworkResponse>[] = [];
          const refsToPopulate: string[] = [];
          const parent = new NetworkResponse();
          parent.data = doc;
          populationOptions?.toPopulate?.forEach((docRefToPopulate: Populate) => {
            //Get the document reference id
            const refValueToPopulate = doc[docRefToPopulate.refName].id;
            const refsCollection = getCollectionForReference(docRefToPopulate.refName);
            if (refValueToPopulate && refsCollection) {
              //Add population to cascade
              cascade.push(
                this.getDocument(refValueToPopulate, refsCollection, docRefToPopulate.cascade)
              );
              refsToPopulate.push(docRefToPopulate.refName);
            }
          });
          //Add collated document data promise for each doc
          collatePromises.push(this.collateDocumentData(cascade, refsToPopulate, parent));
        });
        //Get all the network responses
        const networkRespones = await Promise.all(collatePromises);
        //Collect only the response data, each response data is non-null
        const collatedData = networkRespones.map(({ data }) => data as ResponseData);
        response.data = collatedData;
        //Return the response
        return Promise.resolve(response);
      } else {
        //Don't need to populate
        response.data = querySnapshotData;
        return Promise.resolve(response);
      }
    } catch (error) {
      response.error = createError(error);
      return Promise.resolve(response);
    }
  }

  /** Download json from the given uri in firestorage */
  async downloadJson(uri: string): Promise<NetworkResponse> {
    const storage = getStorage();
    const pathReference = ref(storage, uri);
    const response = new NetworkResponse();
    try {
      const url = await getDownloadURL(pathReference);
      const file = await fetch(url).then((res) => res.json());
      if (!file) {
        throw new Error(`No JSON found for uri: ${uri}`);
      }
      response.data = file;
    } catch (err) {
      const error = createError(err);
      response.error = error;
    } finally {
      return Promise.resolve(response);
    }
  }
}
