import { ResponseData } from "../networking/NetworkResponse";
import EventMinutesItem from "./EventMinutesItem";
import { Model } from "./Model";
import { DocumentReference } from "firebase/firestore";
export default class EventMinutesItemFile implements Model {
  id: string;
  event_minutes_item_ref: string;
  event_minutes_item?: EventMinutesItem;
  external_source_id?: string;
  name: string;
  uri: string;

  constructor(jsonData: ResponseData) {
    this.id = jsonData["id"];

    this.event_minutes_item_ref = jsonData["event_minutes_item_ref"].id;

    if (
      typeof jsonData["event_minutes_item_ref"] === "object" &&
      !(jsonData["event_minutes_item_ref"] instanceof DocumentReference)
    ) {
      this.event_minutes_item = new EventMinutesItem(jsonData["event_minutes_item_ref"]);
    }

    if (jsonData["external_source_id"]) {
      this.external_source_id = jsonData["external_source_id"];
    }

    this.name = jsonData["name"];

    this.uri = jsonData["uri"];
  }
}
