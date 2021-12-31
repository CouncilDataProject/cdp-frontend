import { ResponseData } from "../networking/NetworkResponse";
import Event from "./Event";
import { Model } from "./Model";

export default class IndexedEventGram implements Model {
  id: string;
  context_span: string;
  datetime_weighted_value: number;
  event_ref: string;
  event?: Event;
  stemmed_gram: string;
  unstemmed_gram: string;
  value: number;

  constructor(jsonData: ResponseData) {
    this.id = jsonData["id"];
    this.context_span = jsonData["context_span"];
    this.datetime_weighted_value = jsonData["datetime_weighted_value"];
    this.event_ref = jsonData["event_ref"].id;
    this.stemmed_gram = jsonData["stemmed_gram"];
    this.unstemmed_gram = jsonData["unstemmed_gram"];
    this.value = jsonData["value"];

    if (typeof jsonData["event_ref"] === "object") {
      this.event = new Event(jsonData["event_ref"]);
    }
  }
}
