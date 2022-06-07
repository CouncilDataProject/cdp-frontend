import { where, orderBy, doc, limit } from "@firebase/firestore";

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

  async getMostRecentCouncilMemberRoleBySeat(seatId: string): Promise<Role | null> {
    const populatePersonRef = new Populate(COLLECTION_NAME.Person, REF_PROPERTY_NAME.RolePersonRef);
    // it is possible for roles to have null end_datetime, meaning they are likely more recently-elected
    const openRolesNetworkResponse = this.networkService.getDocuments(
      COLLECTION_NAME.Role,
      [
        where(
          REF_PROPERTY_NAME.RoleSeatRef,
          WHERE_OPERATOR.eq,
          doc(NetworkService.getDb(), COLLECTION_NAME.Seat, seatId)
        ),
        where("end_datetime", WHERE_OPERATOR.eq, null),
        limit(1),
        orderBy("start_datetime", ORDER_DIRECTION.desc),
      ],
      new PopulationOptions([populatePersonRef])
    );
    const openEnddateRoles = await this.createModels(
      openRolesNetworkResponse,
      Role,
      `getMostRecentCouncilMemberRoleBySeatWithNullEndDates`
    );
    if (openEnddateRoles[0]) {
      return Promise.resolve(openEnddateRoles[0] as Role); // early return, null end_datetimes take priority
    }
    // otherwise, search for the role by ordered end_datetime
    const networkQueryResponse = this.networkService.getDocuments(
      COLLECTION_NAME.Role,
      [
        where(
          REF_PROPERTY_NAME.RoleSeatRef,
          WHERE_OPERATOR.eq,
          doc(NetworkService.getDb(), COLLECTION_NAME.Seat, seatId)
        ),
        limit(1),
        orderBy("end_datetime", ORDER_DIRECTION.desc),
      ],
      new PopulationOptions([populatePersonRef])
    );
    const roles = await this.createModels(
      networkQueryResponse,
      Role,
      `getMostRecentCouncilMemberRoleBySeat`
    );
    if (roles[0]) {
      return Promise.resolve(roles[0] as Role);
    } else {
      return Promise.resolve(null);
    }
  }
}
