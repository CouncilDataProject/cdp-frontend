import { FirebaseConfig } from "../app/AppConfigContext";
import TranscriptJson from "../models/TranscriptJson";

import ModelService from "./ModelService";
import { COLLECTION_NAME } from "./PopulationOptions";

export default class TranscriptJsonService extends ModelService {
  constructor(firebaseConfig: FirebaseConfig) {
    super(COLLECTION_NAME.Transcript, firebaseConfig);
  }

  async download(uri: string): Promise<TranscriptJson> {
    const networkResponse = this.networkService.downloadJson(uri);
    return this.createModel(
      networkResponse,
      TranscriptJson,
      `download(${uri})`
    ) as Promise<TranscriptJson>;
  }
}
