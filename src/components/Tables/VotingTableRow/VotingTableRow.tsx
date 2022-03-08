import React from "react";
import DecisionResult from "../../Shared/DecisionResult";
import { VOTE_DECISION, EVENT_MINUTES_ITEM_DECISION } from "../../../models/constants";
import { TAG_CONNECTOR } from "../../../constants/StyleConstants";
import { useMediaQuery } from "react-responsive";
import { screenWidths } from "../../../styles/mediaBreakpoints";
import { ReactiveTableRow } from "../ReactiveTableRow";
import { Link } from "react-router-dom";
import { useLanguageConfigContext } from "../../../app";

export type VotingTableRowProps = {
  /** the name of the matter that was voted on */
  legislationName: string;
  /** the index of the row */
  index: number;
  /** the persons vote */
  voteDecision: VOTE_DECISION;
  /** the voting body decision */
  councilDecision: EVENT_MINUTES_ITEM_DECISION;
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
  /* legislationLink, */
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
  const { language } = useLanguageConfigContext();

  const legislationTagsString =
    legislationTags && legislationTags.length > 0 ? legislationTags.join(TAG_CONNECTOR) : "";
  const dateText = meetingDate?.toLocaleDateString(language, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const isMobile = useMediaQuery({ query: `(max-width: ${screenWidths.tablet})` });

  return (
    <ReactiveTableRow
      key={`voting-table-row-${index}`}
      index={index}
      columnNames={columnNames}
      columnDistribution={columnDistribution}
    >
      <React.Fragment>
        {/* <Link to={legislationLink}>{legislationName}</Link> */}
        <p className="mzp-c-card-desc" style={{ fontWeight: 600, marginBottom: 0 }}>
          {legislationName}
        </p>
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
