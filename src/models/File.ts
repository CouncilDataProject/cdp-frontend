import { ResponseData } from "../networking/NetworkResponse";

class File {
  uri?: string;
  name?: string;
  description?: string;
  media_type?: string;

  constructor(jsonData: ResponseData) {
    if (jsonData["uri"]) {
      this.uri = jsonData["uri"];
    }
    if (jsonData["name"]) {
      this.name = jsonData["name"];
    }

    if (jsonData["description"]) {
      this.description = jsonData["description"];
    }

    if (jsonData["media_type"]) {
      this.media_type = jsonData["media_type"];
    }
  }
}

export default File;
