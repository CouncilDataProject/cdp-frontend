import { ResponseData } from "../networking/NetworkResponse";
import { Model } from "./Model";
import Matter from "./Matter";
import Person from "./Person";
import { DocumentReference } from "firebase/firestore";
export default class MatterSponsor implements Model {
  id: string;
  matter?: Matter;
  matter_ref: string;
  person?: Person;
  person_ref: string;
  external_source_id?: string;

  constructor(jsonData: ResponseData) {
    this.id = jsonData["id"];
    this.person_ref = jsonData["person_ref"].id;
    this.matter_ref = jsonData["matter_ref"].id;

    if (jsonData["external_source_id"]) {
      this.external_source_id = jsonData["external_source_id"];
    }

    if (
      typeof jsonData["person_ref"] === "object" &&
      !(jsonData["person_ref"] instanceof DocumentReference)
    ) {
      this.person = new Person(jsonData["person_ref"]);
    }

    if (
      typeof jsonData["matter_ref"] === "object" &&
      !(jsonData["matter_ref"] instanceof DocumentReference)
    ) {
      this.matter = new Matter(jsonData["matter_ref"]);
    }
  }
}
