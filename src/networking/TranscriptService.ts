import { where, orderBy, limit, doc } from "@firebase/firestore";

import { NetworkService } from "./NetworkService";
import ModelService from "./ModelService";
import {
  COLLECTION_NAME,
  Populate,
  PopulationOptions,
  REF_PROPERTY_NAME,
} from "./PopulationOptions";
import { ORDER_DIRECTION, WHERE_OPERATOR } from "./constants";

import Transcript from "../models/Transcript";

export default class TranscriptService extends ModelService {
  constructor() {
    super(COLLECTION_NAME.Transcript);
  }

  async getTranscriptBySessionId(sessionId: string): Promise<Transcript[]> {
    const networkQueryResponse = this.networkService.getDocuments(
      COLLECTION_NAME.Transcript,
      [
        where(
          REF_PROPERTY_NAME.TranscriptSessionRef,
          WHERE_OPERATOR.eq,
          doc(NetworkService.getDb(), COLLECTION_NAME.Session, sessionId)
        ),
        orderBy("confidence", ORDER_DIRECTION.desc),
        limit(1),
      ],
      new PopulationOptions([
        new Populate(COLLECTION_NAME.File, REF_PROPERTY_NAME.TranscriptFileRef),
      ])
    );
    return this.createModels(
      networkQueryResponse,
      Transcript,
      `getTranscriptBySessionId(${sessionId})`
    );
  }
}
