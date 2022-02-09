import React, { FC, ReactNode } from "react";
import styled from "@emotion/styled";
import { strings } from "../../../assets/LocalizedStrings";

const PersonStatus = styled.div({
  float: "right",
  marginRight: 8,
  marginBottom: 8,
  borderRadius: "10%",
  padding: "0 4px",
});

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

export interface PersonCardProps {
  /** The person's name */
  personName: string;
  /** The person's picture */
  personPictureSrc?: string;
  /** Is the person a current councilmember? */
  personIsActive: boolean;
  /** The seat's name */
  seatName: string;
  /** The seat's electoral area */
  seatElectoralArea: string;
  /** The picture of the seat's electoral area */
  seatPictureSrc?: string;
  /** The bodies that the person chairs */
  chairedBodyNames: ReactNode;
  /** The person's tenure status */
  tenureStatus: string;
  /** The number of bills sponsored by the person */
  billsSponsored: number;
}

const PersonCard: FC<PersonCardProps> = ({
  personName,
  personPictureSrc,
  personIsActive,
  seatName,
  seatElectoralArea,
  seatPictureSrc,
  chairedBodyNames,
  tenureStatus,
  billsSponsored,
}: PersonCardProps) => {
  const seatHasPicture = seatPictureSrc !== undefined;

  return (
    <section className="mzp-c-card mzp-c-card-medium mzp-has-aspect-16-9">
      <div className="mzp-c-card-block-link">
        <div className="mzp-c-card-media-wrapper">
          {personPictureSrc && (
            <Img
              className="mzp-c-card-image"
              src={personPictureSrc}
              width={seatHasPicture ? "40%" : "100%"}
              left="0"
              alt={personName}
            />
          )}
          {seatHasPicture && (
            <Img
              className="mzp-c-card-image"
              src={seatPictureSrc}
              width="60%"
              left="40%"
              alt={`${seatName} - ${seatElectoralArea}`}
            />
          )}
        </div>
        <div className="mzp-c-card-content">
          <h2 className="mzp-c-card-title">{personName}</h2>
          <PersonStatus className={personIsActive ? "cdp-bg-neon-green" : "cdp-bg-dark-grey"}>
            {personIsActive ? "active" : "inactive"}
          </PersonStatus>
          <p className="mzp-c-card-desc">
            {seatName} &bull; {seatElectoralArea}
          </p>
          <p className="mzp-c-card-meta">{strings.chair}</p>
          <p className="mzp-c-card-desc">{chairedBodyNames}</p>
          <TenureP className="mzp-c-card-meta">{strings.tenure}</TenureP>
          <p className="mzp-c-card-desc">
            {tenureStatus} &bull; {billsSponsored} {strings.bills_sponsored}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PersonCard;
