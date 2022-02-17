import React, { FC, useMemo } from "react";
import styled from "@emotion/styled";
import Highlighter from "react-highlight-words";
import { Link } from "react-router-dom";
import { removeStopwords } from "stopword";

import { MATTER_STATUS_DECISION } from "../../../models/constants";
import Person from "../../../models/Person";

import { DecisionResult } from "../../Shared";

import { strings } from "../../../assets/LocalizedStrings";
import { CARD_DESC_MAX_LENGTH } from "../constants";
import { TAG_CONNECTOR } from "../../../constants/StyleConstants";
import cleanText from "../../../utils/cleanText";

const SponsorLinks = styled.div({
  display: "flex",
  flexWrap: "wrap",
  "& > span": {
    whiteSpace: "pre-wrap",
  },
});

export interface LegislationCardProps {
  /**The name of the legislation */
  name: string;
  /** The description of the legislation, or a context span of legislaton */
  excerpt: string;
  /**The status of legislation. If legislation is in progress then the status is Next Meeting */
  status: MATTER_STATUS_DECISION;
  /**The legislation status's date or the date of the next meeting */
  date?: string;
  /** List of legislation keywords */
  tags: string[];
  /** The sponsors of the legislation */
  sponsors: Person[];
  /** The query used to find the legislation */
  query?: string;
}

const LegislationCard: FC<LegislationCardProps> = ({
  name,
  excerpt,
  status,
  date,
  tags,
  sponsors,
  query,
}: LegislationCardProps) => {
  const tagString = tags.map((tag) => tag.toLowerCase()).join(TAG_CONNECTOR);

  const excerptStr = useMemo(() => {
    if (query) {
      // context span is short enough
      return `"${excerpt}"`;
    }

    // truncate the excerpt to the recommended 140 characters
    return excerpt.length > CARD_DESC_MAX_LENGTH
      ? `${excerpt.substring(0, CARD_DESC_MAX_LENGTH)} ...`
      : excerpt;
  }, [query, excerpt]);

  const searchWords = useMemo(() => {
    const cleanedQuery = cleanText(query || "");
    // Phrases that should be highlighted in the excerpt
    const phrases = removeStopwords(cleanedQuery.split(" "));
    if (phrases.length === 0) {
      return [];
    }
    return [new RegExp(`\\b(${phrases.join("|")})`, "g")];
  }, [query]);

  return (
    <section className="mzp-c-card mzp-c-card-medium mzp-has-aspect-16-9">
      <div className="mzp-c-card-block-link">
        <div className="mzp-c-card-content">
          <h2 className="mzp-c-card-title">{name}</h2>
          <p className="mzp-c-card-desc" style={{ fontWeight: 500, fontStyle: "italic" }}>
            <Highlighter
              caseSensitive={false}
              searchWords={searchWords}
              textToHighlight={excerptStr}
            />
          </p>
          <br />
          <SponsorLinks className="mzp-c-card-desc">
            <span>{"Sponsored by "}</span>
            {sponsors.map((sponsor, i) => [
              i > 0 && <span>{",  "}</span>,
              <Link key={sponsor.id} to={`/people/${sponsor.id}`}>
                {sponsor.name}
              </Link>,
            ])}
          </SponsorLinks>
          <br />
          <p className="mzp-c-card-desc">
            <DecisionResult result={status} />
          </p>
          {date && <p className="mzp-c-card-desc">{`Last Updated: ${date}`}</p>}
          <p className="mzp-c-card-meta">{strings.keywords}</p>
          <p className="mzp-c-card-desc">{tagString}</p>
        </div>
      </div>
    </section>
  );
};

export default LegislationCard;
