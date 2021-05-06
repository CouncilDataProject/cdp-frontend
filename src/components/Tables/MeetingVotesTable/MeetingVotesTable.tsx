import React from "react";
import { MeetingVotesTableRow } from "../MeetingVotesTableRow";
import { EmptyRow } from "../EmptyRow";
import { MeetingVote } from "../../Shared/Types/MeetingVote";
import "@mozilla-protocol/core/protocol/css/protocol.css";

type MeetingVotesTableProps = {
  /** the matter being voted upon */
  votesPage: MeetingVote[];
};

function renderEmpty(index: number) {
  return <EmptyRow key={`empty-meeting-table-row-${index}`} index={index} />;
}

function renderRows(votesPage: MeetingVote[]) {
  const isEmpty = !votesPage || !votesPage.length || votesPage.length === 0;
  return (
    <tbody>
      {isEmpty && renderEmpty(0)}
      {votesPage.map((meetingVotes: MeetingVote, index: number) => {
        if (!meetingVotes.matter || !meetingVotes.votes) return renderEmpty(index);
        const legislationName = meetingVotes.matter.name;
        const legislationDescription = meetingVotes.matter.description;
        const councilDecision = meetingVotes.council_decision;
        const legislationLink = `/matters/${meetingVotes.matter.id}`;

        return (
          <MeetingVotesTableRow
            key={`meeting-voting-table-row-${index}`}
            index={index}
            legislationName={legislationName}
            legislationDescription={legislationDescription}
            councilDecision={councilDecision}
            legislationLink={legislationLink}
            votes={meetingVotes.votes}
          />
        );
      })}
    </tbody>
  );
}

function renderColGroup() {
  return (
    <colgroup>
      <col style={{ width: "30%" }} />
      <col style={{ width: "15%" }} />
      <col style={{ width: "20%" }} />
      <col style={{ width: "35%" }} />
    </colgroup>
  );
}

function renderHeaders() {
  return (
    <thead>
      <tr>
        <th scope="col">Legislation</th>
        <th scope="col">Council Decision</th>
        <th scope="col">Votes</th>
      </tr>
    </thead>
  );
}

const VotingTable = ({ votesPage }: MeetingVotesTableProps) => {
  return (
    <table className="mzp-u-data-table" style={{ width: "100%" }}>
      <caption>Click each row to see how council members voted</caption>
      {renderColGroup()}
      {renderHeaders()}
      {renderRows(votesPage)}
    </table>
  );
};

export default VotingTable;
