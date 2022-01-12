import React, { FC } from "react";
import styled from "@emotion/styled";
import { AvatarImage } from "./AvatarImage";

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

const CoverImg = styled.img(() => ({
  objectFit: "cover",
  width: 1400,
  height: 400,
}));

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
    <div>
      <CoverImg
        className="mzp-c-card-image"
        src={
          seatPictureSrc ||
          EXAMPLE_COVER_VIEWS[Math.floor(Math.random() * EXAMPLE_COVER_VIEWS.length)]
        }
        alt={`${electoralArea || "Default Image, no Elector Seat Image Available"}`}
      />
      <AvatarImage personPictureSrc={personPictureSrc} personName={personName} />
    </div>
  );
};

export { CoverImage };
