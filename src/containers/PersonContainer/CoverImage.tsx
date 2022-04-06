import React, { FC, useState, useEffect } from "react";
import styled from "@emotion/styled";

import { FetchDataState } from "../FetchDataContainer/useFetchData";

import PlaceholderWrapper from "../../components/Shared/PlaceHolder";

import { EXAMPLE_COVER_VIEWS } from "../../constants/ProjectConstants";

import { screenWidths } from "../../styles/mediaBreakpoints";

const EXAMPLE_COVER_VIEW =
  EXAMPLE_COVER_VIEWS[Math.floor(Math.random() * EXAMPLE_COVER_VIEWS.length)];

const Images = styled.div({
  position: "relative",
  height: 150,
  "& img": {
    objectFit: "cover",
  },
  [`@media (min-width:${screenWidths.tablet})`]: {
    height: 400,
  },
});

const Seat = styled.img({
  width: "100%",
  height: "100%",
});

const Avatar = styled.img<{ isLoading: boolean }>((props) => ({
  visibility: props.isLoading ? "hidden" : "visible",
  position: "absolute",
  left: -5,
  bottom: -35,
  width: 100,
  height: 100,
  borderRadius: "50%",
  [`@media (min-width:${screenWidths.tablet})`]: {
    left: -25,
    width: 200,
    height: 200,
  },
}));

interface CoverImageProps {
  personName: string;
  personPictureSrc: FetchDataState<string | null>;
  seatPictureSrc: FetchDataState<string | null>;
  electoralArea?: string;
}

const CoverImage: FC<CoverImageProps> = ({
  personName,
  personPictureSrc,
  seatPictureSrc,
  electoralArea,
}: CoverImageProps) => {
  const [personPictureSrcIsLoading, setPersonPictureSrcIsLoading] = useState(true);
  const [seatPictureSrcIsLoading, setSeatPictureSrcIsLoading] = useState(true);

  useEffect(() => {
    if (personPictureSrc.data === null) {
      // the visibility of the seat picture is dependent on the visiblity of the person picture
      // if there's no person picture (it's null), allow the seat picture to be visible
      setPersonPictureSrcIsLoading(false);
    }
  }, [personPictureSrc.data]);

  return (
    <Images>
      <PlaceholderWrapper contentIsLoading={seatPictureSrcIsLoading || personPictureSrcIsLoading}>
        <Seat
          className="mzp-c-card-image"
          src={seatPictureSrc.data === null ? EXAMPLE_COVER_VIEW : seatPictureSrc.data}
          alt={`${electoralArea || ""}`}
          onLoad={() => setSeatPictureSrcIsLoading(false)}
        />
      </PlaceholderWrapper>
      {personPictureSrc.data && (
        <Avatar
          isLoading={seatPictureSrcIsLoading || personPictureSrcIsLoading}
          className="mzp-c-card-image"
          src={personPictureSrc.data}
          alt={`Picture of ${personName}`}
          onLoad={() => setPersonPictureSrcIsLoading(false)}
        />
      )}
    </Images>
  );
};

export { CoverImage };
