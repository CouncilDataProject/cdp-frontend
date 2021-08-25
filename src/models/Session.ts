import { ResponseData } from "../networking/NetworkResponse";
import firestoreTimestampToDate from "../utils/firestoreTimestampToDate";
import Event from "./Event";

export default class Session {
  caption_uri?: string;
  event_ref?: string;
  event?: Event;
  external_source_id?: string;
  session_datetime?: Date;
  session_index?: number;
  video_uri?: string;

  constructor(jsonData: ResponseData) {
    if (jsonData["caption_uri"]) {
      this.caption_uri = jsonData["caption_uri"];
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

    if (jsonData["session_datetime"]) {
      this.session_datetime = firestoreTimestampToDate(jsonData["session_datetime"]);
    }

    if (jsonData["video_uri"]) {
      this.video_uri = jsonData["video_uri"];
    }
  }
}
