import Vote from "../../../models/Vote";
import { VOTE_DECISION } from "../../../models/constants";

export interface VotingSummary {
  inFavor: Vote[];
  against: Vote[];
  abstained: Vote[];
}

function getVoteDistribution(votes: Vote[]): VotingSummary {
  const inFavor: Vote[] = [];
  const against: Vote[] = [];
  const abstained: Vote[] = [];
  votes.forEach((vote: Vote) => {
    if (
      [VOTE_DECISION.ABSENT_APPROVE, VOTE_DECISION.ABSTAIN_APPROVE, VOTE_DECISION.APPROVE].includes(
        vote.decision
      )
    )
      inFavor.push(vote);
    if (
      [VOTE_DECISION.ABSENT_REJECT, VOTE_DECISION.ABSTAIN_REJECT, VOTE_DECISION.REJECT].includes(
        vote.decision
      )
    )
      against.push(vote);
    if ([VOTE_DECISION.ABSENT_NON_VOTING, VOTE_DECISION.ABSTAIN_NON_VOTING].includes(vote.decision))
      abstained.push(vote);
  });
  return {
    inFavor,
    against,
    abstained,
  };
}

export { getVoteDistribution };
