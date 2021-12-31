import React, { FC } from "react";
import styled from "@emotion/styled";
import Person from "../../models/Person";
import Role from "../../models/Role";
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
  /** The person being displayed */
  person: Person;
  /** The current role of the person being displayed */
  currentRole: Role;
}

const CoverImage: FC<CoverImageProps> = ({ person, currentRole }: CoverImageProps) => {
  if (currentRole.seat?.image?.uri) {
    return (
      <div>
        <CoverImg
          className="mzp-c-card-image"
          src={currentRole.seat?.image?.uri}
          alt={`${currentRole.seat?.electoral_area}`}
        />
        <AvatarImage personImageUri={person.picture?.uri} personName={person.name} />
      </div>
    );
  } else {
    const defaultCover =
      EXAMPLE_COVER_VIEWS[Math.floor(Math.random() * EXAMPLE_COVER_VIEWS.length)];
    return (
      <div>
        <CoverImg
          className="mzp-c-card-image"
          src={defaultCover}
          alt={`Default Image, no Elector Seat Image Available`}
        />
        <AvatarImage personImageUri={person.picture?.uri} personName={person.name} />
      </div>
    );
  }
};

export { CoverImage };
