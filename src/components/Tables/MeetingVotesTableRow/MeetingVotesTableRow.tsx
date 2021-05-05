import React, { useState } from "react";
import DecisionResult from "../../Shared/DecisionResult";
import { MATTER_STATUS_DECISION } from "../../../constants/ProjectConstants";
import { TAG_CONNECTOR } from "../../../constants/StyleConstants";
import { IndividualMeetingVote } from "../../Shared/Types/IndividualMeetingVote";
import { VOTE_DECISION } from "../../../constants/ProjectConstants";
import { STYLES } from "../../../constants/StyleConstants";
import "@mozilla-protocol/core/protocol/css/protocol.css";
const Link = require("react-router-dom").Link;

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
  meetingDate: Date;
  /** vote results by individual members on the matter in this row */
  votes: IndividualMeetingVote[];
};

function renderVotesCell(isExpanded: boolean, votes: IndividualMeetingVote[]) {
  if (isExpanded) {
    return (
      <td>
        {votes.map((vote, index) => {
          return (
            <div
              key={`individual-vote-${index}-${vote.id}`}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ flex: 1 }}>{vote.name}</p>
              <DecisionResult result={vote.decision} />
            </div>
          );
        })}
      </td>
    );
  } else {
    let votesFor = 0;
    let votesAgainst = 0;
    let votesAbstained = 0;
    votes.forEach((vote) => {
      if (vote.decision === VOTE_DECISION.APPROVE) votesFor++;
      if (vote.decision === VOTE_DECISION.REJECT) votesAgainst++;
      if (vote.decision === VOTE_DECISION.ABSTAIN) votesAbstained++;
    });
    const votesMinified = `${votesFor} Approved ${TAG_CONNECTOR} ${votesAgainst} Rejected ${TAG_CONNECTOR} ${votesAbstained} Abstained`;
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
  const dateText = meetingDate.toDateString();
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
