import React, { FC } from "react";
import styled from "@emotion/styled";

import "@mozilla-protocol/core/protocol/css/protocol.css";

interface ImgProps {
  left: string;
  width: string;
}

const Img = styled.img<ImgProps>((props) => ({
  objectFit: "cover",
  left: `${props.left} !important`,
  width: `${props.width} !important`,
  height: "100%",
}));

const TenureP = styled.p({
  // Decrease margin top to 12px from 24px for Tenure string
  margin: `12px 0 0 !important`,
});

interface PersonCardProps {
  /** The person */
  person: {
    /** The person's name */
    name: string;
    /** The person's picture */
    pictureSrc: string;
    /** Whether the person is a current councilmember */
    isActive: boolean;
  };
  /** The person's seat on the council */
  seat: {
    /** The seat's name */
    name: string;
    /** The seat's electoral area */
    electoralArea: string;
    /** The picture of the seat's electoral area */
    pictureSrc?: string;
  };
  /** The bodies that the person chairs */
  chairedBodyNames: string;
  /** The person's tenure status */
  tenureStatus: string;
  /** The number of bills sponsored by the person */
  billsSponsored: number;
}

const PersonCard: FC<PersonCardProps> = ({
  person,
  seat,
  chairedBodyNames,
  tenureStatus,
  billsSponsored,
}: PersonCardProps) => {
  const seatHasPicture = seat.pictureSrc !== undefined;

  return (
    <section className="mzp-c-card mzp-has-aspect-16-9">
      <div className="mzp-c-card-block-link">
        <div className="mzp-c-card-media-wrapper">
          <Img
            className="mzp-c-card-image"
            src={person.pictureSrc}
            width={seatHasPicture ? "40%" : "100%"}
            left="0"
            alt={person.name}
          />
          {seatHasPicture && (
            <Img
              className="mzp-c-card-image"
              src={seat.pictureSrc}
              width="60%"
              left="40%"
              alt={`${seat.name} - ${seat.electoralArea}`}
            />
          )}
        </div>
        <div className="mzp-c-card-content">
          <h2 className="mzp-c-card-title">{person.name}</h2>
          <p className="mzp-c-card-desc">
            {seat.name} &bull; {seat.electoralArea}
          </p>
          <p className="mzp-c-card-meta">Chair</p>
          <p className="mzp-c-card-desc">{chairedBodyNames}</p>
          <TenureP className="mzp-c-card-meta">Tenure</TenureP>
          <p className="mzp-c-card-desc">
            {tenureStatus} &bull; {billsSponsored} bill(s) sponsored
          </p>
        </div>
      </div>
    </section>
  );
};

export default PersonCard;
