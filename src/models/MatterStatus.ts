import Matter from "./Matter";
import { ResponseData } from "../networking/NetworkResponse";
import EventMinutesItem from "./EventMinutesItem";
import firestoreTimestampToDate from "../utils/firestoreTimestampToDate";
import { Model } from "./Model";
import { DocumentReference } from "@firebase/firestore";

export default class MatterStatus implements Model {
  id?: string;
  event_minutes_item_ref?: string;
  event_minutes_item?: EventMinutesItem;
  external_source_id?: string;
  matter_ref?: string;
  matter?: Matter;
  status?: string;
  update_datetime?: Date;

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

    if (jsonData["matter_ref"]) {
      if (jsonData["matter_ref"] instanceof DocumentReference) {
        this.matter_ref = jsonData["matter_ref"].id;
      } else if (typeof jsonData["matter_ref"] === "object") {
        this.matter = new Matter(jsonData["matter_ref"]);
      }
    }

    if (jsonData["status"]) {
      this.status = jsonData["status"];
    }

    if (jsonData["update_datetime"]) {
      this.update_datetime = firestoreTimestampToDate(jsonData["update_datetime"]);
    }
  }
}
