import { ResponseData } from "../networking/NetworkResponse";
import Matter from "./Matter";
import { Model } from "./Model";
import { DocumentReference } from "@firebase/firestore";

export default class MinutesItem implements Model {
  id: string;
  description?: string;
  external_source_id?: string;
  matter_ref?: string;
  matter?: Matter;
  name: string;

  constructor(jsonData: ResponseData) {
    this.id = jsonData["id"];
    this.name = jsonData["name"];

    if (jsonData["description"]) {
      this.description = jsonData["description"];
    }

    if (jsonData["external_source_id"]) {
      this.external_source_id = jsonData["external_source_id"];
    }

    if (jsonData["matter_ref"]) {
      if (jsonData["matter_ref"] instanceof DocumentReference) {
        this.matter_ref = jsonData["matter_ref"].id;
      } else if (typeof jsonData["matter_ref"] === "object") {
        this.matter = new Matter(jsonData["matter_ref"]);
      }
    }
  }
}
