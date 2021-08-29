import Matter from "./Matter";
import { ResponseData } from "../networking/NetworkResponse";
import { Model } from "./Model";

export default class MatterFile implements Model {
  external_source_id?: string;
  matter_ref?: string;
  matter?: Matter;
  name?: string;
  uri?: string;

  constructor(jsonData: ResponseData) {
    if (jsonData["external_source_id"]) {
      this.external_source_id = jsonData["external_source_id"];
    }

    if (jsonData["matter_ref"] && typeof jsonData["matter_ref"] === "string") {
      this.matter_ref = jsonData["matter_ref"];
    }

    if (jsonData["matter_ref"] && typeof jsonData["matter_ref"] === "object") {
      this.matter = new Matter(jsonData["matter_ref"]);
    }

    if (jsonData["name"]) {
      this.name = jsonData["name"];
    }

    if (jsonData["uri"]) {
      this.uri = jsonData["uri"];
    }
  }
}
