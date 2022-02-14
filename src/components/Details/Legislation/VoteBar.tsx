import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import { useMediaQuery } from "react-responsive";

import { VOTE_DECISION } from "../../../models/constants";
import { screenWidths } from "../../../styles/mediaBreakpoints";
import Vote from "../../../models/Vote";
import { Link } from "react-router-dom";
import { strings } from "../../../assets/LocalizedStrings";

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
interface VoteBarProps {
  statusColor: string;
  votes: Vote[];
  percentage: number;
  height: number;
  label: string;
}

const ProgressBar: FC<VoteBarProps> = ({
  statusColor,
  percentage,
  height,
  votes,
  label,
}: VoteBarProps) => {
  const [expanded, setExpanded] = useState(false);

  const votesLinks = votes.map((vote, i) => (
    <div key={`${i}_${vote.id}_vote`} style={{ marginTop: 4 }}>
      <Link to={`/people/${vote.id}`} style={{ marginLeft: 12 }}>
        {vote.person?.name}
      </Link>
      <b style={{ marginLeft: 8 }}>
        {
          strings[
            vote.decision
              .toLowerCase()
              .replace(" ", "_")
              .replace("-", "_")
              .replace("(", "")
              .replace(")", "")
          ]
        }
      </b>
    </div>
  ));
  const compactForm = useMediaQuery({ query: `(max-width: ${screenWidths.tablet})` });
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

export default ProgressBar;
