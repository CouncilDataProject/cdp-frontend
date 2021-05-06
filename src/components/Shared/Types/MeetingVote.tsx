import { Matter } from "./Matter";
import { IndividualMeetingVote } from "./IndividualMeetingVote";
import { MATTER_STATUS_DECISION } from "../../../constants/ProjectConstants";

export type MeetingVote = {
  /** the matter being voted upon */
  matter: Matter;
  /** the voting body decision */
  council_decision: MATTER_STATUS_DECISION;
  /** an array of MeetingVotes */
  votes: IndividualMeetingVote[];
};
