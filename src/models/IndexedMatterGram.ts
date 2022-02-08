import { ResponseData } from "../networking/NetworkResponse";
import { DocumentReference } from "@firebase/firestore";
import Matter from "./Matter";
import { Model } from "./Model";

class IndexedMatterGram implements Model {
  id: string;
  matter_ref: string;
  matter?: Matter;
  unstemmed_gram: string;
  stemmed_gram: string;
  context_span: string;
  value: number;
  datetime_weighted_value: number;
  keywords?: string[];

  constructor(jsonData: ResponseData) {
    this.id = jsonData["id"];
    this.unstemmed_gram = jsonData["unstemmed_gram"];
    this.stemmed_gram = jsonData["stemmed_gram"];
    this.context_span = jsonData["context_span"];
    this.value = jsonData["value"];
    this.datetime_weighted_value = jsonData["datetime_weighted_value"];
    this.matter_ref = jsonData["matter_ref"].id;

    if (
      typeof jsonData["matter_ref"] === "object" &&
      !(jsonData["matter_ref"] instanceof DocumentReference)
    ) {
      this.matter = new Matter(jsonData["event_ref"]);
    }
  }
}

export default IndexedMatterGram;
