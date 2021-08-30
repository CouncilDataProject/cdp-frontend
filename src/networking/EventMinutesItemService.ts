import { where, orderBy, doc } from "@firebase/firestore";

import { NetworkService } from "./NetworkService";
import ModelService from "./ModelService";
import {
  COLLECTION_NAME,
  Populate,
  PopulationOptions,
  REF_PROPERTY_NAME,
} from "./PopulationOptions";
import { WHERE_OPERATOR } from "./constants";

import EventMinutesItem from "../models/EventMinutesItem";

export default class EventMinutesItemService extends ModelService {
  constructor() {
    super("EventMinutesItem", "EventMinutesItemService");
  }

  async getEventMinutesItemsByEventId(eventId: string): Promise<EventMinutesItem[]> {
    const networkQueryResponse = this.networkService.getDocuments(
      COLLECTION_NAME.EventMinutesItem,
      [
        where(
          REF_PROPERTY_NAME.EventMinutesItemEventRef,
          WHERE_OPERATOR.eq,
          doc(NetworkService.getDb(), COLLECTION_NAME.Event, eventId)
        ),
        orderBy("index"),
      ],
      new PopulationOptions([
        //populate the minutes item along with its matter ref
        new Populate(
          COLLECTION_NAME.MinutesItem,
          REF_PROPERTY_NAME.EventMinutesItemMinutesItemRef,
          new PopulationOptions([
            new Populate(COLLECTION_NAME.Matter, REF_PROPERTY_NAME.MinutesItemMatterRef),
          ])
        ),
      ])
    );
    return this.createModels(
      networkQueryResponse,
      EventMinutesItem,
      `getEventMinutesItemsByEventId(${eventId})`
    );
  }
}
