import ModelService from "./ModelService";
import {
  COLLECTION_NAME,
  Populate,
  PopulationOptions,
  REF_PROPERTY_NAME,
} from "./PopulationOptions";

import Event from "../models/Event";

export default class EventService extends ModelService {
  constructor() {
    super("Event", "EventService");
  }

  async getEventById(eventId: string): Promise<Event> {
    const networkResponse = this.networkService.getDocument(
      eventId,
      COLLECTION_NAME.Event,
      new PopulationOptions([new Populate(COLLECTION_NAME.Body, REF_PROPERTY_NAME.EventBodyRef)])
    );
    return this.createModel(networkResponse, Event, "getEventById");
  }
}
