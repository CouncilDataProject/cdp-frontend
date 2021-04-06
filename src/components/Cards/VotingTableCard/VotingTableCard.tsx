import React from "react";
import { VotingTableCardRow } from "../VotingTableCardRow";
import "@mozilla-protocol/core/protocol/css/protocol.css";

type VotingTableCardProps = {
  /** the name of the legislator */
  name: string;
  /** an array of Votes */
  votesPage: object[];
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

function renderEmpty() {
  return (
    <blockquote>
      <p>Votes must be thrown for votes to be counted.</p>
      <cite>A. Nonymous</cite>
    </blockquote>
  );
}

const VotingTableCard = ({ name, votesPage }: VotingTableCardProps) => {
  if (!votesPage || !votesPage.length || votesPage.length === 0) return renderEmpty();
  return (
    <table className="mzp-u-data-table" style={{ width: "100%" }}>
      <caption>{name}&apos;s Voting Record</caption>
      <colgroup>
        <col style={{ width: "30%" }} />
        <col style={{ width: "15%" }} />
        <col style={{ width: "20%" }} />
        <col style={{ width: "35%" }} />
      </colgroup>
      <thead>
        <th scope="col">Legislation</th>
        <th scope="col">{name}&apos;s Vote</th>
        <th scope="col">Council Decision</th>
        <th scope="col">Meeting</th>
      </thead>
      {votesPage.map((vote: any, index: number) => {
        const legislationName = vote.matter.name;
        const voteDecision = vote.decision;
        const councilDecision = vote.council_decision;
        const legislationLink = `${window.location.hostname}/matters/${vote.matter.id}`;
        const tags = vote.matter.keywords;
        const meetingDate = vote.event.date;
        const meetingLink = `${window.location.hostname}/events/${vote.event.id}`;
        const committeeName = vote.event.body_name;

        const isEven = index % 2 === 0;

        return (
          <VotingTableCardRow
            key={`voting-table-card-row-${index}`}
            isEven={isEven}
            legislationName={legislationName}
            voteDecision={voteDecision}
            councilDecision={councilDecision}
            legislationLink={legislationLink}
            legislationTags={tags}
            meetingDate={meetingDate}
            meetingLink={meetingLink}
            committeeName={committeeName}
          />
        );
      })}
    </table>
  );
};

export default VotingTableCard;
