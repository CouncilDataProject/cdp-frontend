import { where, doc, orderBy } from "@firebase/firestore";

import { NetworkService } from "./NetworkService";
import ModelService from "./ModelService";
import {
  COLLECTION_NAME,
  Populate,
  PopulationOptions,
  REF_PROPERTY_NAME,
} from "./PopulationOptions";
import { WHERE_OPERATOR } from "./constants";

import Vote from "../models/Vote";
import { FirebaseConfig } from "../app/AppConfigContext";

export default class VoteService extends ModelService {
  constructor(firebaseConfig: FirebaseConfig) {
    super(COLLECTION_NAME.Vote, firebaseConfig);
  }

  async getVotesByEventId(eventId: string): Promise<Vote[]> {
    const networkQueryResponse = this.networkService.getDocuments(
      COLLECTION_NAME.Vote,
      [
        where(
          REF_PROPERTY_NAME.VoteEventRef,
          WHERE_OPERATOR.eq,
          doc(NetworkService.getDb(), COLLECTION_NAME.Event, eventId)
        ),
        orderBy(REF_PROPERTY_NAME.VotePersonRef),
      ],
      new PopulationOptions([new Populate(COLLECTION_NAME.Person, REF_PROPERTY_NAME.VotePersonRef)])
    );
    return this.createModels(networkQueryResponse, Vote, `getVotesByEventId(${eventId})`);
  }

  async getVotesByPersonId(personId: string): Promise<Vote[]> {
    const networkQueryResponse = this.networkService.getDocuments(
      COLLECTION_NAME.Vote,
      [
        where(
          REF_PROPERTY_NAME.VotePersonRef,
          WHERE_OPERATOR.eq,
          doc(NetworkService.getDb(), COLLECTION_NAME.Person, personId)
        ),
        orderBy(REF_PROPERTY_NAME.VotePersonRef),
      ],
      new PopulationOptions([new Populate(COLLECTION_NAME.Person, REF_PROPERTY_NAME.VotePersonRef)])
    );
    return this.createModels(networkQueryResponse, Vote, `getVotesByPersonId(${personId})`);
  }
}
