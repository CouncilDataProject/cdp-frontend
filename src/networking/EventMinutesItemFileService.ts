import { where, orderBy } from "@firebase/firestore";

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
          eventMinutesItemId
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
