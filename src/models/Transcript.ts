import { ResponseData } from "../networking/NetworkResponse";
import firestoreTimestampToDate from "../utils/firestoreTimestampToDate";
import File from "./File";
import Session from "./Session";
import { Model } from "./Model";
export default class Transcript implements Model {
  id: string;
  confidence: number;
  created: Date;
  generator: string;
  file_ref: string;
  file?: File;
  session_ref: string;
  session?: Session;

  constructor(jsonData: ResponseData) {
    this.id = jsonData["id"];
    this.confidence = jsonData["confidence"];
    this.generator = jsonData["generator"];
    this.created = firestoreTimestampToDate(jsonData["created"]);
    this.file_ref = jsonData["file_ref"].id;
    this.session_ref = jsonData["session_ref"].id;

    if (typeof jsonData["file_ref"] === "object") {
      this.file = new File(jsonData["file_ref"]);
    }

    if (typeof jsonData["session_ref"] === "object") {
      this.session = new Session(jsonData["session_ref"]);
    }
  }
}
