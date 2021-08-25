import { ResponseData } from "../networking/NetworkResponse";

export default class Matter {
  external_source_id?: string;
  matter_type?: string;
  name?: string;
  title?: string;

  constructor(jsonData: ResponseData) {
    if (jsonData["external_source_id"]) {
      this.external_source_id = jsonData["external_source_id"];
    }

    if (jsonData["matter_type"]) {
      this.matter_type = jsonData["matter_type"];
    }

    if (jsonData["name"]) {
      this.name = jsonData["name"];
    }

    if (jsonData["title"]) {
      this.title = jsonData["title"];
    }
  }
}
