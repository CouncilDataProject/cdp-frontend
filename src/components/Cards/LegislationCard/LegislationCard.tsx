import React, { FC } from "react";
import styled from "@emotion/styled";
import colors from "../../../styles/colors";
import { fontSizes } from "../../../styles/fonts";

import "@mozilla-protocol/core/protocol/css/protocol.css";

export interface LegislationCardProps {
  /**The name of the legislation */
  name: string;
  /**The status of legislation. If legislation is in progress then the status is Next Meeting */
  status: string;
  /**The legislation status's date or the date of the next meeting */
  date: string;
  /** List of legislation keywords */
  tags: string[];
  /**Internal link to the legislation's details */
  link: string;
}

const LegislationCard: FC<LegislationCardProps> = ({ name, status, date, tags, link }) => {
  const tagString = tags.join(` • `);

  return (
    <section className="mzp-c-card mzp-has-aspect-16-9">
      <a className="mzp-c-card-block-link" href={link}>
        <div className="mzp-c-card-content">
          <h2 className="mzp-c-card-title">{name}</h2>
          <p className="mzp-c-card-meta">{status}</p>
          <p className="mzp-c-card-desc">{date}</p>
          <p className="mzp-c-card-meta">Tags</p>
          <p className="mzp-c-card-desc">{tagString}</p>
        </div>
      </a>
    </section>
  );
};

export default LegislationCard;
