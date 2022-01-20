import { Matter } from "./Matter";
import { IndividualMeetingVote } from "./IndividualMeetingVote";
import { EVENT_MINUTES_ITEM_DECISION } from "../../../models/constants";

export type MeetingVote = {
  /** the matter being voted upon */
  matter: Matter;
  /** the voting body decision */
  council_decision: EVENT_MINUTES_ITEM_DECISION;
  /** an array of MeetingVotes */
  votes: IndividualMeetingVote[];
};
