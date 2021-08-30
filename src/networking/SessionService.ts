import { where, orderBy } from "@firebase/firestore";

import ModelService from "./ModelService";
import { COLLECTION_NAME, REF_PROPERTY_NAME } from "./PopulationOptions";
import { WHERE_OPERATOR } from "./constants";

import Session from "../models/Session";

export default class SessionService extends ModelService {
  constructor() {
    super("Session", "SessionService");
  }

  async getSessionsByEventId(eventId: string): Promise<Session[]> {
    const networkQueryResponse = this.networkService.getDocuments(COLLECTION_NAME.Session, [
      where(REF_PROPERTY_NAME.SessionEventRef, WHERE_OPERATOR.eq, eventId),
      orderBy("session_index"),
    ]);
    return this.createModels(networkQueryResponse, Session, "getSessionsByEventId");
  }
}
