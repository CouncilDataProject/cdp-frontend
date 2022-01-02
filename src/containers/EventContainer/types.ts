import { Sentence } from "../../models/TranscriptJson";
import Body from "../../models/Body";
import Event from "../../models/Event";
import EventMinutesItem from "../../models/EventMinutesItem";
import EventMinutesItemFile from "../../models/EventMinutesItemFile";
import MinutesItem from "../../models/MinutesItem";
import Session from "../../models/Session";
import Vote from "../../models/Vote";
import Person from "../../models/Person";

export interface ECEvent extends Pick<Event, "event_datetime"> {
  body?: Pick<Body, "name">;
}

export type ECSession = Pick<Session, "id" | "video_uri" | "session_index">;

export interface ECSentence extends Sentence {
  session_index: number;
}

export interface ECEventMinutesItem extends Pick<EventMinutesItem, "id" | "decision"> {
  minutes_item?: Pick<MinutesItem, "name" | "description" | "matter_ref">;
  files?: Pick<EventMinutesItemFile, "name" | "uri">[];
}

export interface ECVote extends Pick<Vote, "id" | "decision" | "event_minutes_item_ref"> {
  person?: Pick<Person, "id" | "name">;
}

export interface EventData {
  /**The event */
  event: ECEvent;
  /** Session of the event */
  sessions: ECSession[];
  /** Sentences for the event */
  sentences?: ECSentence[];
  /** Event minutes items of the event */
  eventMinutesItems: ECEventMinutesItem[];
  /** Votes for the event */
  votes: ECVote[];
}
