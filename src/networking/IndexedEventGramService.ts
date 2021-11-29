import ModelService from "./ModelService";
import { COLLECTION_NAME } from "./PopulationOptions";

import IndexedEventGram from "../models/IndexedEventGram";
import { where, limit, orderBy, doc } from "firebase/firestore";
import { ORDER_DIRECTION, WHERE_OPERATOR } from "./constants";
import { NetworkService } from "./NetworkService";
import { FirebaseConfig } from "../app/AppConfigContext";

export default class IndexedEventGramService extends ModelService {
  constructor(firebaseConfig: FirebaseConfig) {
    super(COLLECTION_NAME.IndexedEventGram, firebaseConfig);
  }

  async getMatchingGrams(stemmedGram: string): Promise<IndexedEventGram[]> {
    // We explictely do not populate the events here because it is likely that the
    // same event will be requested multiple times, we will request event details after
    // we have received all back and condensed to a set of events
    const networkResponse = this.networkService.getDocuments(COLLECTION_NAME.IndexedEventGram, [
      where("stemmed_gram", WHERE_OPERATOR.eq, stemmedGram),
    ]);

    return this.createModels(networkResponse, IndexedEventGram, `getMatchingGrams(${stemmedGram})`);
  }

  async getKeyGramsForEvent(eventRef: string): Promise<IndexedEventGram[]> {
    const networkResponse = this.networkService.getDocuments(COLLECTION_NAME.IndexedEventGram, [
      where("event_ref", WHERE_OPERATOR.eq, doc(NetworkService.getDb(), eventRef)),
      orderBy("value", ORDER_DIRECTION.desc),
      limit(5),
    ]);

    return this.createModels(networkResponse, IndexedEventGram, `getKeyGramsForEvent(${eventRef})`);
  }
}
