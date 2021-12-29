import { ResponseData } from "../networking/NetworkResponse";
import { Model } from "./Model";
import { DocumentReference } from "@firebase/firestore";
import Matter from "./Matter";
import Person from "./Person";

export default class MatterSponsor implements Model {
  matter?: Matter;
  matter_ref?: string;
  person?: Person;
  person_ref?: string;
  external_source_id?: string;

  constructor(jsonData: ResponseData) {
    if (jsonData["external_source_id"]) {
      this.external_source_id = jsonData["external_source_id"];
    }

    if (jsonData["person_ref"]) {
      if (jsonData["person_ref"] instanceof DocumentReference) {
        this.person_ref = jsonData["person_ref"].id;
      } else if (typeof jsonData["person_ref"] === "object") {
        this.person = new Person(jsonData["person_ref"]);
      }
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
