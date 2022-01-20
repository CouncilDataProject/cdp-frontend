import { VOTE_DECISION } from "../../../models/constants";

export type IndividualMeetingVote = {
  /** the voter's name */
  name: string;
  /** the voter's id */
  personId: string;
  /** the persons vote */
  decision: VOTE_DECISION;
  /** vote id */
  id: string;
};
