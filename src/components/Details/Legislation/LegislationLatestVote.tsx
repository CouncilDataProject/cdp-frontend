import React, { FC, ReactNode } from "react";

import Vote from "../../../models/Vote";
import VoteBar from "./VoteBar";
import H2 from "../../Shared/H2";
import Details from "../../Shared/Details";
import { getVoteDistribution } from "../../Shared/util/voteDistribution";
import { strings } from "../../../assets/LocalizedStrings";
import { VOTE_DECISION } from "../../../models/constants";

const VOTE_BAR_HEIGHT = 16;

export interface LegislationLatestVoteProps {
  /** votes on the matter */
  votes: Vote[];
}

const LegislationLatestVote: FC<LegislationLatestVoteProps> = ({
  votes,
}: LegislationLatestVoteProps) => {
  const { inFavor, against, abstained } = getVoteDistribution(votes);
  const votesForLabel: string = strings.number_approved.replace("{number}", `${inFavor.length}`);
  const votesAgainstLabel: string = strings.number_rejected.replace(
    "{number}",
    `${against.length}`
  );
  const votesAbstainedLabel: string = strings.number_non_voting.replace(
    "{number}",
    `${abstained.length}`
  );

  const voteBars: ReactNode[] = [
    <VoteBar
      key={"inFavorVoteBar"}
      status={VOTE_DECISION.APPROVE}
      votes={inFavor}
      percentage={(inFavor.length / votes.length) * 100}
      height={VOTE_BAR_HEIGHT}
      label={votesForLabel}
    />,
    <VoteBar
      key={"againstVoteBar"}
      status={VOTE_DECISION.REJECT}
      votes={against}
      percentage={(against.length / votes.length) * 100}
      height={VOTE_BAR_HEIGHT}
      label={votesAgainstLabel}
    />,
    <VoteBar
      key={"abstainedVoteBar"}
      status={VOTE_DECISION.ABSTAIN_NON_VOTING}
      votes={abstained}
      percentage={(abstained.length / votes.length) * 100}
      height={VOTE_BAR_HEIGHT}
      label={votesAbstainedLabel}
    />,
  ];

  return (
    <div style={{ marginTop: 16 }}>
      <Details
        hasBorderBottom={true}
        defaultOpen={false}
        summaryContent={
          <H2 className="mzp-u-title-xs" isInline={true}>
            Latest Vote
          </H2>
        }
        hiddenContent={<div style={{ display: "flex", flexDirection: "column" }}>{voteBars}</div>}
      />
    </div>
  );
};

export { LegislationLatestVote };
