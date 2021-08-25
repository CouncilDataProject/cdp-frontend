import { ResponseData } from "../networking/NetworkResponse";
import firestoreTimestampToDate from "../utils/firestoreTimestampToDate";

export default class Body {
  description?: string;
  end_datetime?: Date;
  external_source_id?: string;
  is_active?: boolean;
  name?: string;
  start_datetime?: Date;

  constructor(jsonData: ResponseData) {
    if (jsonData["description"]) {
      this.description = jsonData["description"];
    }
    if (jsonData["end_datetime"]) {
      this.end_datetime = firestoreTimestampToDate(jsonData["end_datetime"]);
    }
    if (jsonData["external_source_id"]) {
      this.external_source_id = jsonData["external_source_id"];
    }
    if (jsonData["is_active"]) {
      this.is_active = jsonData["is_active"];
    }
    if (jsonData["start_datetime"]) {
      this.start_datetime = firestoreTimestampToDate(jsonData["start_datetime"]);
    }
    if (jsonData["name"]) {
      this.name = jsonData["name"];
    }
  }
}
