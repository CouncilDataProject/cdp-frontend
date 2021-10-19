import MatterSponsor from "../../models/MatterSponsor";
import Person from "../../models/Person";
import Role from "../../models/Role";
import Vote from "../../models/Vote";

export interface PersonPageData {
  /**The person */
  person: Person;
  /** Votes */
  votes: Vote[];
  /** matters sponsored by the person */
  mattersSponsored: MatterSponsor[];
  /** roles held by the person */
  roles: Role[];
}
