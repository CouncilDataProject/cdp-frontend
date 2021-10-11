import React from "react";
import { VotingTableRow } from "../VotingTableRow";
import { EmptyRow } from "../EmptyRow";
import { strings } from "../../../assets/LocalizedStrings";
import { ReactiveTable } from "../ReactiveTable";
import "@mozilla-protocol/core/protocol/css/protocol.css";

export type VotingTableProps = {
  /** the name of the legislator */
  name: string;
  /** an array of Votes */
  votesPage: any[];
};

/*
This component is passed an array of Votes via the votesPage prop.
This is what a Vote looks like.
{
  matter: {
    id: vote.matter_ref,
    name: get_matter(vote.matter_ref).name,
    keywords: MAKE OPTIONAL FOR NOW
  },
  decision: vote.decision,
  council_decision: get_event_minutes_item(vote.event_minutes_item_ref).decision,
  event: {
    id: vote.event_ref,
    date: get_event(vote.event_ref).event_datetime,
    body_name: get_body(get_event(vote.event_ref).body_ref).name,
  }
}
*/

function renderEmpty(index: number) {
  return <EmptyRow key={`empty-table-row-${index}`} index={index} />;
}

const VotingTable = ({ name, votesPage }: VotingTableProps) => {
  const COLUMN_NAMES = [
    strings.legislation,
    strings.persons_vote.replace("{name}", name),
    strings.council_decision,
    strings.meeting,
  ];
  const COLUMN_DISTRIBUTION = ["30%", "15%", "20%", "35%"];

  function renderRow(vote: any, index: number) {
    if (!vote.matter || !vote.decision || !vote.event) return renderEmpty(index);
    const legislationName = vote.matter.name;
    const voteDecision = vote.decision;
    const councilDecision = vote.council_decision;
    const legislationLink = `/matters/${vote.matter.id}`;
    const tags = vote.matter.keywords;
    const meetingDate = vote.event.date;
    const meetingLink = `/events/${vote.event.id}`;
    const committeeName = vote.event.body_name;
    return (
      <VotingTableRow
        key={`voting-table-row-${index}`}
        index={index}
        legislationName={legislationName}
        voteDecision={voteDecision}
        councilDecision={councilDecision}
        legislationLink={legislationLink}
        legislationTags={tags}
        meetingDate={meetingDate}
        meetingLink={meetingLink}
        committeeName={committeeName}
        columnNames={COLUMN_NAMES}
        columnDistribution={COLUMN_DISTRIBUTION}
      />
    );
  }

  return (
    <ReactiveTable
      data={votesPage}
      columnDistribution={COLUMN_DISTRIBUTION}
      columnNames={COLUMN_NAMES}
      caption={<p>{`${name}'s Voting Record`}</p>}
      renderRow={renderRow}
    />
  );
};

export default VotingTable;
