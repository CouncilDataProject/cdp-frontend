import React from "react";
import AdoptedIcon from "./AdoptedIcon";
import RejectedIcon from "./RejectedIcon";
import InProgressIcon from "./InProgressIcon";
import AbstainIcon from "../Shared/AbstainIcon";
import { useMediaQuery } from "react-responsive";
import { MATTER_STATUS_DECISION } from "../../constants/ProjectConstants";
import { VOTE_DECISION } from "../../constants/ProjectConstants";
import "@mozilla-protocol/core/protocol/css/protocol.css";

interface DecisionResultProps {
  /**Result of the vote or council decision.  This is an enum value, you can see the enumeration in ProjectConstants */
  result: VOTE_DECISION | MATTER_STATUS_DECISION;
}

const DecisionResult = ({ result }: DecisionResultProps) => {
  let statusIcon = <div />;
  switch (result) {
    case VOTE_DECISION.APPROVE:
      statusIcon = <AdoptedIcon />;
      break;
    case VOTE_DECISION.REJECT:
      statusIcon = <RejectedIcon />;
      break;
    case VOTE_DECISION.ABSTAIN:
      statusIcon = <AbstainIcon />;
      break;
    case MATTER_STATUS_DECISION.REJECTED:
      statusIcon = <RejectedIcon />;
      break;
    case MATTER_STATUS_DECISION.ADOPTED:
      statusIcon = <AdoptedIcon />;
      break;
    case MATTER_STATUS_DECISION.IN_PROGRESS:
      statusIcon = <InProgressIcon />;
      break;
    default:
      break;
  }

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });

  if (isMobile) {
    return (
      <div
        style={{
          height: 24,
          width: 24,
        }}
      >
        {statusIcon}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: 24,
          width: 24,
        }}
      >
        {statusIcon}
      </div>
      <div>
        <p className="mzp-c-card-desc" style={{ marginLeft: 8 }}>
          {result}
        </p>
      </div>
    </div>
  );
};
DecisionResult.defaultProps = {
  result: "In Progress",
};
export default DecisionResult;
