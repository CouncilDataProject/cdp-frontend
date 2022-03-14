import React, { FC, ReactNode } from "react";

import Vote from "../../../models/Vote";
import VoteBar from "./VoteBar";
import { getVoteDistribution } from "../../Shared/util/voteDistribution";
import { strings } from "../../../assets/LocalizedStrings";

const VOTE_BAR_HEIGHT = 16;
export interface VoteDistributionGraphicProps {
  /** votes on the matter */
  votes: Vote[];
}

const VoteDistributionGraphic: FC<VoteDistributionGraphicProps> = ({
  votes,
}: VoteDistributionGraphicProps) => {
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
      statusColor={"cdp-bg-acceptance-green"}
      votes={inFavor}
      percentage={(inFavor.length / votes.length) * 100}
      height={VOTE_BAR_HEIGHT}
      label={votesForLabel}
    />,
    <VoteBar
      key={"againstVoteBar"}
      statusColor={"cdp-bg-rejected-red"}
      votes={against}
      percentage={(against.length / votes.length) * 100}
      height={VOTE_BAR_HEIGHT}
      label={votesAgainstLabel}
    />,
    <VoteBar
      key={"abstainedVoteBar"}
      statusColor={"cdp-bg-light-purple"}
      votes={abstained}
      percentage={(abstained.length / votes.length) * 100}
      height={VOTE_BAR_HEIGHT}
      label={votesAbstainedLabel}
    />,
  ];

  return <div style={{ display: "flex", flexDirection: "column" }}>{voteBars}</div>;
};

export { VoteDistributionGraphic };
