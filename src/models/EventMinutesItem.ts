import { ResponseData } from "../networking/NetworkResponse";
import Event from "./Event";
import MinutesItem from "./MinutesItem";
import { Model } from "./Model";
import { DocumentReference } from "@firebase/firestore";

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

    if (jsonData["event_ref"]) {
      if (jsonData["event_ref"] instanceof DocumentReference) {
        this.event_ref = jsonData["event_ref"].id;
      } else if (typeof jsonData["event_ref"] === "object") {
        this.event = new Event(jsonData["event_ref"]);
      }
    }

    if (jsonData["external_source_id"]) {
      this.external_source_id = jsonData["external_source_id"];
    }

    if (jsonData["index"]) {
      this.index = jsonData["index"];
    }

    if (jsonData["minutes_item_ref"]) {
      if (jsonData["minutes_item_ref"] instanceof DocumentReference) {
        this.minutes_item_ref = jsonData["minutes_item_ref"].id;
      } else if (typeof jsonData["minutes_item_ref"] === "object") {
        this.minutes_item = new MinutesItem(jsonData["minutes_item_ref"]);
      }
    }
  }
}
