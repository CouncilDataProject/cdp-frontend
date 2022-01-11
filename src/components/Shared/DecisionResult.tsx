import React, { FC } from "react";
import AdoptedIcon from "./AdoptedIcon";
import RejectedIcon from "./RejectedIcon";
import InProgressIcon from "./InProgressIcon";
import AbstainIcon from "../Shared/AbstainIcon";
import { useMediaQuery } from "react-responsive";
import { screenWidths } from "../../styles/mediaBreakpoints";
import {
  MATTER_STATUS_DECISION,
  EVENT_MINUTES_ITEM_DECISION,
  VOTE_DECISION,
} from "../../constants/ProjectConstants";
import { strings } from "../../assets/LocalizedStrings";

interface DecisionResultProps {
  /**Result of the vote or council decision.  This is an enum value, you can see the enumeration in ProjectConstants */
  result: VOTE_DECISION | MATTER_STATUS_DECISION | EVENT_MINUTES_ITEM_DECISION;
}

const DecisionResult: FC<DecisionResultProps> = ({ result }: DecisionResultProps) => {
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
    case EVENT_MINUTES_ITEM_DECISION.PASSED:
      statusIcon = <AdoptedIcon />;
      break;
    default:
      break;
  }

  const isMobile = useMediaQuery({ query: `(max-width: ${screenWidths.tablet})` });

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
          {`${strings[result.toLowerCase().replace(" ", "_")]}`}
        </p>
      </div>
    </div>
  );
};
DecisionResult.defaultProps = {
  result: MATTER_STATUS_DECISION.IN_PROGRESS,
};
export default DecisionResult;
