import { orderBy, where } from "@firebase/firestore";

import ModelService from "./ModelService";
import { COLLECTION_NAME } from "./PopulationOptions";
import { WHERE_OPERATOR } from "./constants";

import Body from "../models/Body";
import { FirebaseConfig } from "../app/AppConfigContext";

export default class BodyService extends ModelService {
  constructor(firebaseConfig: FirebaseConfig) {
    super(COLLECTION_NAME.Body, firebaseConfig);
  }

  async getBodiesByName(name: string): Promise<Body[]> {
    const networkQueryResponse = this.networkService.getDocuments(COLLECTION_NAME.Body, [
      where("name", WHERE_OPERATOR.eq, name),
    ]);
    return this.createModels(networkQueryResponse, Body, `getBodyByName(${name})`) as Promise<
      Body[]
    >;
  }

  async getAllBodies(): Promise<Body[]> {
    const networkQueryResponse = this.networkService.getDocuments(COLLECTION_NAME.Body, [
      orderBy("name"),
    ]);
    return this.createModels(networkQueryResponse, Body, `getAllBodies()`) as Promise<Body[]>;
  }
}
