import { where, doc } from "@firebase/firestore";

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

export default class VoteService extends ModelService {
  constructor() {
    super("Vote", "VoteService");
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
      ],
      new PopulationOptions([new Populate(COLLECTION_NAME.Person, REF_PROPERTY_NAME.VotePersonRef)])
    );
    return this.createModels(networkQueryResponse, Vote, `getVotesByEventId(${eventId})`);
  }
}
