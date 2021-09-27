import { ResponseData } from "../networking/NetworkResponse";
import File from "./File";
import { Model } from "./Model";
import { DocumentReference } from "@firebase/firestore";

class Person implements Model {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
  router_string?: string;
  picture_ref?: string; // reference field
  picture?: File;
  is_active?: boolean;
  external_source_id?: string;
  seatName?: string;
  seatPictureUri?: string;
  seatElectoralArea?: string;

  constructor(jsonData: ResponseData) {
    if (jsonData["id"]) {
      this.id = jsonData["id"];
    }

    if (jsonData["name"]) {
      this.name = jsonData["name"];
    }
    if (jsonData["email"]) {
      this.email = jsonData["email"];
    }

    if (jsonData["phone"]) {
      this.phone = jsonData["phone"];
    }

    if (jsonData["website"]) {
      this.website = jsonData["website"];
    }

    if (jsonData["router_string"]) {
      this.router_string = jsonData["router_string"];
    }

    if (jsonData["picture_ref"]) {
      if (jsonData["picture_ref"] instanceof DocumentReference) {
        this.picture_ref = jsonData["picture_ref"].id;
      } else if (typeof jsonData["picture_ref"] === "object") {
        this.picture = new File(jsonData["picture_ref"]);
      }
    }

    if (jsonData["is_active"]) {
      this.is_active = jsonData["is_active"];
    }

    if (jsonData["external_source_id"]) {
      this.external_source_id = jsonData["external_source_id"];
    }

    if (jsonData["seatName"]) {
      this.seatName = jsonData["seatName"];
    }

    if (jsonData["seatPictureUri"]) {
      this.seatPictureUri = jsonData["seatPictureUri"];
    }

    if (jsonData["seatElectoralArea"]) {
      this.seatElectoralArea = jsonData["seatElectoralArea"];
    }
  }
}

export default Person;
