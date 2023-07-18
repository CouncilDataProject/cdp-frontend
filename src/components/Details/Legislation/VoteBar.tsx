import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

import { screenWidths } from "../../../styles/mediaBreakpoints";
import Vote from "../../../models/Vote";
import { DecisionResult } from "../../Shared";

const Spacer = styled.div({ flex: 4 });

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
  zIndex: props.zIndex,
}));
interface VoteBarProps {
  statusColor: string;
  votes: Vote[];
  percentage: number;
  height: number;
  label: string;
}

const VoteBar: FC<VoteBarProps> = ({
  statusColor,
  percentage,
  height,
  votes,
  label,
}: VoteBarProps) => {
  const [expanded, setExpanded] = useState(false);
  const compactForm = useMediaQuery({ query: `(max-width: ${screenWidths.tablet})` });

  const votesLinks = votes.map((vote, i) => (
    <div key={`${i}_${vote.id}_vote`} style={{ marginTop: 4, display: "flex" }}>
      <Link to={`/people/${vote.person?.id}`} style={{ marginLeft: 12, flex: 1 }}>
        {vote.person?.name}
      </Link>
      <DecisionResult result={vote.decision} />
      {!compactForm && <Spacer style={{ flex: 4 }} />}
    </div>
  ));
  const directionality = compactForm ? "column" : "row";
  const barSize = compactForm ? "100%" : "80%";
  const textSize = compactForm ? "100%" : "20%";
  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: 16 }}>
      <div
        style={{ display: "flex", flexDirection: directionality, flex: 1, alignItems: "center" }}
      >
        <div
          style={{ height, position: "relative", width: barSize, cursor: "pointer" }}
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          <ColorBar className={statusColor} width={`${percentage}%`} height={height} zIndex={2} />
          <ColorBar className="cdp-bg-neutral-grey" width={`100%`} height={height} zIndex={1} />
        </div>
        <b style={{ marginLeft: 16, width: textSize }}>{label}</b>
      </div>
      {expanded && votesLinks}
    </div>
  );
};

export default VoteBar;
