import React from "react";
import "@mozilla-protocol/core/protocol/css/protocol.css";

type MeetingCardProps = {
  imgSrc: string;
  imgAlt: string;
  meetingDate: string;
  committee: string;
  tags: string[];
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
  const tagString = tags.join(` • `);

  return (
    <section className="mzp-c-card mzp-has-aspect-16-9">
      <div>
        <div className="mzp-c-card-media-wrapper">
          <img className="mzp-c-card-image" src={imgSrc} alt={imgAlt} />
        </div>
        <div className="mzp-c-card-content">
          <div className="mzp-c-card-tag">Committee</div>
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
          <p className="mzp-c-card-meta">Tags</p>
          <p className="mzp-c-card-desc">{tagString}</p>
        </div>
      </div>
    </section>
  );
};

export default MeetingCard;
