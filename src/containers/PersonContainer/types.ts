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
  /** roles held by the person with only body populated */
  roles: Role[];
  /** Councilmember roles with only seat populated */
  councilMemberRoles: Role[];
  /** Picture src of the person */
  personPictureSrc?: string;
  /** Picture of the seat for the person's recent councilmember role */
  seatPictureSrc?: string;
}
