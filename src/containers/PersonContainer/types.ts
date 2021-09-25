import Person from "../../models/Person";
import Vote from "../../models/Vote";

export interface PersonPageData {
  /**The person */
  person: Person;
  /** Votes */
  votes: Vote[];
}
