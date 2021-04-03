import React from "react";
import styled from "@emotion/styled";
import DecisionResult from "../../Shared/DecisionResult";
import "@mozilla-protocol/core/protocol/css/protocol.css";

type VotingTableCardCellProps = {
  legislationName: string;
  isEven: boolean;
  isInFavor: string;
  decision: string;
  legislationLink: string;
  tags: string[];
  meetingDate: string;
  meetingLink: string;
  committeeName: string;
};

const MiniTable = styled("div")({
  display: "flex",
  padding: 4,
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

const VotingTableCardCell = ({
  isEven,
  legislationLink,
  legislationName,
  tags,
  isInFavor,
  decision,
  meetingDate,
  meetingLink,
  committeeName,
}: VotingTableCardCellProps) => {
  const backgroundColor = isEven ? "rgba(148,148,148,0.2)" : "white";
  const tagString = tags && tags.length > 0 ? tags.join(` • `) : "";
  const dateText = new Date(meetingDate).toDateString();
  return (
    <MiniTable style={{ backgroundColor }} key={`voting-table-card-cell-${legislationName}`}>
      <Legislation>
        <a className="mzp-c-cta-link" href={legislationLink}>
          {legislationName}
        </a>
        <p className="mzp-c-card-desc">{tagString}</p>
      </Legislation>
      <Vote style={{ display: "flex", alignItems: "center" }}>
        <DecisionResult result={isInFavor} />
      </Vote>
      <Decison style={{ display: "flex", alignItems: "center" }}>
        <DecisionResult result={decision} />
      </Decison>
      <Meeting>
        <a className="mzp-c-cta-link" href={meetingLink}>
          {dateText}
        </a>
        <p className="mzp-c-card-desc">{committeeName}</p>
      </Meeting>
    </MiniTable>
  );
};

export default VotingTableCardCell;
