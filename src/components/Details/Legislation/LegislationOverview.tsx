import React, { FC } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

import Event from "../../../models/Event";
import MatterStatus from "../../../models/MatterStatus";
import Person from "../../../models/Person";

import { useAppConfigContext, useLanguageConfigContext } from "../../../app";

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
    fontSize: fontSizes.font_size_6,
    fontWeight: 400,
  },
});

const SponsorLinks = styled.div({
  display: "flex",
  flexWrap: "wrap",
});

const Dl = styled.dl({
  fontSize: fontSizes.font_size_6,
  display: "flex",
  flexDirection: "column",
  rowGap: 16,
  "& > div:not(:nth-of-type(2))": {
    display: "flex",
    columnGap: 4,
    flexWrap: "wrap",
  },
  "& > div:nth-of-type(2)": {
    // add some more vertical space around the progress bar
    margin: "16px 0",
  },
  "& > div:nth-of-type(2) > dt": {
    // hide the dt for the progress bar
    width: 0,
    height: 0,
    overflow: "hidden",
  },
  "& dt": {
    fontWeight: 600,
  },
  "& dd": {
    fontWeight: 400,
  },
});

export interface LegislationOverviewProps {
  /** The latest matter status of the matter */
  matterStatus: MatterStatus;
  /** The latest event where the matter was a minutes item */
  event?: Event;
  /** The persons who sponsored the matter */
  sponsors: Person[];
  /** The latest document of  the matter */
  document?: { name: string; url: string };
}

const LegislationOverview: FC<LegislationOverviewProps> = ({
  matterStatus,
  event,
  sponsors,
  document,
}: LegislationOverviewProps) => {
  const { municipality } = useAppConfigContext();
  const { language } = useLanguageConfigContext();

  return (
    <div>
      <Title hasBorderBottom={true} className="mzp-u-title-xs">
        <span>Legislation Overview</span>
        <em>{`Last Updated ${matterStatus.update_datetime.toLocaleDateString(language, {
          timeZone: municipality.timeZone,
          month: "long",
          day: "numeric",
          year: "numeric",
        })}`}</em>
      </Title>
      <Dl>
        <div>
          <dt>Legislation Status:</dt>
          <dd>
            <DecisionResult result={matterStatus.status} />
          </dd>
        </div>
        <div>
          <dt>Progress bar</dt>
          <dd>
            <ProgressBar status={matterStatus.status} />
          </dd>
        </div>
        {event && (
          <div>
            <dt>Latest Meeting:</dt>
            <dd>
              <Link to={`/events/${event.id}`}>
                {event.event_datetime.toLocaleDateString(language, {
                  timeZone: municipality.timeZone,
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Link>
            </dd>
          </div>
        )}
        {document && (
          <div>
            <dt>Latest Document:</dt>
            <dd>
              <a target="_blank" rel="noopener noreferrer" href={document.url}>
                {document.name}
              </a>
            </dd>
          </div>
        )}
        <div>
          <dt>Sponsored by:</dt>
          <dd>
            <SponsorLinks>
              {sponsors.map((sponsor, i) => [
                i > 0 && <span style={{ whiteSpace: "pre-wrap" }}>{",  "}</span>,
                <Link key={sponsor.id} to={`/people/${sponsor.id}`}>
                  {sponsor.name}
                </Link>,
              ])}
            </SponsorLinks>
          </dd>
        </div>
      </Dl>
    </div>
  );
};

export default LegislationOverview;
