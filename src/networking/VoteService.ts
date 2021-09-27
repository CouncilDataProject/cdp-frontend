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

  async getFullyPopulatedVotesByPersonId(personId: string): Promise<Vote[]> {
    const populatePerson = new Populate(COLLECTION_NAME.Person, REF_PROPERTY_NAME.VotePersonRef);

    const populateMatter = new Populate(COLLECTION_NAME.Matter, REF_PROPERTY_NAME.VoteMatterRef);

    const populateEventBody = new Populate(COLLECTION_NAME.Body, REF_PROPERTY_NAME.EventBodyRef);
    const populateEventBodyCascade = new PopulationOptions([populateEventBody]);

    const populateEvent = new Populate(
      COLLECTION_NAME.Event,
      REF_PROPERTY_NAME.VoteEventRef,
      populateEventBodyCascade
    );

    const populateEventMinutesItem = new Populate(
      COLLECTION_NAME.EventMinutesItem,
      REF_PROPERTY_NAME.VoteEventMinutesItemRef
    );

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
      new PopulationOptions([
        populatePerson,
        populateMatter,
        populateEvent,
        populateEventMinutesItem,
      ])
    );
    return this.createModels(
      networkQueryResponse,
      Vote,
      `getFullyPopulatedVotesByPersonId(${personId})`
    );
  }
}
