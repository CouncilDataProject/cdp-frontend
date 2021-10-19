import { where, orderBy, doc } from "@firebase/firestore";

import { NetworkService } from "./NetworkService";
import ModelService from "./ModelService";
import {
  COLLECTION_NAME,
  REF_PROPERTY_NAME,
  Populate,
  PopulationOptions,
} from "./PopulationOptions";
import { ORDER_DIRECTION, WHERE_OPERATOR } from "./constants";

import Role from "../models/Role";
import { FirebaseConfig } from "../app/AppConfigContext";

export default class RoleService extends ModelService {
  constructor(firebaseConfig: FirebaseConfig) {
    super(COLLECTION_NAME.Role, firebaseConfig);
  }

  /*
  @param the id of the person
  @return all roles held by the person, ordered most-recent first
  */
  async getRolesByPersonId(personId: string): Promise<Role[]> {
    const networkQueryResponse = this.networkService.getDocuments(COLLECTION_NAME.Role, [
      where(
        REF_PROPERTY_NAME.RolePersonRef,
        WHERE_OPERATOR.eq,
        doc(NetworkService.getDb(), COLLECTION_NAME.Person, personId)
      ),
      orderBy("start_datetime", ORDER_DIRECTION.desc),
    ]);
    return this.createModels(networkQueryResponse, Role, `getSessionsByPersonId(${personId})`);
  }

  async getPopulatedRolesByPersonId(personId: string): Promise<Role[]> {
    const populateBodyRef = new Populate(COLLECTION_NAME.Body, REF_PROPERTY_NAME.RoleBodyRef);

    const populateSeatRef = new Populate(COLLECTION_NAME.Seat, REF_PROPERTY_NAME.RoleSeatRef);

    const networkQueryResponse = this.networkService.getDocuments(
      COLLECTION_NAME.Role,
      [
        where(
          REF_PROPERTY_NAME.RolePersonRef,
          WHERE_OPERATOR.eq,
          doc(NetworkService.getDb(), COLLECTION_NAME.Person, personId)
        ),
        orderBy("start_datetime", ORDER_DIRECTION.desc),
      ],
      new PopulationOptions([populateBodyRef, populateSeatRef])
    );
    return this.createModels(
      networkQueryResponse,
      Role,
      `getPopulatedRolesByPersonId(${personId})`
    );
  }

  async getCurrentRoles(): Promise<Role[]> {
    const populatePersonRef = new Populate(COLLECTION_NAME.Person, REF_PROPERTY_NAME.RolePersonRef);

    const networkQueryResponse = this.networkService.getDocuments(
      COLLECTION_NAME.Role,
      [where("end_datetime", WHERE_OPERATOR.eq, null)],
      new PopulationOptions([populatePersonRef])
    );
    return this.createModels(networkQueryResponse, Role, `getCurrentRoles`);
  }
}
