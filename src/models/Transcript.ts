import { ResponseData } from "../networking/NetworkResponse";
import firestoreTimestampToDate from "../utils/firestoreTimestampToDate";
import File from "./File";
import Session from "./Session";
import { Model } from "./Model";

export default class Transcript implements Model {
  id?: string;
  confidence?: number;
  created?: Date;
  file_ref?: string;
  file?: File;
  session_ref?: string;
  session?: Session;

  constructor(jsonData: ResponseData) {
    if (jsonData["id"]) {
      this.id = jsonData["id"];
    }

    if (jsonData["confidence"]) {
      this.confidence = jsonData["confidence"];
    }

    if (jsonData["created"]) {
      this.created = firestoreTimestampToDate(jsonData["created"]);
    }

    if (jsonData["file_ref"] && typeof jsonData["file_ref"] === "string") {
      this.file_ref = jsonData["file_ref"];
    }

    if (jsonData["file_ref"] && typeof jsonData["file_ref"] === "object") {
      this.file = new File(jsonData["file_ref"]);
    }

    if (jsonData["session_ref"] && typeof jsonData["session_ref"] === "string") {
      this.session_ref = jsonData["session_ref"];
    }

    if (jsonData["session_ref"] && typeof jsonData["session_ref"] === "object") {
      this.session = new Session(jsonData["session_ref"]);
    }
  }
}
