import Matter from "./Matter";
import { ResponseData } from "../networking/NetworkResponse";
import { Model } from "./Model";
export default class MatterFile implements Model {
  id: string;
  external_source_id?: string;
  matter_ref: string;
  matter?: Matter;
  name: string;
  uri: string;

  constructor(jsonData: ResponseData) {
    this.id = jsonData["id"];
    this.matter_ref = jsonData["matter_ref"].id;
    this.name = jsonData["name"];
    this.uri = jsonData["uri"];

    if (jsonData["external_source_id"]) {
      this.external_source_id = jsonData["external_source_id"];
    }

    if (typeof jsonData["matter_ref"] === "object") {
      this.matter = new Matter(jsonData["matter_ref"]);
    }
  }
}
