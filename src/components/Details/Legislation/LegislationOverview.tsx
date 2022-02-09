import React, { FC } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import Event from "../../../models/Event";
import MatterStatus from "../../../models/MatterStatus";
import Person from "../../../models/Person";

import { DecisionResult } from "../../Shared";
import H2 from "../../Shared/H2";
import ProgressBar from "./ProgressBar";

import { fontSizes } from "../../../styles/fonts";

/**Note: Legislation and matter are interchangeable */

const Title = styled(H2)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  "& > em": {
    fontSize: fontSizes.font_size_5,
    fontWeight: 400,
  },
});

const SponsorLinks = styled.div({
  display: "flex",
  flexWrap: "wrap",
  columnGap: 8,
});

const Dl = styled.dl({
  display: "flex",
  flexDirection: "column",
  rowGap: 16,
  "& > div": {
    display: "flex",
    columnGap: 4,
    flexWrap: "wrap",
  },
  "& dt": {
    fontWeight: 600,
  },
});

const Status = styled.div({
  display: "flex",
  columnGap: 4,
});

export interface LegislationOverviewProps {
  /** The latest matter of the matter */
  matterStatus: MatterStatus;
  /** The latest event where the matter was a minutes item */
  event: Event;
  /** The persons who sponsored the matter */
  sponsors: Person[];
  /** The latest document of  the matter */
  document: { name: string; url: string };
}

const LegislationOverview: FC<LegislationOverviewProps> = ({
  matterStatus,
  event,
  sponsors,
  document,
}) => {
  return (
    <div>
      <Title hasBorderBottom={true} className="mzp-u-title-xs">
        <span>Legislation Overview</span>{" "}
        <em>{`Last Updated ${matterStatus.update_datetime.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}`}</em>
      </Title>
      <Status>
        <strong>Legislation Status:</strong> <DecisionResult result={matterStatus.status} />
      </Status>
      <br />
      <ProgressBar status={matterStatus.status} />
      <Dl>
        <div>
          <dt>Latest Meeting:</dt>
          <dd>
            <Link to={`/events/${event.id}`}>
              {event.event_datetime.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </Link>
          </dd>
        </div>
        <div>
          <dt>Latest Document:</dt>
          <dd>
            <a target="_blank" rel="noopener noreferrer" href={document.url}>
              {document.name}
            </a>
          </dd>
        </div>
        <div>
          <dt>Sponsored by:</dt>
          <dd>
            <SponsorLinks>
              {sponsors.map((sponsor) => (
                <Link key={sponsor.id} to={`/people/${sponsor.id}`}>
                  {sponsor.name}
                </Link>
              ))}
            </SponsorLinks>
          </dd>
        </div>
      </Dl>
    </div>
  );
};

export default LegislationOverview;
