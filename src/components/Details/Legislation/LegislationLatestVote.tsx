import React, { FC } from "react";

import Vote from "../../../models/Vote";
import H2 from "../../Shared/H2";
import Details from "../../Shared/Details";
import { strings } from "../../../assets/LocalizedStrings";
import { VoteDistributionGraphic } from "./VoteDistributionGraphic";
export interface LegislationLatestVoteProps {
  /** votes on the matter */
  votes: Vote[];
}

const LegislationLatestVote: FC<LegislationLatestVoteProps> = ({
  votes,
}: LegislationLatestVoteProps) => {
  return (
    <div style={{ marginTop: 16 }}>
      <Details
        hasBorderBottom={true}
        defaultOpen={false}
        summaryContent={
          <H2 className="mzp-u-title-xs" isInline={true}>
            {strings.latest_vote}
          </H2>
        }
        hiddenContent={<VoteDistributionGraphic votes={votes} />}
      />
    </div>
  );
};

export { LegislationLatestVote };
