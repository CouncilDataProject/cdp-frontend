import { ResponseData } from "../networking/NetworkResponse";
import EventMinutesItem from "./EventMinutesItem";
import { Model } from "./Model";
import { DocumentReference } from "@firebase/firestore";

export default class EventMinutesItemFile implements Model {
  id?: string;
  event_minutes_item_ref?: string;
  event_minutes_item?: EventMinutesItem;
  external_source_id?: string;
  name?: string;
  uri?: string;

  constructor(jsonData: ResponseData) {
    if (jsonData["id"]) {
      this.id = jsonData["id"];
    }

    if (jsonData["event_minutes_item_ref"]) {
      if (jsonData["event_minutes_item_ref"] instanceof DocumentReference) {
        this.event_minutes_item_ref = jsonData["event_minutes_item_ref"].id;
      } else if (typeof jsonData["event_minutes_item_ref"] === "object") {
        this.event_minutes_item = new EventMinutesItem(jsonData["event_minutes_item_ref"]);
      }
    }

    if (jsonData["external_source_id"]) {
      this.external_source_id = jsonData["external_source_id"];
    }

    if (jsonData["name"]) {
      this.name = jsonData["name"];
    }

    if (jsonData["uri"]) {
      this.uri = jsonData["uri"];
    }
  }
}
