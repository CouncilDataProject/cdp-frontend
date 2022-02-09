export enum ROLE_TITLE {
  ALTERNATE = "Alternate",
  CHAIR = "Chair",
  COUNCILMEMBER = "Councilmember",
  MEMBER = "Member",
  COUNCILPRESIDENT = "Council President",
  VICE_CHAIR = "Vice Chair",
}

export enum VOTE_DECISION {
  ABSTAIN_APPROVE = "Abstain (Approve)",
  ABSTAIN_NON_VOTING = "Abstain (Non-Voting)",
  ABSTAIN_REJECT = "Abstain (Reject)",
  ABSENT_APPROVE = "Absent (Approve)",
  ABSENT_NON_VOTING = "Absent (Non-Voting)",
  ABSENT_REJECT = "Absent (Reject)",
  APPROVE = "Approve",
  REJECT = "Reject",
}

export enum MATTER_STATUS_DECISION {
  ADOPTED = "Adopted",
  IN_PROGRESS = "In Progress",
  REJECTED = "Rejected",
}

export enum EVENT_MINUTES_ITEM_DECISION {
  FAILED = "Failed",
  PASSED = "Passed",
}
