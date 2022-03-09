import Person from "../../models/Person";
import Role from "../../models/Role";

import { FetchDataState } from "../FetchDataContainer/useFetchData";

export interface PersonPageData {
  /** The person */
  person: Person;
  /** roles held by the person with only body populated */
  roles: Role[];
  /** Councilmember roles with only seat populated */
  councilMemberRoles: Role[];
  /** Picture src of the person */
  personPictureSrc: FetchDataState<string | null>;
  /** Picture of the seat for the person's recent councilmember role */
  seatPictureSrc: FetchDataState<string | null>;
}
