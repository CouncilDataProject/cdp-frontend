import React, { FC } from "react";
import styled from "@emotion/styled";
import Person from "../../models/Person";
import { AvatarImage } from "./AvatarImage";

const EXAMPLE_COVER_VIEWS: string[] = [
  "dave-hoefler-reduced-1",
  "dave-hoefler-reduced-2",
  "dave-hoefler-reduced-3",
  "dave-hoefler-reduced-4",
  "dave-hoefler-reduced-5",
];

const CoverImg = styled.img(() => ({
  objectFit: "cover",
  height: 250,
  maxHeight: "40%",
  width: "100%",
}));

interface CoverImageProps {
  /** The person being displayed */
  person: Person;
}

const CoverImage: FC<CoverImageProps> = ({ person }: CoverImageProps) => {
  if (person.seatPictureUri) {
    return (
      <div>
        <CoverImg
          className="mzp-c-card-image"
          src={person.seatPictureUri}
          alt={`${person.seatName} - ${person.seatElectoralArea}`}
        />
      </div>
    );
  } else {
    const defaultCover = `/images/${
      EXAMPLE_COVER_VIEWS[Math.floor(Math.random() * EXAMPLE_COVER_VIEWS.length)]
    }.jpg`;
    return (
      <div>
        <CoverImg
          className="mzp-c-card-image"
          src={defaultCover}
          alt={`Default Image, no Elector Seat Image Available`}
        />
        <AvatarImage personImageUri={person.picture?.uri} />
      </div>
    );
  }
};

export { CoverImage };
