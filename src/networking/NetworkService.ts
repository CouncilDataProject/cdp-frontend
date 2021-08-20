/**
 * The NetworkService class defines the `getInstance` method that lets clients access
 * the unique NetworkService instance. I wanted to do this since we only want/need 1 firebase instance.
 */
import { initializeApp } from "firebase/app";
import {
  FirebaseFirestore,
  getFirestore,
  getDoc,
  doc,
  initializeFirestore,
  Settings,
} from "firebase/firestore";
import { NetworkResponse } from "./NetworkResponse";

export class NetworkService {
  private static instance: NetworkService;
  private static db: FirebaseFirestore;
  /**
   * The NetworkService's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    // initialize firebase
    const firebaseApp = initializeApp({
      projectId: "cdp-jackson-dev-002",
    });
    let settings: Settings = {
      // merge bool Whether to merge the provided settings with the existing settings. If set to true, the settings are merged with existing settings. If set to false or left unset, the settings replace the existing settings.
      // ssl bool Whether to use SSL when connecting.
      // ignoreUndefinedProperties bool Whether to skip nested properties that are set to undefined during object serialization. If set to true, these properties are skipped and not written to Firestore. If set to false or omitted, the SDK throws an exception when it encounters properties of type undefined.
      // cacheSizeBytes bool An approximate cache size threshold for the on-disk data. If the cache grows beyond this size, Firestore will start removing data that hasn't been recently used. The size is not a guarantee that the cache will stay below that size, only that if the cache exceeds the given size, cleanup will be attempted.
      // The default value is 40 MB. The threshold must be set to at least 1 MB, and can be set to CACHE_SIZE_UNLIMITED to disable garbage collection.
    };
    initializeFirestore(firebaseApp, settings);
    NetworkService.db = getFirestore();
  }

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the NetworkService class while keeping
   * just one instance of each subclass around.
   */

  public static getInstance(): NetworkService {
    if (!NetworkService.instance) {
      NetworkService.instance = new NetworkService();
    }
    return NetworkService.instance;
  }

  /**
   * Why am I doing things this way - doesn't this effectively eat errors by not sending errors via Promise.reject?
   * It does, but this should allow documents to be fetched EVEN IF they have problems in populating foreign keys.
   * Also it will successfully fetch a bunch of documents using Promise.all() - no need for allSettled which afaik is unavailable.
   */

  public async getDocument(
    documentId: string,
    collectionName: string,
    populationOptions
  ): Promise<NetworkResponse> {
    const documentRef = doc(NetworkService.db, collectionName, documentId);
    const docSnap = await getDoc(documentRef);
    let response = new NetworkResponse();
    if (docSnap.exists()) {
      response.data = docSnap.data();
    } else {
      response.error = new Error(
        `Document ${documentId} does not exist in Collection ${collectionName}.`
      );
    }
    return Promise.resolve(response);
  }
}
