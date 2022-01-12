import { FirebaseConfig } from "../app/AppConfigContext";

import ModelService from "./ModelService";
import { COLLECTION_NAME } from "./PopulationOptions";

import File from "../models/File";

export default class FileService extends ModelService {
  constructor(firebaseConfig: FirebaseConfig) {
    super(COLLECTION_NAME.File, firebaseConfig);
  }

  async getFileById(id: string): Promise<File> {
    const networkResponse = this.networkService.getDocument(id, COLLECTION_NAME.File);
    return this.createModel(networkResponse, File, `getFileById(${id})`) as Promise<File>;
  }
}
