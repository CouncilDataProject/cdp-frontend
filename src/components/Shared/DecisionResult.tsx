import React, { CSSProperties, FC } from "react";
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
} from "../../models/constants";
import { strings } from "../../assets/LocalizedStrings";

interface DecisionResultProps {
  /**Result of the vote or council decision.  This is an enum value, you can see the enumeration in ProjectConstants */
  result: VOTE_DECISION | MATTER_STATUS_DECISION | EVENT_MINUTES_ITEM_DECISION;
  style?: CSSProperties;
}

const DecisionResult: FC<DecisionResultProps> = ({ result, style }: DecisionResultProps) => {
  let statusIcon = <div />;
  switch (result) {
    case EVENT_MINUTES_ITEM_DECISION.PASSED:
    case MATTER_STATUS_DECISION.ADOPTED:
    case VOTE_DECISION.ABSENT_APPROVE:
    case VOTE_DECISION.ABSTAIN_APPROVE:
    case VOTE_DECISION.APPROVE:
      statusIcon = <AdoptedIcon />;
      break;
    case EVENT_MINUTES_ITEM_DECISION.FAILED:
    case MATTER_STATUS_DECISION.REJECTED:
    case VOTE_DECISION.ABSENT_REJECT:
    case VOTE_DECISION.ABSTAIN_REJECT:
    case VOTE_DECISION.REJECT:
      statusIcon = <RejectedIcon />;
      break;
    case VOTE_DECISION.ABSENT_NON_VOTING:
    case VOTE_DECISION.ABSTAIN_NON_VOTING:
      statusIcon = <AbstainIcon />;
      break;
    case MATTER_STATUS_DECISION.IN_PROGRESS:
      statusIcon = <InProgressIcon />;
      break;
    default:
      break;
  }

  const isMobile = useMediaQuery({ query: `(max-width: ${screenWidths.tablet})` });
  // remove `(` and `)`, replace ` ` and `-` with `_`
  const decision = strings[result.toLowerCase().replace(/[()]/g, "").replace(/[ -]/g, "_")];

  if (!style) {
    style = {
      display: "flex",
      flex: 1,
      alignItems: "center",
    };
  }

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
    <div style={style}>
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
          {decision}
        </p>
      </div>
    </div>
  );
};
DecisionResult.defaultProps = {
  result: MATTER_STATUS_DECISION.IN_PROGRESS,
};
export default DecisionResult;
