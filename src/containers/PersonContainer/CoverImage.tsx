import React, { FC } from "react";
import styled from "@emotion/styled";

import { screenWidths } from "../../styles/mediaBreakpoints";

import exampleCover1 from "../../assets/images/dave-hoefler-reduced-1.jpg";
import exampleCover2 from "../../assets/images/dave-hoefler-reduced-2.jpg";
import exampleCover3 from "../../assets/images/dave-hoefler-reduced-3.jpg";
import exampleCover4 from "../../assets/images/dave-hoefler-reduced-4.jpg";
import exampleCover5 from "../../assets/images/dave-hoefler-reduced-5.jpg";

const EXAMPLE_COVER_VIEWS = [
  exampleCover1,
  exampleCover2,
  exampleCover3,
  exampleCover4,
  exampleCover5,
];

const Images = styled.div({
  position: "relative",
  "& img": {
    objectFit: "cover",
  },
  "& > img:first-of-type": {
    // seat image has 100% width
    width: "100%",
  },
  [`@media (min-width:${screenWidths.tablet})`]: {
    "& > img:first-of-type": {
      // on tablet or above seat image's height == 400px
      height: 400,
    },
  },
});

const Avatar = styled.img({
  position: "absolute",
  left: -5,
  bottom: -30,
  width: 100,
  height: 100,
  borderRadius: "50%",
  [`@media (min-width:${screenWidths.tablet})`]: {
    left: -25,
    width: 200,
    height: 200,
  },
});

interface CoverImageProps {
  personName: string;
  personPictureSrc?: string;
  seatPictureSrc?: string;
  electoralArea?: string;
}

const CoverImage: FC<CoverImageProps> = ({
  personName,
  personPictureSrc,
  seatPictureSrc,
  electoralArea,
}: CoverImageProps) => {
  return (
    <Images>
      <img
        className="mzp-c-card-image"
        src={
          seatPictureSrc ||
          EXAMPLE_COVER_VIEWS[Math.floor(Math.random() * EXAMPLE_COVER_VIEWS.length)]
        }
        alt={`${electoralArea || ""}`}
      />
      {personPictureSrc && (
        <Avatar
          className="mzp-c-card-image"
          src={personPictureSrc}
          alt={`Picture of ${personName}`}
        />
      )}
    </Images>
  );
};

export { CoverImage };
