import { ResponseData } from "../networking/NetworkResponse";
import { Model } from "./Model";
import File from "./File";
import { DocumentReference } from "@firebase/firestore";

export default class Seat implements Model {
  id: string;
  name: string;
  external_source_id?: string;
  electoral_area?: string;
  electoral_type?: string;
  image_ref?: string;
  image?: File;

  constructor(jsonData: ResponseData) {
    this.id = jsonData["id"];
    this.name = jsonData["name"];

    if (jsonData["external_source_id"]) {
      this.external_source_id = jsonData["external_source_id"];
    }

    if (jsonData["electoral_area"]) {
      this.electoral_area = jsonData["electoral_area"];
    }

    if (jsonData["electoral_type"]) {
      this.electoral_type = jsonData["electoral_type"];
    }

    if (jsonData["image_ref"]) {
      if (jsonData["image_ref"] instanceof DocumentReference) {
        this.image_ref = jsonData["image_ref"].id;
      } else if (typeof jsonData["image_ref"] === "object") {
        this.image = new File(jsonData["image_ref"]);
      }
    }
  }
}
