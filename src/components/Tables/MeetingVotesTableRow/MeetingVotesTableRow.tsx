import React, { useState } from "react";
import DecisionResult from "../../Shared/DecisionResult";
import { MATTER_STATUS_DECISION, IndividualMeetingVote } from "../../../constants/ProjectConstants";
import { VOTE_DECISION } from "../../../constants/ProjectConstants";
import { STYLES } from "../../../constants/StyleConstants";
import { Link } from "react-router-dom";
import "@mozilla-protocol/core/protocol/css/protocol.css";

type MeetingVotesTableRowProps = {
  /** the name of the matter that was voted on */
  legislationName: string;
  /** the index of the row */
  index: number;
  /** the voting body decision */
  councilDecision: MATTER_STATUS_DECISION;
  /** link to the detail page of the matter being voted on */
  legislationLink: string;
  /** date of the matter being voted on */
  meetingDate: string;
  /** vote results by members on the council */
  votes: IndividualMeetingVote[];
};

function renderVotesCell(isExpanded: boolean, votes: IndividualMeetingVote[]) {
  if (isExpanded) {
    return (
      <td>
        {votes.map((vote) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <DecisionResult result={vote.decision} />
              <p style={{ marginTop: 8, marginLeft: 8 }}>{vote.name}</p>
            </div>
          );
        })}
      </td>
    );
  } else {
    // count votes and display 5/9
    let votesFor = 0;
    let votesAgainst = 0;
    let votesAbstained = 0;
    votes.forEach((vote) => {
      if (vote.decision === VOTE_DECISION.APPROVE) votesFor++;
      if (vote.decision === VOTE_DECISION.REJECT) votesAgainst++;
      if (vote.decision === VOTE_DECISION.ABSTAIN) votesAbstained++;
    });
    let votesMinified = `${votesFor} Approved   /   ${votesAgainst} Rejected   /   ${votesAbstained} Abstained`;
    return (
      <td>
        <p>{votesMinified}</p>
      </td>
    );
  }
}

const MeetingVotesTableRow = ({
  index,
  legislationLink,
  legislationName,
  councilDecision,
  meetingDate,
  votes,
}: MeetingVotesTableRowProps) => {
  const [expanded, setExpanded] = useState(false);

  const backgroundColor = index % 2 === 0 ? STYLES.COLORS.EVEN_CELL : STYLES.COLORS.ODD_CELL;
  const dateText = new Date(meetingDate).toDateString();
  return (
    <tr
      style={{ backgroundColor }}
      key={`voting-table-row-${index}`}
      onClick={() => {
        setExpanded(!expanded);
      }}
    >
      <th scope="row">
        <Link to={legislationLink}>{legislationName}</Link>
      </th>
      <td>
        <p className="mzp-c-card-desc">{dateText}</p>
      </td>
      <td>
        <DecisionResult result={councilDecision} />
      </td>
      {renderVotesCell(expanded, votes)}
    </tr>
  );
};
export default MeetingVotesTableRow;
