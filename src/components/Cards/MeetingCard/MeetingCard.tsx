import React from "react";
import styled from "@emotion/styled";
import { TAG_CONNECTOR } from "../../../constants/StyleConstants";
import "@mozilla-protocol/core/protocol/css/protocol.css";
import { strings } from "../../../assets/LocalizedStrings";

export type MeetingCardProps = {
  /** The static poster image src of the event */
  staticImgSrc: string;
  /** The animated post image src of the event */
  hoverImgSrc: string;
  /** The alternative title of the post image */
  imgAlt: string;
  /** The event's date */
  meetingDate: string;
  /** The event's committee */
  committee: string;
  /** Tags for the event */
  tags: string[];
  /** A context span if the event was found through searching */
  excerpt?: string;
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
}: MeetingCardProps) => {
  const tagString = tags.map((tag) => tag.toLowerCase()).join(TAG_CONNECTOR);

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
          {excerpt ? (
            <p
              className="mzp-c-card-desc"
              style={{
                fontStyle: "italic",
                marginTop: "1rem",
              }}
            >{`"${excerpt}"`}</p>
          ) : null}
          <p className="mzp-c-card-meta">{strings.tags}</p>
          <p className="mzp-c-card-desc">{tagString}</p>
        </div>
      </div>
    </Meeting>
  );
};

export default MeetingCard;
