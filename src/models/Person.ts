import { ResponseData } from "../networking/NetworkResponse";
import File from "./File";
import { Model } from "./Model";
import { DocumentReference } from "@firebase/firestore";

class Person implements Model {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  router_string: string;
  picture_ref?: string; // reference field
  picture?: File;
  is_active: boolean;
  external_source_id?: string;

  constructor(jsonData: ResponseData) {
    this.id = jsonData["id"];
    this.is_active = jsonData["is_active"];
    this.name = jsonData["name"];
    this.router_string = jsonData["router_string"];

    if (jsonData["email"]) {
      this.email = jsonData["email"];
    }

    if (jsonData["phone"]) {
      this.phone = jsonData["phone"];
    }

    if (jsonData["website"]) {
      this.website = jsonData["website"];
    }

    if (jsonData["picture_ref"]) {
      if (jsonData["picture_ref"] instanceof DocumentReference) {
        this.picture_ref = jsonData["picture_ref"].id;
      } else if (typeof jsonData["picture_ref"] === "object") {
        this.picture = new File(jsonData["picture_ref"]);
      }
    }

    if (jsonData["external_source_id"]) {
      this.external_source_id = jsonData["external_source_id"];
    }
  }
}

export default Person;
