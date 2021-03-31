import React from "react";
import styled from "@emotion/styled";
import BooleanApprovalIcon from "../../Shared/BooleanApprovalcon";
import "@mozilla-protocol/core/protocol/css/protocol.css";

type VotingTableCardCellProps = {
  legislationName: string;
  isEven: boolean;
  isInFavor: boolean;
  decision: boolean;
  legislationLink: string;
  tags: string[];
  meetingDate: string;
  meetingLink: string;
  committeeName: string;
};

const MiniTable = styled("div")({
  display: "flex",
  padding: 2,
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
  const backgroundColor = isEven ? "lightGrey" : "white";
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
      <Vote style={{ justifyContent: "center", alignItems: "center" }}>
        <BooleanApprovalIcon isInFavor={isInFavor} style={{ maxWidth: 20, margin: 4 }} />
        <p className="mzp-c-card-desc">{isInFavor ? "In Favor" : "Not in Favor"}</p>
      </Vote>
      <Decison>
        <BooleanApprovalIcon isInFavor={decision} style={{ maxWidth: 20, margin: 4 }} />
        <p className="mzp-c-card-desc">{decision ? "In Favor" : "Not in Favor"}</p>
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
