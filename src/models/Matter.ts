import { ResponseData } from "../networking/NetworkResponse";
import { Model } from "./Model";
export default class Matter implements Model {
  id: string;
  external_source_id?: string;
  matter_type: string;
  name: string;
  title: string;

  constructor(jsonData: ResponseData) {
    this.id = jsonData["id"];
    this.matter_type = jsonData["matter_type"];
    this.name = jsonData["name"];
    this.title = jsonData["title"];

    if (jsonData["external_source_id"]) {
      this.external_source_id = jsonData["external_source_id"];
    }
  }
}
