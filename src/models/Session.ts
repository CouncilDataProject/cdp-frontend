import { ResponseData } from "../networking/NetworkResponse";
import firestoreTimestampToDate from "../utils/firestoreTimestampToDate";
import Event from "./Event";
import { Model } from "./Model";
import { DocumentReference } from "@firebase/firestore";

export default class Session implements Model {
  id?: string;
  caption_uri?: string;
  event_ref?: string;
  event?: Event;
  external_source_id?: string;
  session_datetime?: Date;
  session_index?: number;
  video_uri?: string;

  constructor(jsonData: ResponseData) {
    if (jsonData["id"]) {
      this.id = jsonData["id"];
    }

    if (jsonData["caption_uri"]) {
      this.caption_uri = jsonData["caption_uri"];
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

    if (jsonData["session_datetime"]) {
      this.session_datetime = firestoreTimestampToDate(jsonData["session_datetime"]);
    }

    if (jsonData["video_uri"]) {
      this.video_uri = jsonData["video_uri"];
    }

    if (jsonData["session_index"]) {
      this.session_index = jsonData["session_index"];
    }
  }
}
