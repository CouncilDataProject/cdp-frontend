import { ResponseData } from "../networking/NetworkResponse";
import firestoreTimestampToDate from "../utils/firestoreTimestampToDate";
import File from "./File";
import Body from "./Body";
import { Model } from "./Model";
import { DocumentReference } from "@firebase/firestore";

class Event implements Model {
  id: string;
  agenda_uri?: string;
  body_ref: string;
  body?: Body;
  event_datetime: Date;
  external_source_id?: string;
  hover_thumbnail_ref?: string;
  hover_thumbnail?: File;
  minutes_uri?: string;
  static_thumbnail_ref?: string;
  static_thumbnail?: File;

  constructor(jsonData: ResponseData) {
    this.id = jsonData["id"];

    if (jsonData["agenda_uri"]) {
      this.agenda_uri = jsonData["agenda_uri"];
    }

    if (jsonData["minutes_uri"]) {
      this.minutes_uri = jsonData["minutes_uri"];
    }

    this.body_ref = jsonData["body_ref"].id;

    if (typeof jsonData["body_ref"] === "object") {
      this.body = new Body(jsonData["body_ref"]);
    }

    this.event_datetime = firestoreTimestampToDate(jsonData["event_datetime"]);

    if (jsonData["external_source_id"]) {
      this.external_source_id = jsonData["external_source_id"];
    }

    if (jsonData["hover_thumbnail_ref"]) {
      if (jsonData["hover_thumbnail_ref"] instanceof DocumentReference) {
        this.hover_thumbnail_ref = jsonData["hover_thumbnail_ref"].id;
      } else if (typeof jsonData["hover_thumbnail_ref"] === "object") {
        this.hover_thumbnail = new File(jsonData["hover_thumbnail_ref"]);
      }
    }

    if (jsonData["static_thumbnail_ref"]) {
      if (jsonData["static_thumbnail_ref"] instanceof DocumentReference) {
        this.static_thumbnail_ref = jsonData["static_thumbnail_ref"].id;
      } else if (typeof jsonData["static_thumbnail_ref"] === "object") {
        this.static_thumbnail = new File(jsonData["static_thumbnail_ref"]);
      }
    }
  }
}

export default Event;
