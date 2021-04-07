import React from "react";
import LegislationAdoptedIcon from "../Cards/LegislationCard/LegislationAdoptedIcon";
import LegislationRejectedIcon from "../Cards/LegislationCard/LegislationRejectedIcon";
import LegislationInProgressIcon from "../Cards/LegislationCard/LegislationInProgressIcon";
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
      statusIcon = <LegislationAdoptedIcon />;
      break;
    case VOTE_DECISION.REJECT:
      statusIcon = <LegislationRejectedIcon />;
      break;
    case MATTER_STATUS_DECISION.REJECTED:
      statusIcon = <LegislationRejectedIcon />;
      break;
    case MATTER_STATUS_DECISION.ADOPTED:
      statusIcon = <LegislationAdoptedIcon />;
      break;
    case MATTER_STATUS_DECISION.IN_PROGRESS:
      statusIcon = <LegislationInProgressIcon />;
      break;
    default:
      break;
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
