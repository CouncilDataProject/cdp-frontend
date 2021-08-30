import { ResponseData } from "../networking/NetworkResponse";
import Event from "./Event";
import MinutesItem from "./MinutesItem";
import { Model } from "./Model";

export default class EventMinutesItem implements Model {
  id?: string;
  decision?: string;
  event_ref?: string;
  event?: Event;
  external_source_id?: string;
  index?: number;
  minutes_item_ref?: string;
  minutes_item?: MinutesItem;

  constructor(jsonData: ResponseData) {
    if (jsonData["id"]) {
      this.id = jsonData["id"];
    }

    if (jsonData["decision"]) {
      this.decision = jsonData["decision"];
    }

    if (jsonData["event_ref"] && typeof jsonData["event_ref"] === "string") {
      this.event_ref = jsonData["event_ref"];
    }

    if (jsonData["event_ref"] && typeof jsonData["event_ref"] === "object") {
      this.event = new Event(jsonData["event_ref"]);
    }

    if (jsonData["external_source_id"]) {
      this.external_source_id = jsonData["external_source_id"];
    }

    if (jsonData["index"]) {
      this.index = jsonData["index"];
    }

    if (jsonData["minutes_item_ref"] && typeof jsonData["minutes_item_ref"] === "string") {
      this.minutes_item_ref = jsonData["minutes_item_ref"];
    }

    if (jsonData["minutes_item_ref"] && typeof jsonData["minutes_item_ref"] === "object") {
      this.minutes_item = new MinutesItem(jsonData["minutes_item_ref"]);
    }
  }
}
