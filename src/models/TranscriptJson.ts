import { ResponseData } from "../networking/NetworkResponse";
import firestoreTimestampToDate from "../utils/firestoreTimestampToDate";
import { Model } from "./Model";

export interface Sentence {
  index: number;
  start_time: number;
  text: string;
  speaker_index: number;
  speaker_name: string;
  speaker_id?: string;
  speaker_pictureSrc?: string;
  confidence?: number;
  end_time?: number;
  words?: Word[];
  annotations?: any;
}

export interface Word {
  index: number;
  start_time: number;
  end_time: number;
  text: string;
  annotations?: any;
}

export default class TranscriptJson implements Model {
  confidence?: number;
  generator?: string;
  session_datetime?: Date;
  created_datetime?: Date;
  sentences?: Sentence[];
  annotations?: any;

  constructor(jsonData: ResponseData) {
    if (jsonData["confidence"]) {
      this.confidence = jsonData["confidence"];
    }

    if (jsonData["generator"]) {
      this.generator = jsonData["generator"];
    }

    if (jsonData["session_datetime"]) {
      this.session_datetime = firestoreTimestampToDate(jsonData["session_datetime"]);
    }

    if (jsonData["created_datetime"]) {
      this.created_datetime = firestoreTimestampToDate(jsonData["created_datetime"]);
    }

    if (jsonData["sentences"]) {
      this.sentences = jsonData["sentences"];
    }

    if (jsonData["annotations"]) {
      this.annotations = jsonData["annotations"];
    }
  }
}
