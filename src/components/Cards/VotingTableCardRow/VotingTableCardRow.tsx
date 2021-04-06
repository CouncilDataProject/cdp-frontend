import React from "react";
import DecisionResult from "../../Shared/DecisionResult";
import { MATTER_STATUS_DECISION } from "../../../constants/ProjectConstants";
import { VOTE_DECISION } from "../../../constants/ProjectConstants";
import "@mozilla-protocol/core/protocol/css/protocol.css";

type VotingTableCardRowProps = {
  /** the name of the matter that was voted on */
  legislationName: string;
  /** whether or not the row is an even or odd row */
  isEven: boolean;
  /** the persons vote */
  voteDecision: MATTER_STATUS_DECISION;
  /** the voting body decision */
  councilDecision: VOTE_DECISION;
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

const VotingTableCardRow = ({
  isEven,
  legislationLink,
  legislationName,
  legislationTags,
  voteDecision,
  councilDecision,
  meetingDate,
  meetingLink,
  committeeName,
}: VotingTableCardRowProps) => {
  const backgroundColor = isEven ? "rgba(148,148,148,0.2)" : "white";
  const legislationTagsString =
    legislationTags && legislationTags.length > 0 ? legislationTags.join(` • `) : "";
  const dateText = new Date(meetingDate).toDateString();
  return (
    <tr style={{ backgroundColor }} key={`voting-table-card-Row-${legislationName}`}>
      <th scope="row">
        <a className="mzp-c-cta-link" href={legislationLink}>
          {legislationName}
        </a>
        <p className="mzp-c-card-desc">{legislationTagsString}</p>
      </th>
      <td>
        <DecisionResult result={voteDecision} />
      </td>
      <td>
        <DecisionResult result={councilDecision} />
      </td>
      <td>
        <a className="mzp-c-cta-link" href={meetingLink}>
          {dateText}
        </a>
        <p className="mzp-c-card-desc">{committeeName}</p>
      </td>
    </tr>
  );
};

export default VotingTableCardRow;
