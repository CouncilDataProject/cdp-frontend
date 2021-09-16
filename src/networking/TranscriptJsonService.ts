import { FirebaseConfig } from "../app/AppConfigContext";
import TranscriptJson from "../models/TranscriptJson";

import ModelService from "./ModelService";

export default class TranscriptJsonService extends ModelService {
  constructor(firebaseConfig: FirebaseConfig) {
    super("TranscriptJson", firebaseConfig);
  }

  async download(uri: string): Promise<TranscriptJson> {
    const networkResponse = this.networkService.downloadJson(uri);
    return this.createModel(networkResponse, TranscriptJson, `download(${uri})`);
  }
}
