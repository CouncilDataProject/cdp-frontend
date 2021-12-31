import { ResponseData } from "../networking/NetworkResponse";
import { Model } from "./Model";

class File implements Model {
  id: string;
  uri: string;
  name: string;
  description?: string;
  media_type?: string;

  constructor(jsonData: ResponseData) {
    this.id = jsonData["id"];

    this.uri = jsonData["uri"];

    this.name = jsonData["name"];

    if (jsonData["description"]) {
      this.description = jsonData["description"];
    }

    if (jsonData["media_type"]) {
      this.media_type = jsonData["media_type"];
    }
  }
}

export default File;
