import React, { useMemo } from "react";
import styled from "@emotion/styled";
import Highlighter from "react-highlight-words";
import { TAG_CONNECTOR } from "../../../constants/StyleConstants";
import "@mozilla-protocol/core/protocol/css/protocol.css";
import { strings } from "../../../assets/LocalizedStrings";

export type MeetingCardProps = {
  /** The static poster image src of the event */
  staticImgSrc: string;
  /** The animated poster image src of the event */
  hoverImgSrc: string;
  /** The alternative title of the poster image */
  imgAlt: string;
  /** The event's date */
  meetingDate: string;
  /** The event's committee */
  committee: string;
  /** Tags for the event */
  tags: string[];
  /** A context span if the event was found through searching */
  excerpt?: string;
  /** The highest value gram of the context span */
  gram?: string;
  /** The query used to find this meeting */
  query?: string;
};

const Meeting = styled.section({
  // show the first img and second img on hover
  "& img:first-of-type, &:hover img:last-of-type": {
    visibility: "visible",
  },
  // hide the second img and first img on hover
  "& img:last-of-type, &:hover img:first-of-type": {
    visibility: "hidden",
  },
  marginBottom: 0,
});

const MeetingCard = ({
  staticImgSrc,
  hoverImgSrc,
  imgAlt,
  meetingDate,
  committee,
  tags,
  excerpt,
  gram,
  query,
}: MeetingCardProps) => {
  const tagString = tags.map((tag) => tag.toLowerCase()).join(TAG_CONNECTOR);

  const searchWords = useMemo(() => {
    const words = [query || "", gram || ""].filter((el) => el.length > 0);
    if (words.length === 0) {
      return [];
    }
    return [new RegExp(`\\b(${words.join("|")})`, "g")];
  }, [query, gram]);

  return (
    <Meeting className="mzp-c-card mzp-has-aspect-16-9">
      <div className="mzp-c-card-block-link">
        <div className="mzp-c-card-media-wrapper">
          <img className="mzp-c-card-image" src={staticImgSrc} alt={imgAlt} />
          <img className="mzp-c-card-image" src={hoverImgSrc} alt={imgAlt} />
        </div>
        <div className="mzp-c-card-content">
          <div className="mzp-c-card-tag">{strings.committee}</div>
          <h2 className="mzp-c-card-title">{meetingDate}</h2>
          <p className="mzp-c-card-desc">{committee}</p>
          {excerpt && (
            <p
              className="mzp-c-card-desc"
              style={{
                fontStyle: "italic",
                marginTop: "1rem",
              }}
            >
              <Highlighter
                caseSensitive={false}
                searchWords={searchWords}
                textToHighlight={`"${excerpt}"`}
              />
            </p>
          )}
          <p className="mzp-c-card-meta">{strings.keywords}</p>
          <p className="mzp-c-card-desc">{tagString}</p>
        </div>
      </div>
    </Meeting>
  );
};

export default MeetingCard;
