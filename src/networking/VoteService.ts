import {
  QueryConstraint,
  where,
  doc,
  orderBy,
  limit,
  startAfter,
  getDoc,
} from "@firebase/firestore";

import { FirebaseConfig } from "../app/AppConfigContext";

import { NetworkService } from "./NetworkService";
import ModelService from "./ModelService";
import {
  COLLECTION_NAME,
  Populate,
  PopulationOptions,
  REF_PROPERTY_NAME,
} from "./PopulationOptions";
import { ORDER_DIRECTION, WHERE_OPERATOR } from "./constants";

import Vote from "../models/Vote";

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
    return this.createModels(
      networkQueryResponse,
      Vote,
      `getVotesByEventId(${eventId})`
    ) as Promise<Vote[]>;
  }

  async getFullyPopulatedVotesByPersonId(
    personId: string,
    batchSize: number,
    lastVisibleVoteId?: string
  ): Promise<Vote[]> {
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

    const queryConstraints: QueryConstraint[] = [];
    queryConstraints.push(
      where(
        REF_PROPERTY_NAME.VotePersonRef,
        WHERE_OPERATOR.eq,
        doc(NetworkService.getDb(), COLLECTION_NAME.Person, personId)
      )
    );
    queryConstraints.push(orderBy(REF_PROPERTY_NAME.VoteEventRef, ORDER_DIRECTION.asc));
    if (lastVisibleVoteId) {
      const docRef = doc(NetworkService.getDb(), COLLECTION_NAME.Vote, lastVisibleVoteId);
      const docSnap = await getDoc(docRef);
      queryConstraints.push(startAfter(docSnap));
    }
    queryConstraints.push(limit(batchSize));

    const networkQueryResponse = this.networkService.getDocuments(
      COLLECTION_NAME.Vote,
      queryConstraints,
      new PopulationOptions([populateMatter, populateEvent, populateEventMinutesItem])
    );
    return this.createModels(
      networkQueryResponse,
      Vote,
      `getFullyPopulatedVotesByPersonId(${personId})`
    ) as Promise<Vote[]>;
  }
}
