import { NetworkService } from "./NetworkService";
import { COLLECTION_NAME } from "./PopulationOptions";
import Person from "../models/Person";

export class PersonService {
  networkService: NetworkService = NetworkService.getInstance();

  async getPerson(personId: string): Promise<Person> {
    return this.networkService
      .getDocument(personId, COLLECTION_NAME.Person, undefined)
      .then((response) => {
        if (response.error) {
          return Promise.reject(response.error);
        }
        // we want to make a Person Model and have this return it
        if (response.data) {
          return Promise.resolve(new Person(response.data));
        } else {
          return Promise.reject(new Error("No data to create person."));
        }
      })
      .catch((error) => {
        error.messsage = `PersonService_getPerson_${error.message}`;
        return Promise.reject(error);
      });
  }
}
