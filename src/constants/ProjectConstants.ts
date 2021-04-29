export enum VOTE_DECISION {
  APPROVE = "Approve",
  REJECT = "Reject",
  ABSTAIN = "Abstain",
}

export enum MATTER_STATUS_DECISION {
  ADOPTED = "Adopted",
  REJECTED = "Rejected",
  IN_PROGRESS = "In Progress",
}

export type IndividualMeetingVote = {
  /** the voter's name */
  name: string;
  /** the persons vote */
  decision: VOTE_DECISION;
  /** vote id */
  id: string;
};
