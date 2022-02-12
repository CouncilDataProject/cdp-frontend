import React, { FC, useState } from "react";
import styled from "@emotion/styled";

import { VOTE_DECISION } from "../../../models/constants";
import Vote from "../../../models/Vote";
import { Link } from "react-router-dom";

const ColorBar = styled.div<{ width: string; zIndex: number; height: number }>((props) => ({
  position: "absolute",
  top: 0,
  left: 0,
  height: props.height,
  width: props.width,
  borderTopLeftRadius: "50em",
  borderBottomLeftRadius: "50em",
  borderTopRightRadius: "50em",
  borderBottomRightRadius: "50em",
  display: "flex",
  flex: 1,
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: props.zIndex,
}));

const VOTE_DECISION_COLOR = {
  [VOTE_DECISION.APPROVE]: "cdp-bg-acceptance-green",
  [VOTE_DECISION.ABSTAIN_APPROVE]: "cdp-bg-acceptance-green",
  [VOTE_DECISION.ABSENT_APPROVE]: "cdp-bg-acceptance-green",
  [VOTE_DECISION.ABSTAIN_NON_VOTING]: "cdp-bg-light-purple",
  [VOTE_DECISION.ABSENT_NON_VOTING]: "cdp-bg-light-purple",
  [VOTE_DECISION.ABSTAIN_REJECT]: "cdp-bg-rejected-red",
  [VOTE_DECISION.ABSENT_REJECT]: "cdp-bg-rejected-red",
  [VOTE_DECISION.REJECT]: "cdp-bg-rejected-red",
};

interface VoteBarProps {
  status: VOTE_DECISION;
  votes: Vote[];
  percentage: number;
  height: number;
  label: string;
}

const ProgressBar: FC<VoteBarProps> = ({
  status,
  percentage,
  height,
  votes,
  label,
}: VoteBarProps) => {
  const completedColor = VOTE_DECISION_COLOR[status];
  const [expanded, setExpanded] = useState(false);

  const votesLinks = votes.map((vote, i) => (
    <Link to={`/people/${vote.id}`} key={`${i}_${vote.id}_vote`} style={{ marginTop: 4 }}>
      {vote.person?.name}
    </Link>
  ));

  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: 16 }}>
      <div style={{ display: "flex", flexDirection: "row", flex: 1, alignItems: "center" }}>
        <div
          style={{ height, position: "relative", width: "80%", cursor: "pointer" }}
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          <ColorBar
            className={completedColor}
            width={`${percentage}%`}
            height={height}
            zIndex={2}
          />
          <ColorBar className="cdp-bg-neutral-grey" width={`100%`} height={height} zIndex={1} />
        </div>
        <b style={{ marginLeft: 16, width: "20%" }}>{label}</b>
      </div>
      {expanded && votesLinks}
    </div>
  );
};

export default ProgressBar;
