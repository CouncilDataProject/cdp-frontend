import React, { useState } from "react";
import DecisionResult from "../../Shared/DecisionResult";
import { EVENT_MINUTES_ITEM_DECISION, VOTE_DECISION } from "../../../models/constants";
import { TAG_CONNECTOR } from "../../../constants/StyleConstants";
import { IndividualMeetingVote } from "../../Shared/Types/IndividualMeetingVote";
import { ReactiveTableRow } from "../ReactiveTableRow";
import { useMediaQuery } from "react-responsive";
import { screenWidths } from "../../../styles/mediaBreakpoints";
import { strings } from "../../../assets/LocalizedStrings";
import { Link } from "react-router-dom";

type MeetingVotesTableRowProps = {
  /** the name of the matter that was voted on */
  legislationName: string;
  /** the description of the matter that was voted on */
  legislationDescription: string;
  /** the index of the row */
  index: number;
  /** the voting body decision */
  councilDecision: EVENT_MINUTES_ITEM_DECISION;
  /** link to the detail page of the matter being voted on */
  legislationLink: string;
  /** vote results by individual members on the matter in this row */
  votes: IndividualMeetingVote[];
  /** name of the columns this row displays */
  columnNames: string[];
  /** sizes of each column from left to right */
  columnDistribution: string[];
};

function VoteCell(votes: IndividualMeetingVote[], isMobile: boolean) {
  const [expanded, setExpanded] = useState(false);
  let votesFor = 0;
  let votesAgainst = 0;
  let nonVotes = 0;
  votes.forEach((vote) => {
    if (
      [VOTE_DECISION.ABSENT_APPROVE, VOTE_DECISION.ABSTAIN_APPROVE, VOTE_DECISION.APPROVE].includes(
        vote.decision
      )
    )
      votesFor++;
    if (
      [VOTE_DECISION.ABSENT_REJECT, VOTE_DECISION.ABSTAIN_REJECT, VOTE_DECISION.REJECT].includes(
        vote.decision
      )
    )
      votesAgainst++;
    if ([VOTE_DECISION.ABSENT_NON_VOTING, VOTE_DECISION.ABSTAIN_NON_VOTING].includes(vote.decision))
      nonVotes++;
  });
  const votesForLabel = strings.number_approved.replace("{number}", `${votesFor}`);
  const votesAgainstLabel = strings.number_rejected.replace("{number}", `${votesAgainst}`);
  const votesAbstainedLabel = strings.number_non_voting.replace("{number}", `${nonVotes}`);
  return (
    <React.Fragment>
      {isMobile ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>{votesForLabel}</p>
          <p>{votesAgainstLabel}</p>
          <p>{votesAbstainedLabel}</p>
        </div>
      ) : (
        <p>{`${votesForLabel} ${TAG_CONNECTOR} ${votesAgainstLabel} ${TAG_CONNECTOR} ${votesAbstainedLabel}`}</p>
      )}
      {votes.map((vote, index) => {
        if (!expanded && index > 4) {
          return;
        }
        const personLink = `/people/${vote.personId}`;
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
            <Link style={{ flex: 1 }} to={personLink}>
              {vote.name}
            </Link>
            <DecisionResult result={vote.decision} />
          </div>
        );
      })}
      {votes.length > 5 && (
        <button
          className="mzp-c-button mzp-t-product mzp-t-secondary mzp-t-sm"
          style={{
            marginTop: 10,
          }}
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          {expanded ? "Show Less" : "Show All Votes for Matter "}
        </button>
      )}
    </React.Fragment>
  );
}

const MeetingVotesTableRow = ({
  index,
  legislationLink,
  legislationName,
  legislationDescription,
  councilDecision,
  votes,
  columnNames,
  columnDistribution,
}: MeetingVotesTableRowProps) => {
  const isMobile = useMediaQuery({ query: `(max-width: ${screenWidths.tablet})` });

  return (
    <ReactiveTableRow
      key={`meeting-table-row-${index}`}
      index={index}
      columnNames={columnNames}
      columnDistribution={columnDistribution}
    >
      <div>
        <Link to={legislationLink}>
          <p className="mzp-c-card-desc" style={{ fontWeight: 600, marginBottom: 0 }}>
            {legislationName}
          </p>
        </Link>
        {!isMobile && <p>{legislationDescription}</p>}
      </div>
      <DecisionResult result={councilDecision} />
      {VoteCell(votes, isMobile)}
    </ReactiveTableRow>
  );
};
export default MeetingVotesTableRow;
