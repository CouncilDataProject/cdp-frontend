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

  // def get_person_short_info(person: db_models.Person):
  //   # Get their latest highest ranking, either CM or CP
  //   # Latest can somewhat be "last known" and since we have an optional end_datetime value, where None / null represent "still is active"
  //   # we filter for role with tile, person, and end_datetime value of none

  //   # If this errors, I would just rollback to default person page, some standard person image and some standard person banner
  //   latest_cm_role = list(
  //       db_models.Role.collection
  //           .filter("title", "==", "Councilmember")
  //           .filter("person_ref", "==", person.key)
  //           .filter("end_datetime", "==", None)
  //           .fetch(1)
  //   )[0]

  //   # See if the person is also council president
  //   latest_cp_role = list(
  //       db_models.Role.collection
  //           .filter("title", "==", "Council President")
  //           .filter("person_ref", "==", person.key)
  //           .filter("end_datetime", "==", None)
  //           .fetch(1)
  //   )
  //   if len(latest_cp_role) == 0:
  //       person_highest_role = latest_cm_role
  //   else:
  //       person_highest_role = latest_cp_role[0]

  //   # Get the seat for which they are the latest council member
  //   latest_cm_seat = latest_cm_role.seat_ref.get()

  //   # Get all CM terms
  //   all_cm_terms = list(
  //       db_models.Role.collection
  //           .filter("title", "==", "Councilmember")
  //           .filter("person_ref", "==", person.key)
  //           .fetch()
  //   )
  //   n_terms = len(all_cm_terms)

  //   # Get body memberships
  //   committee_chair_roles = list(
  //       db_models.Role.collection
  //           .filter("title", "==", "Chair")
  //           .filter("person_ref", "==", person.key)
  //           .filter("end_datetime", "==", None)
  //           .fetch()
  //   )
  //   committee_vice_chair_roles = list(
  //       db_models.Role.collection
  //           .filter("title", "==", "Vice Chair")
  //           .filter("person_ref", "==", person.key)
  //           .filter("end_datetime", "==", None)
  //           .fetch()
  //   )
  //   committee_member_roles = list(
  //       db_models.Role.collection
  //           .filter("title", "==", "Member")
  //           .filter("person_ref", "==", person.key)
  //           .filter("end_datetime", "==", None)
  //           .fetch()
  //   )

  //   chair_bodies = [r.body_ref.get().name for r in committee_chair_roles]
  //   vice_chair_bodies = [r.body_ref.get().name for r in committee_vice_chair_roles]
  //   member_bodies = [r.body_ref.get().name for r in committee_member_roles]

  //   # Get bills sponsored
  //   n_matters_sponsored = len(list(db_models.MatterSponsor.collection.filter("person_ref", "==", person.key).fetch()))

  //   # Prepare message
  //   message = f"""
  //   {person_highest_role.title} {person.name}
  //   is the {latest_cm_role.title} for <CITY NAME>'s {latest_cm_seat.name}
  //   ({latest_cm_seat.electoral_area}).

  //   {person.name} is serving their {n_terms} term.
  //   """

  //   if len(chair_bodies) > 0:
  //       message = f"{message}They currently serve as Chair of the {chair_bodies} committees."
  //   if len(vice_chair_bodies) > 0:
  //       message = f"{message} They currently serve as Vice Chair of the {vice_chair_bodies} committees."

  //   message = f"{message} They are a member of {member_bodies} committees."

  //   message = f"{message} They have sponsored {n_matters_sponsored} pieces of legislation."

  //   print(message)
}
