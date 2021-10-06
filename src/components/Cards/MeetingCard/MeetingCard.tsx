import React from "react";
import { TAG_CONNECTOR } from "../../../constants/StyleConstants";
import "@mozilla-protocol/core/protocol/css/protocol.css";
import { strings } from "../../../assets/LocalizedStrings";

export type MeetingCardProps = {
  /** The poster image src of the event */
  imgSrc: string;
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

const MeetingCard = ({
  imgSrc,
  imgAlt,
  meetingDate,
  committee,
  tags,
  excerpt,
}: MeetingCardProps) => {
  const tagString = tags.join(TAG_CONNECTOR);

  return (
    <section className="mzp-c-card mzp-has-aspect-16-9">
      <div>
        <div className="mzp-c-card-media-wrapper">
          <img className="mzp-c-card-image" src={imgSrc} alt={imgAlt} />
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
    </section>
  );
};

export default MeetingCard;
