import Person from "../../models/Person";
import Role from "../../models/Role";

export interface PeoplePageData {
  /**The currently-elected people */
  currentPeople: Role[];
  /** all people */
  allPeople: Person[];
}
