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

import { ROLE_TITLE } from "../models/constants";
import Role from "../models/Role";

import { FirebaseConfig } from "../app/AppConfigContext";

export default class RoleService extends ModelService {
  constructor(firebaseConfig: FirebaseConfig) {
    super(COLLECTION_NAME.Role, firebaseConfig);
  }

  async getPopulatedRolesByPersonId(personId: string): Promise<Role[]> {
    const populateBodyRef = new Populate(COLLECTION_NAME.Body, REF_PROPERTY_NAME.RoleBodyRef);

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
      new PopulationOptions([populateBodyRef])
    );
    return this.createModels(
      networkQueryResponse,
      Role,
      `getPopulatedRolesByPersonId(${personId})`
    ) as Promise<Role[]>;
  }

  async getCouncilMemberRolesByPersonId(personId: string): Promise<Role[]> {
    const populateSeatRef = new Populate(COLLECTION_NAME.Seat, REF_PROPERTY_NAME.RoleSeatRef);

    const networkQueryResponse = this.networkService.getDocuments(
      COLLECTION_NAME.Role,
      [
        where(
          REF_PROPERTY_NAME.RolePersonRef,
          WHERE_OPERATOR.eq,
          doc(NetworkService.getDb(), COLLECTION_NAME.Person, personId)
        ),
        where("title", WHERE_OPERATOR.eq, ROLE_TITLE.COUNCILMEMBER),
        orderBy("start_datetime", ORDER_DIRECTION.desc),
      ],
      new PopulationOptions([populateSeatRef])
    );
    return this.createModels(
      networkQueryResponse,
      Role,
      `getCouncilMemberRolesByPersonId(${personId})`
    ) as Promise<Role[]>;
  }

  async getCurrentRoles(): Promise<Role[]> {
    const populatePersonRef = new Populate(COLLECTION_NAME.Person, REF_PROPERTY_NAME.RolePersonRef);

    const networkQueryResponse = this.networkService.getDocuments(
      COLLECTION_NAME.Role,
      [where("end_datetime", WHERE_OPERATOR.eq, null)],
      new PopulationOptions([populatePersonRef])
    );
    return this.createModels(networkQueryResponse, Role, `getCurrentRoles`) as Promise<Role[]>;
  }
}
