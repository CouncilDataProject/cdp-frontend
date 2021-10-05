import React from "react";
import DecisionResult from "../../Shared/DecisionResult";
import { MATTER_STATUS_DECISION } from "../../../constants/ProjectConstants";
import { VOTE_DECISION } from "../../../constants/ProjectConstants";
import { TAG_CONNECTOR } from "../../../constants/StyleConstants";
import "@mozilla-protocol/core/protocol/css/protocol.css";
import useMediaQuery from "react-responsive";
import { screenWidths } from "../../../styles/mediaBreakpoints";
import { ReactiveTableRow } from "../ReactiveTableRow";
import { Link } from "react-router-dom";

export type VotingTableRowProps = {
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
  /** name of the columns this row displays */
  columnNames: string[];
  /** sizes of each column from left to right */
  columnDistribution: string[];
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
  columnNames,
  columnDistribution,
}: VotingTableRowProps) => {
  const legislationTagsString =
    legislationTags && legislationTags.length > 0 ? legislationTags.join(TAG_CONNECTOR) : "";
  const dateText = meetingDate?.toDateString();
  const isMobile = new useMediaQuery({ query: `(max-width: ${screenWidths.tablet})` });

  return (
    <ReactiveTableRow
      key={`voting-table-row-${index}`}
      index={index}
      columnNames={columnNames}
      columnDistribution={columnDistribution}
    >
      <React.Fragment>
        <Link to={legislationLink}>{legislationName}</Link>
        {!isMobile && <p className="mzp-c-card-desc">{legislationTagsString}</p>}
      </React.Fragment>
      <DecisionResult result={voteDecision} />
      <DecisionResult result={councilDecision} />
      <React.Fragment>
        <Link to={meetingLink}>{dateText}</Link>
        {!isMobile && <p className="mzp-c-card-desc">{committeeName}</p>}
      </React.Fragment>
    </ReactiveTableRow>
  );
};
export default VotingTableRow;
