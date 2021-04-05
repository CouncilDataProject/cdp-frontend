import React from "react";
import styled from "@emotion/styled";
import { VotingTableCardCell } from "../VotingTableCardCell";
import "@mozilla-protocol/core/protocol/css/protocol.css";

type VotingTableCardProps = {
  name: string; // the name of the legislator
  votesPage: object[]; // an array of Votes
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
const MiniTable = styled("div")({
  display: "flex",
  flex: 1,
});

const Legislation = styled("div")({
  width: "30%",
  marginLeft: 4,
});
const Vote = styled("div")({
  width: "15%",
});
const Decison = styled("div")({
  width: "20%",
});
const Meeting = styled("div")({
  width: "35%",
});

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
      <MiniTable>
        <Legislation className="mzp-c-card-desc">
          <h6>Legislation</h6>
        </Legislation>
        <Vote>
          <h6>{name}&apos;s Vote</h6>
        </Vote>
        <Decison>
          <h6>Council Decision</h6>
        </Decison>
        <Meeting>
          <h6>Meeting</h6>
        </Meeting>
      </MiniTable>
      {votesPage.map((vote: any, index: number) => {
        const legislationName = vote.matter.name;
        const isInFavor = vote.decision;
        const decision = vote.council_decision;
        const legislationLink = `${window.location.hostname}/matters/${vote.matter.id}`;
        const tags = vote.matter.keywords;
        const meetingDate = vote.event.date;
        const meetingLink = `${window.location.hostname}/events/${vote.event.id}`;
        const committeeName = vote.event.body_name;

        const isEven = index % 2 === 0;

        return (
          <VotingTableCardCell
            key={`voting-table-card-cell-${index}`}
            isEven={isEven}
            legislationName={legislationName}
            isInFavor={isInFavor}
            decision={decision}
            legislationLink={legislationLink}
            tags={tags}
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
