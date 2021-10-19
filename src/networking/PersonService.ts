import ModelService from "./ModelService";
import {
  COLLECTION_NAME,
  Populate,
  REF_PROPERTY_NAME,
  PopulationOptions,
} from "./PopulationOptions";
import Person from "../models/Person";
import { FirebaseConfig } from "../app/AppConfigContext";

export default class PersonService extends ModelService {
  constructor(firebaseConfig: FirebaseConfig) {
    super(COLLECTION_NAME.Person, firebaseConfig);
  }

  async getPersonById(personId: string): Promise<Person> {
    console.log(`fetching id: ${personId}`);
    const populatePersonAvatar = new Populate(
      COLLECTION_NAME.Person,
      REF_PROPERTY_NAME.PersonPictureRef
    );
    const networkResponse = this.networkService.getDocument(
      personId,
      COLLECTION_NAME.Person,
      new PopulationOptions([populatePersonAvatar])
    );
    return this.createModel(networkResponse, Person, `getPersonById(${personId})`);
  }

  async getAllPeople(): Promise<Person[]> {
    const networkResponse = this.networkService.getDocuments(COLLECTION_NAME.Person, []);

    return this.createModels(networkResponse, Person, `getAllPeople`);
  }
}
