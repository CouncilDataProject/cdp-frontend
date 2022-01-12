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

export enum EVENT_MINUTES_ITEM_DECISION {
  PASSED = "Passed",
  FAILED = "Failed",
}

export const SUPPORTED_LANGUAGES = ["en", "de", "es"];

export const FETCH_CARDS_BATCH_SIZE = 10;
