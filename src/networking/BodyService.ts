import ModelService from "./ModelService";
import { COLLECTION_NAME } from "./PopulationOptions";

import Body from "../models/Body";
import { FirebaseConfig } from "../app/AppConfigContext";

export default class BodyService extends ModelService {
  constructor(firebaseConfig: FirebaseConfig) {
    super(COLLECTION_NAME.Role, firebaseConfig);
  }

  async getBodyByName(name: string): Promise<Body> {
    const networkQueryResponse = this.networkService.getDocument(name, COLLECTION_NAME.Body);
    return this.createModel(networkQueryResponse, Body, `getBodyByName(${Body})`);
  }
}
