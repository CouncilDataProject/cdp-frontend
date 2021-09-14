import { Sentence } from "../../models/TranscriptJson";
import Event from "../../models/Event";
import EventMinutesItem from "../../models/EventMinutesItem";
import EventMinutesItemFile from "../../models/EventMinutesItemFile";
import Session from "../../models/Session";
import Vote from "../../models/Vote";

export interface SentenceWithSessionIndex extends Sentence {
  session_index: number;
}

export interface EventData {
  /**The event */
  event: Event;
  /** Session of the event */
  sessions: Session[];
  /** Sentences for the event */
  sentences: SentenceWithSessionIndex[];
  /** Event minutes items of the event */
  eventMinutesItems: EventMinutesItem[];
  /** Event minutes items files */
  eventMinutesItemsFiles: EventMinutesItemFile[][];
  /** Votes for the event */
  votes: Vote[][];
}
