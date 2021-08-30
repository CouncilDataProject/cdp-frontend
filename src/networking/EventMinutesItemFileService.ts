import { where, orderBy, doc } from "@firebase/firestore";

import { NetworkService } from "./NetworkService";
import ModelService from "./ModelService";
import { COLLECTION_NAME, REF_PROPERTY_NAME } from "./PopulationOptions";
import { WHERE_OPERATOR } from "./constants";

import EventMinutesItemFile from "../models/EventMinutesItemFile";

export default class EventMinutesItemFileService extends ModelService {
  constructor() {
    super("EventMinutesItemFile", "EventMinutesItemFileService");
  }

  async getEventMinutesItemFilesByEventMinutesItemId(
    eventMinutesItemId: string
  ): Promise<EventMinutesItemFile[]> {
    const networkQueryResponse = this.networkService.getDocuments(
      COLLECTION_NAME.EventMinutesItemFile,
      [
        where(
          REF_PROPERTY_NAME.EventMinutesItemFileEventMinutesItemRef,
          WHERE_OPERATOR.eq,
          doc(NetworkService.getDb(), COLLECTION_NAME.EventMinutesItem, eventMinutesItemId)
        ),
        orderBy("name"),
      ]
    );
    return this.createModels(
      networkQueryResponse,
      EventMinutesItemFile,
      `getEventMinutesItemFilesByEventMinutesItemId(${eventMinutesItemId})`
    );
  }
}
