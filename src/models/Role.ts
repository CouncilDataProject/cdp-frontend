import { ResponseData } from "../networking/NetworkResponse";
import { Model } from "./Model";
import firestoreTimestampToDate from "../utils/firestoreTimestampToDate";
import Person from "./Person";
import { DocumentReference } from "@firebase/firestore";
import Seat from "./Seat";
import Body from "./Body";
import { ROLE_TITLE } from "./util/RoleUtilities";

export default class Role implements Model {
  title?: ROLE_TITLE;
  start_datetime?: Date;
  end_datetime?: Date;
  matter_type?: string;
  name?: string;
  person?: Person;
  person_ref?: string;
  body?: Body;
  body_ref?: string;
  seat?: Seat;
  seat_ref?: string;
  external_source_id?: string;

  constructor(jsonData: ResponseData) {
    if (jsonData["title"] && jsonData["title"] in ROLE_TITLE) {
      this.title = jsonData["title"];
    } else {
      this.title = ROLE_TITLE.MEMBER;
    }

    if (jsonData["start_datetime"]) {
      this.start_datetime = firestoreTimestampToDate(jsonData["start_datetime"]);
    }

    if (jsonData["end_datetime"]) {
      this.end_datetime = firestoreTimestampToDate(jsonData["end_datetime"]);
    }

    if (jsonData["person_ref"]) {
      if (jsonData["person_ref"] instanceof DocumentReference) {
        this.person_ref = jsonData["person_ref"].id;
      } else if (typeof jsonData["person_ref"] === "object") {
        this.person = new Person(jsonData["person_ref"]);
      }
    }

    if (jsonData["body_ref"]) {
      if (jsonData["body_ref"] instanceof DocumentReference) {
        this.body_ref = jsonData["body_ref"].id;
      } else if (typeof jsonData["body_ref"] === "object") {
        this.body = new Body(jsonData["body_ref"]);
      }
    }

    if (jsonData["seat_ref"]) {
      if (jsonData["seat_ref"] instanceof DocumentReference) {
        this.seat_ref = jsonData["seat_ref"].id;
      } else if (typeof jsonData["seat_ref"] === "object") {
        this.seat = new Seat(jsonData["seat_ref"]);
      }
    }

    if (jsonData["external_source_id"]) {
      this.external_source_id = jsonData["external_source_id"];
    }
  }
}
