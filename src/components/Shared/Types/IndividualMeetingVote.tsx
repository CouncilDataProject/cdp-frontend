import { VOTE_DECISION } from "../../../constants/ProjectConstants";

export type IndividualMeetingVote = {
  /** the voter's name */
  name: string;
  /** the persons vote */
  decision: VOTE_DECISION;
  /** vote id */
  id: string;
};
