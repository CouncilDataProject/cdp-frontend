import ModelService from "./ModelService";
import { COLLECTION_NAME } from "./PopulationOptions";
import Matter from "../models/Matter";
import { FirebaseConfig } from "../app/AppConfigContext";

export default class MatterService extends ModelService {
  constructor(firebaseConfig: FirebaseConfig) {
    super(COLLECTION_NAME.Person, firebaseConfig);
  }

  async getMatterById(matterId: string): Promise<Matter> {
    const networkResponse = this.networkService.getDocument(matterId, COLLECTION_NAME.Matter);
    return this.createModel(networkResponse, Matter, `getMatterById(${matterId})`);
  }
}
