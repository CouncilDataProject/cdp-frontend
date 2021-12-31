import { ResponseData } from "../networking/NetworkResponse";
import firestoreTimestampToDate from "../utils/firestoreTimestampToDate";
import Event from "./Event";
import { Model } from "./Model";
export default class Session implements Model {
  id: string;
  caption_uri?: string;
  event_ref: string;
  event?: Event;
  external_source_id?: string;
  session_datetime: Date;
  session_index: number;
  video_uri: string;

  constructor(jsonData: ResponseData) {
    this.id = jsonData["id"];
    this.event_ref = jsonData["event_ref"].id;
    this.session_datetime = firestoreTimestampToDate(jsonData["session_datetime"]);
    this.session_index = jsonData["session_index"];
    this.video_uri = jsonData["video_uri"];

    if (jsonData["caption_uri"]) {
      this.caption_uri = jsonData["caption_uri"];
    }

    if (typeof jsonData["event_ref"] === "object") {
      this.event = new Event(jsonData["event_ref"]);
    }

    if (jsonData["external_source_id"]) {
      this.external_source_id = jsonData["external_source_id"];
    }
  }
}
