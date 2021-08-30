import { ResponseData } from "../networking/NetworkResponse";
import MinutesItem from "./MinutesItem";
import { Model } from "./Model";

export default class EventMinutesItemFile implements Model {
  id?: string;
  event_minutes_item_ref?: string;
  event_minutes_item?: MinutesItem;
  external_source_id?: string;
  name?: string;
  uri?: string;

  constructor(jsonData: ResponseData) {
    if (jsonData["id"]) {
      this.id = jsonData["id"];
    }

    if (
      jsonData["event_minutes_item_ref"] &&
      typeof jsonData["event_minutes_item_ref"] === "string"
    ) {
      this.event_minutes_item_ref = jsonData["event_minutes_item_ref"];
    }

    if (
      jsonData["event_minutes_item_ref"] &&
      typeof jsonData["event_minutes_item_ref"] === "object"
    ) {
      this.event_minutes_item = new MinutesItem(jsonData["event_minutes_item_ref"]);
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
