import { ResponseData } from "../networking/NetworkResponse";
import Event from "./Event";
import { Model } from "./Model";
import { DocumentReference } from "@firebase/firestore";

export default class IndexedEventGram implements Model {
  id?: string;
  context_span?: string;
  datetime_weighted_value?: number;
  event_ref?: string;
  event?: Event;
  stemmed_gram?: string;
  unstemmed_gram?: string;
  value?: number;

  constructor(jsonData: ResponseData) {
    if (jsonData["id"]) {
      this.id = jsonData["id"];
    }

    if (jsonData["context_span"]) {
      this.context_span = jsonData["context_span"];
    }

    if (jsonData["datetime_weighted_value"]) {
      this.datetime_weighted_value = jsonData["datetime_weighted_value"];
    }

    if (jsonData["event_ref"]) {
      if (jsonData["event_ref"] instanceof DocumentReference) {
        this.event_ref = jsonData["event_ref"].id;
      } else if (typeof jsonData["event_ref"] === "object") {
        this.event = new Event(jsonData["event_ref"]);
      }
    }

    if (jsonData["stemmed_gram"]) {
      this.stemmed_gram = jsonData["stemmed_gram"];
    }

    if (jsonData["unstemmed_gram"]) {
      this.unstemmed_gram = jsonData["unstemmed_gram"];
    }

    if (jsonData["value"]) {
      this.value = jsonData["value"];
    }
  }
}
