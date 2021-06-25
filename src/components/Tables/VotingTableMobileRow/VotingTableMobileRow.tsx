import React from "react";
import DecisionResult from "../../Shared/DecisionResult";
import { MATTER_STATUS_DECISION } from "../../../constants/ProjectConstants";
import { VOTE_DECISION } from "../../../constants/ProjectConstants";
import { TAG_CONNECTOR } from "../../../constants/StyleConstants";
import "@mozilla-protocol/core/protocol/css/protocol.css";

const Link = require("react-router-dom").Link;
type VotingTableMobileRowProps = {
  /** the name of the matter that was voted on */
  legislationName: string;
  /** the index of the row */
  index: number;
  /** the persons vote */
  voteDecision: VOTE_DECISION;
  /** the voting body decision */
  councilDecision: MATTER_STATUS_DECISION;
  /** link to the detail page of the matter being voted on */
  legislationLink: string;
  /** words indicating the topic of the matter being voted on */
  legislationTags: string[];
  /** date of the matter being voted on */
  meetingDate: Date;
  /** link to the detail page of the meeting */
  meetingLink: string;
  /** name of the voting body */
  committeeName: string;
};

const VotingTableMobileRow = ({
  index,
  legislationLink,
  legislationName,
  legislationTags,
  voteDecision,
  councilDecision,
  meetingDate,
  meetingLink,
  committeeName,
}: VotingTableMobileRowProps) => {
  const backgroundColor = index % 2 === 0 ? "rgb(236,236,236)" : "white";
  const dateText = meetingDate.toDateString();
  const col: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    backgroundColor,
    marginTop: 4,
    marginBottom: 4,
  };
  const row: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "solid 1px rgba(0,0,0,0.2)",
  };

  return (
    <div style={col}>
      <div style={row}>
        <div>Legislation</div>
        <Link to={legislationLink}>{legislationName}</Link>
      </div>
      <div style={row}>
        <div>Vote</div>
        <div>
          <DecisionResult result={voteDecision} />
        </div>
      </div>
      <div style={row}>
        <div>Council Decision</div>
        <div>
          <DecisionResult result={councilDecision} />
        </div>
      </div>
      <div style={row}>
        <div>Meeting</div>
        <div>
          <Link to={meetingLink}>{committeeName}</Link>
        </div>
      </div>
      <div style={row}>
        <div>Date</div>
        <div>{dateText}</div>
      </div>
    </div>
  );
};
export default VotingTableMobileRow;
