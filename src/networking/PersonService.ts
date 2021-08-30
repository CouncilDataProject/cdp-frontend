import ModelService from "./ModelService";
import { COLLECTION_NAME } from "./PopulationOptions";
import Person from "../models/Person";

export default class PersonService extends ModelService {
  constructor() {
    super("Person", "PersonService");
  }

  async getPersonById(personId: string): Promise<Person> {
    const networkResponse = this.networkService.getDocument(personId, COLLECTION_NAME.Person);
    return this.createModel(networkResponse, Person, `getPersonById(${personId})`);
  }
}
