import React, { FC } from "react";
import styled from "@emotion/styled";
import AdoptedIcon from "../../Shared/AdoptedIcon";
import RejectedIcon from "../../Shared/RejectedIcon";
import InProgressIcon from "../../Shared/InProgressIcon";
import { TAG_CONNECTOR } from "../../../constants/StyleConstants";
import { MATTER_STATUS_DECISION } from "../../../constants/ProjectConstants";
import { strings } from "../../../assets/LocalizedStrings";

import "@mozilla-protocol/core/protocol/css/protocol.css";

const StatusIconContainer = styled.div({
  float: "right",
  marginRight: 8,
  height: 24,
  width: 24,
});

export interface LegislationCardProps {
  /**The name of the legislation */
  name: string;
  /**The status of legislation. If legislation is in progress then the status is Next Meeting */
  status: MATTER_STATUS_DECISION;
  /**The legislation status's date or the date of the next meeting */
  date?: string;
  /** List of legislation keywords */
  tags: string[];
}

const LegislationCard: FC<LegislationCardProps> = ({
  name,
  status,
  date,
  tags,
}: LegislationCardProps) => {
  const tagString = tags.map((tag) => tag.toLowerCase()).join(TAG_CONNECTOR);

  let statusIcon;

  if (status === "Adopted") {
    statusIcon = <AdoptedIcon />;
  } else if (status === "Rejected") {
    statusIcon = <RejectedIcon />;
  } else {
    statusIcon = <InProgressIcon />;
  }

  return (
    <section className="mzp-c-card mzp-c-card-medium mzp-has-aspect-16-9">
      <div className="mzp-c-card-block-link">
        <div className="mzp-c-card-content">
          <h2 className="mzp-c-card-title">{name}</h2>
          <p className="mzp-c-card-meta">{status}</p>
          <StatusIconContainer>{statusIcon}</StatusIconContainer>
          <p className="mzp-c-card-desc">{date}</p>
          <p className="mzp-c-card-meta">{strings.keywords}</p>
          <p className="mzp-c-card-desc">{tagString}</p>
        </div>
      </div>
    </section>
  );
};

export default LegislationCard;
