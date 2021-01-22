import React from "react";
import styled from "@emotion/styled";
import "@mozilla-protocol/core/protocol/css/protocol.css";

const DateOverlay = styled.p`
  position: absolute;
  z-index: 1;
  color: white;
  font-size: 30px;
  font-weight: bolder;
  top: 75%;
  left: 2%;
`;

type MeetingCardProps = {
  cardLink: string;
  imgSrc: string;
  imgAlt: string;
  imgOverlayText: string;
  committee: string;
  tags: string[];
  excerpt?: string;
};

const MeetingCard = ({
  cardLink,
  imgSrc,
  imgAlt,
  imgOverlayText,
  committee,
  tags,
  excerpt,
}: MeetingCardProps) => {
  const tagString = tags.join(` • `);

  return (
    <section className="mzp-c-card mzp-has-aspect-16-9">
      <a className="mzp-c-card-block-link" href={cardLink}>
        <div className="mzp-c-card-media-wrapper">
          <DateOverlay>{imgOverlayText}</DateOverlay>
          <img className="mzp-c-card-image" src={imgSrc} alt={imgAlt} />
        </div>
        <div className="mzp-c-card-content">
          <div className="mzp-c-card-tag">Committee</div>
          <h2 className="mzp-c-card-title">{committee}</h2>
          {excerpt ? <p className="mzp-c-card-desc">{`"${excerpt}"`}</p> : null}
          <p className="mzp-c-card-meta">Tags: {tagString}</p>
        </div>
      </a>
    </section>
  );
};

export default MeetingCard;
