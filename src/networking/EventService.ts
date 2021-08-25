import { NetworkService } from "./NetworkService";
import {
  COLLECTION_NAME,
  Populate,
  PopulationOptions,
  REF_PROPERTY_NAME,
} from "./PopulationOptions";

import Event from "../models/Event";
import Session from "../models/Session";
import Transcript from "../models/Transcript";
import EventMinutesItem from "../models/EventMinutesItem";
import EventMinutesItemFile from "../models/EventMinutesItemFile";
import Vote from "../models/Vote";

import { WHERE_OPERATOR, WhereCondition, OrderCondition, ORDER_DIRECTION } from "./Database";

export class EventService {
  networkService: NetworkService;

  constructor() {
    this.networkService = NetworkService.getInstance();
  }

  async getEvent(eventId: string): Promise<Event> {
    try {
      const { data, error } = await this.networkService.getDocument(
        eventId,
        COLLECTION_NAME.Event,
        //populate body
        new PopulationOptions([new Populate(COLLECTION_NAME.Body, REF_PROPERTY_NAME.EventBodyRef)])
      );
      if (error) {
        return Promise.reject(error);
      }
      if (!data) {
        return Promise.reject(new Error("No data create event."));
      }
      return Promise.resolve(new Event(data));
    } catch (error) {
      error.message = `EventService_getEvent_${error.message}`;
      return Promise.reject(error);
    }
  }

  async getSessions(eventId: string): Promise<Session[]> {
    try {
      const { data, error } = await this.networkService.getDocuments(
        COLLECTION_NAME.Session,
        //get sessions that has eventId
        [new WhereCondition(REF_PROPERTY_NAME.SessionEventRef, WHERE_OPERATOR.eq, eventId)],
        //order by session index asc
        [new OrderCondition("session_index", ORDER_DIRECTION.asc)] //where to store `session_index` constant?
      );
      if (error) {
        return Promise.reject(error);
      }
      if (!data) {
        return Promise.reject(new Error("No data create sessions."));
      }
      const sessions: Session[] = data.map((datum: any) => new Session(datum));
      return Promise.resolve(sessions);
    } catch (error) {
      error.message = `EventService_getSessions_${error.message}`;
      return Promise.reject(error);
    }
  }

  async getTranscript(sessionId: string): Promise<Transcript> {
    try {
      const { data, error } = await this.networkService.getDocuments(
        COLLECTION_NAME.Transcript,
        //get transcript for sessionId
        [new WhereCondition(REF_PROPERTY_NAME.TranscriptSessionRef, WHERE_OPERATOR.eq, sessionId)],
        //order by confidence desc
        [new OrderCondition("confidence", ORDER_DIRECTION.desc)],
        //limit to 1
        1,
        //undefined start at
        undefined,
        //populate the file
        new PopulationOptions([
          new Populate(COLLECTION_NAME.File, REF_PROPERTY_NAME.TranscriptFileRef),
        ])
      );
      if (error) {
        return Promise.reject(error);
      }
      if (!data) {
        return Promise.reject(new Error("No data create transcript."));
      }
      return Promise.resolve(new Transcript(data[0]));
    } catch (error) {
      error.message = `EventService_getTranscript_${error.message}`;
      return Promise.reject(error);
    }
  }

  async getEventMinutesItems(eventId: string): Promise<EventMinutesItem[]> {
    try {
      const { data, error } = await this.networkService.getDocuments(
        COLLECTION_NAME.EventMinutesItem,
        //get event minutes items for eventId
        [
          new WhereCondition(
            REF_PROPERTY_NAME.EventMinutesItemEventRef,
            WHERE_OPERATOR.eq,
            eventId
          ),
        ],
        //order by index asc
        [new OrderCondition("index", ORDER_DIRECTION.asc)],
        //undefined limit
        undefined,
        //undefined start at
        undefined,
        new PopulationOptions([
          //populate the minutes item with its matter ref
          new Populate(
            COLLECTION_NAME.MinutesItem,
            REF_PROPERTY_NAME.EventMinutesItemMinutesItemRef,
            new PopulationOptions([
              new Populate(COLLECTION_NAME.Matter, REF_PROPERTY_NAME.MinutesItemMatterRef),
            ])
          ),
        ])
      );
      if (error) {
        return Promise.reject(error);
      }
      if (!data) {
        return Promise.reject(new Error("No data create event minutes items."));
      }
      const eventMinutesItems: EventMinutesItem[] = data.map(
        (datum: any) => new EventMinutesItem(datum)
      );
      return Promise.resolve(eventMinutesItems);
    } catch (error) {
      error.message = `EventService_getEventMinutesItems_${error.message}`;
      return Promise.reject(error);
    }
  }

  async getEventMinutesItemsFiles(eventMinutesItemId: string): Promise<EventMinutesItemFile[]> {
    try {
      const { data, error } = await this.networkService.getDocuments(
        COLLECTION_NAME.EventMinutesItemFile,
        [
          //get the files for eventMinutesItemId
          new WhereCondition(
            REF_PROPERTY_NAME.EventMinutesItemFileEventMinutesItemRef,
            WHERE_OPERATOR.eq,
            eventMinutesItemId
          ),
        ],
        //order by name asc
        [new OrderCondition("name", ORDER_DIRECTION.asc)]
      );
      if (error) {
        return Promise.reject(error);
      }
      if (!data) {
        return Promise.reject(new Error("No data to create event minutes items files."));
      }
      const eventMinutesItemsFiles: EventMinutesItemFile[] = data.map(
        (datum: any) => new EventMinutesItemFile(datum)
      );
      return Promise.resolve(eventMinutesItemsFiles);
    } catch (error) {
      error.message = `EventService_getEventMinutesItemsFiles_${error.message}`;
      return Promise.reject(error);
    }
  }

  async getVotes(eventId: string): Promise<Vote[]> {
    try {
      const { data, error } = await this.networkService.getDocuments(
        COLLECTION_NAME.Vote,
        //get the votes for this eventId
        [new WhereCondition(REF_PROPERTY_NAME.VoteEventRef, WHERE_OPERATOR.eq, eventId)],
        //undefined order conditions
        undefined,
        //undefined limit
        undefined,
        //undefined start at
        undefined,
        //populate the person. don't need to populate matter and event minutes item
        new PopulationOptions([
          new Populate(COLLECTION_NAME.Person, REF_PROPERTY_NAME.VotePersonRef),
        ])
      );
      if (error) {
        return Promise.reject(error);
      }
      if (!data) {
        return Promise.reject(new Error("No data to create votes."));
      }
      const votes: Vote[] = data.map((datum: any) => new Vote(datum));
      return Promise.resolve(votes);
    } catch (error) {
      error.message = `EventService_getVotes_${error.message}`;
      return Promise.reject(error);
    }
  }
}
