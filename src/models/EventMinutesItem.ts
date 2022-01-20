import { ResponseData } from "../networking/NetworkResponse";
import Event from "./Event";
import MinutesItem from "./MinutesItem";
import { Model } from "./Model";
import { DocumentReference } from "firebase/firestore";
import { EVENT_MINUTES_ITEM_DECISION } from "./constants";

export default class EventMinutesItem implements Model {
  id: string;
  decision?: EVENT_MINUTES_ITEM_DECISION;
  event_ref: string;
  event?: Event;
  external_source_id?: string;
  index: number;
  minutes_item_ref: string;
  minutes_item?: MinutesItem;

  constructor(jsonData: ResponseData) {
    this.id = jsonData["id"];

    if (jsonData["decision"]) {
      this.decision = jsonData["decision"];
    }

    this.event_ref = jsonData["event_ref"].id;

    if (
      typeof jsonData["event_ref"] === "object" &&
      !(jsonData["event_ref"] instanceof DocumentReference)
    ) {
      this.event = new Event(jsonData["event_ref"]);
    }
    if (jsonData["external_source_id"]) {
      this.external_source_id = jsonData["external_source_id"];
    }

    this.index = jsonData["index"];

    this.minutes_item_ref = jsonData["minutes_item_ref"].id;
    if (
      typeof jsonData["minutes_item_ref"] === "object" &&
      !(jsonData["minutes_item_ref"] instanceof DocumentReference)
    ) {
      this.minutes_item = new MinutesItem(jsonData["minutes_item_ref"]);
    }
  }
}
