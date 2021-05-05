import React from "react";
import DecisionResult from "../../Shared/DecisionResult";
import { MATTER_STATUS_DECISION } from "../../../constants/ProjectConstants";
import { VOTE_DECISION } from "../../../constants/ProjectConstants";
import { TAG_CONNECTOR } from "../../../constants/StyleConstants";
import "@mozilla-protocol/core/protocol/css/protocol.css";

const Link = require("react-router-dom").Link;
type VotingTableRowProps = {
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
  meetingDate: string;
  /** link to the detail page of the meeting */
  meetingLink: string;
  /** name of the voting body */
  committeeName: string;
};

const VotingTableRow = ({
  index,
  legislationLink,
  legislationName,
  legislationTags,
  voteDecision,
  councilDecision,
  meetingDate,
  meetingLink,
  committeeName,
}: VotingTableRowProps) => {
  const backgroundColor = index % 2 === 0 ? "rgb(236,236,236)" : "white";
  const legislationTagsString =
    legislationTags && legislationTags.length > 0 ? legislationTags.join(TAG_CONNECTOR) : "";
  const dateText = new Date(meetingDate).toDateString();
  return (
    <tr style={{ backgroundColor }} key={`voting-table-row-${index}`}>
      <th scope="row">
        <Link to={legislationLink}>{legislationName}</Link>
        <p className="mzp-c-card-desc">{legislationTagsString}</p>
      </th>
      <td>
        <DecisionResult result={voteDecision} />
      </td>
      <td>
        <DecisionResult result={councilDecision} />
      </td>
      <td>
        <Link to={meetingLink}>{dateText}</Link>
        <p className="mzp-c-card-desc">{committeeName}</p>
      </td>
    </tr>
  );
};
export default VotingTableRow;
