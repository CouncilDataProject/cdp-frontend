import ModelService from "./ModelService";
import { COLLECTION_NAME } from "./PopulationOptions";
import Person from "../models/Person";
import { FirebaseConfig } from "../app/AppConfigContext";

export default class PersonService extends ModelService {
  constructor(firebaseConfig: FirebaseConfig) {
    super(COLLECTION_NAME.Person, firebaseConfig);
  }

  async getPersonById(personId: string): Promise<Person> {
    const networkResponse = this.networkService.getDocument(personId, COLLECTION_NAME.Person);
    return this.createModel(networkResponse, Person, `getPersonById(${personId})`);
  }
}
