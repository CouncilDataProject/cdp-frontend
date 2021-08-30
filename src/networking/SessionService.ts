import { where, orderBy, doc } from "@firebase/firestore";

import { NetworkService } from "./NetworkService";
import ModelService from "./ModelService";
import { COLLECTION_NAME, REF_PROPERTY_NAME } from "./PopulationOptions";
import { WHERE_OPERATOR } from "./constants";

import Session from "../models/Session";

export default class SessionService extends ModelService {
  constructor() {
    super(COLLECTION_NAME.Session);
  }

  async getSessionsByEventId(eventId: string): Promise<Session[]> {
    const networkQueryResponse = this.networkService.getDocuments(COLLECTION_NAME.Session, [
      where(
        REF_PROPERTY_NAME.SessionEventRef,
        WHERE_OPERATOR.eq,
        doc(NetworkService.getDb(), COLLECTION_NAME.Event, eventId)
      ),
      orderBy("session_index"),
    ]);
    return this.createModels(networkQueryResponse, Session, `getSessionsByEventId(${eventId})`);
  }
}
