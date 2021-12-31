import { ResponseData } from "../networking/NetworkResponse";
import EventMinutesItem from "./EventMinutesItem";
import Person from "./Person";
import Event from "./Event";
import Matter from "./Matter";
import { Model } from "./Model";
export default class Vote implements Model {
  id: string;
  decision?: string;
  event_minutes_item_ref: string;
  event_minutes_item?: EventMinutesItem;
  event_ref: string;
  event?: Event;
  external_source_id?: string;
  in_majority?: boolean;
  matter_ref: string;
  matter?: Matter;
  person_ref: string;
  person?: Person;

  constructor(jsonData: ResponseData) {
    this.id = jsonData["id"];
    this.event_minutes_item_ref = jsonData["event_minutes_item_ref"].id;
    this.event_ref = jsonData["event_ref"].id;
    this.matter_ref = jsonData["matter_ref"].id;
    this.person_ref = jsonData["person_ref"].id;

    if (typeof jsonData["event_ref"] === "object") {
      this.event = new Event(jsonData["event_ref"]);
    }

    if (jsonData["decision"]) {
      this.decision = jsonData["decision"];
    }

    if (typeof jsonData["event_minutes_item_ref"] === "object") {
      this.event_minutes_item = new EventMinutesItem(jsonData["event_minutes_item_ref"]);
    }

    if (jsonData["external_source_id"]) {
      this.external_source_id = jsonData["external_source_id"];
    }

    if (jsonData["in_majority"]) {
      this.in_majority = jsonData["in_majority"];
    }

    if (typeof jsonData["matter_ref"] === "object") {
      this.matter = new Matter(jsonData["matter_ref"]);
    }

    if (typeof jsonData["person_ref"] === "object") {
      this.person = new Person(jsonData["person_ref"]);
    }
  }
}
