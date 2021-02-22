import React, { FC } from "react";
import styled from "@emotion/styled";

import LegislationAdoptedIcon from "./LegislationAdoptedIcon";
import LegislationRejectedIcon from "./LegislationRejectedIcon";
import LegislationInProgressIcon from "./LegislationInProgressIcon";

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
  status: string;
  /**The legislation status's date or the date of the next meeting */
  date?: string;
  /** List of legislation keywords */
  tags: string[];
}

const LegislationCard: FC<LegislationCardProps> = ({ name, status, date, tags }) => {
  const tagString = tags.join(` • `);

  let statusIcon;

  if (status === "Adopted") {
    statusIcon = <LegislationAdoptedIcon />;
  } else if (status === "Rejected") {
    statusIcon = <LegislationRejectedIcon />;
  } else {
    statusIcon = <LegislationInProgressIcon />;
  }

  return (
    <section className="mzp-c-card mzp-has-aspect-16-9">
      <div className="mzp-c-card-block-link">
        <div className="mzp-c-card-content">
          <h2 className="mzp-c-card-title">{name}</h2>
          <p className="mzp-c-card-meta">{status}</p>
          &bull;
          <StatusIconContainer>{statusIcon}</StatusIconContainer>
          <p className="mzp-c-card-desc">{date}</p>
          <p className="mzp-c-card-meta">Tags</p>
          <p className="mzp-c-card-desc">{tagString}</p>
        </div>
      </div>
    </section>
  );
};

export default LegislationCard;
