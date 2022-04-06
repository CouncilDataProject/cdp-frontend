import React, { FC, useCallback, useState, useEffect } from "react";
import styled from "@emotion/styled";

import { useAppConfigContext } from "../../../app";

import Person from "../../../models/Person";
import Seat from "../../../models/Seat";
import FileService from "../../../networking/FileService";

import useFetchData from "../../../containers/FetchDataContainer/useFetchData";

import AbsoluteBox from "../../Shared/AbsoluteBox";
import PlaceholderWrapper from "../../Shared/PlaceHolder";

import { strings } from "../../../assets/LocalizedStrings";
import { EXAMPLE_COVER_VIEWS } from "../../../constants/ProjectConstants";

const EXAMPLE_COVER_VIEW =
  EXAMPLE_COVER_VIEWS[Math.floor(Math.random() * EXAMPLE_COVER_VIEWS.length)];

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

export interface PersonCardProps {
  /** the person represented */
  person: Person;
  /** the seat of the person represented */
  seat: Seat;
}

interface PictureDataState {
  personPictureSrc: string | undefined;
  seatPictureSrc: string | undefined;
}

const PersonCard: FC<PersonCardProps> = ({ person, seat }: PersonCardProps) => {
  const { firebaseConfig } = useAppConfigContext();

  /** Get the images for this card (at the same time so there isn't a double state update) */
  const fetchPictures = useCallback(async () => {
    const fileService = new FileService(firebaseConfig);
    const { networkService } = fileService;

    const srcPromises: Promise<string | undefined>[] = [
      Promise.resolve(undefined),
      Promise.resolve(undefined),
    ];
    if (seat.image_ref) {
      srcPromises[0] = fileService
        .getFileById(seat.image_ref)
        .then((file) => networkService.getDownloadUrl(file.uri))
        .catch(() => Promise.resolve(undefined));
    }
    if (person.picture_ref) {
      srcPromises[1] = fileService
        .getFileById(person.picture_ref)
        .then((file) => networkService.getDownloadUrl(file.uri))
        .catch(() => Promise.resolve(undefined));
    }
    const [seatPictureSrc, personPictureSrc] = await Promise.all(srcPromises);
    return Promise.resolve({
      seatPictureSrc,
      personPictureSrc,
    });
  }, [person.picture_ref, seat.image_ref, firebaseConfig]);

  //** initial state for fetching pictures */
  const { state: pictureDataState } = useFetchData<PictureDataState>(
    {
      isLoading: false,
      error: null,
      hasFetchRequest: true,
    },
    fetchPictures
  );

  const [personPictureIsLoading, setPersonPictureIsLoading] = useState(true);
  const [seatPictureIsLoading, setSeatPictureIsLoading] = useState(true);

  useEffect(() => {
    if (!pictureDataState.isLoading && pictureDataState.data?.personPictureSrc === undefined) {
      // the visibility of the seat picture is dependent on the visiblity of the person picture
      // if there's no person picture (it's undefined), allow the seat picture to be visible
      setPersonPictureIsLoading(false);
    }
  }, [pictureDataState]);

  return (
    <section className="mzp-c-card mzp-c-card-medium mzp-has-aspect-16-9">
      <div className="mzp-c-card-block-link">
        <div className="mzp-c-card-media-wrapper">
          <AbsoluteBox>
            <PlaceholderWrapper contentIsLoading={personPictureIsLoading || seatPictureIsLoading}>
              {pictureDataState.data?.personPictureSrc && (
                <Img
                  className="mzp-c-card-image"
                  src={pictureDataState.data.personPictureSrc}
                  width={pictureDataState.data?.seatPictureSrc ? "40%" : "100%"}
                  left="0"
                  alt={person.name}
                  onLoad={() => setPersonPictureIsLoading(false)}
                />
              )}
              <Img
                className="mzp-c-card-image"
                src={
                  !pictureDataState.isLoading && pictureDataState.data?.seatPictureSrc === undefined
                    ? EXAMPLE_COVER_VIEW
                    : pictureDataState.data?.seatPictureSrc
                }
                width={pictureDataState.data?.personPictureSrc ? "60%" : "100%"}
                left={pictureDataState.data?.personPictureSrc ? "40%" : "0"}
                alt={`${seat.name} - ${seat.electoral_area}`}
                onLoad={() => setSeatPictureIsLoading(false)}
              />
            </PlaceholderWrapper>
          </AbsoluteBox>
        </div>
        <div className="mzp-c-card-content">
          <h2 className="mzp-c-card-title">{person.name}</h2>
          <PersonStatus className={person.is_active ? "cdp-bg-neon-green" : "cdp-bg-dark-grey"}>
            {person.is_active ? strings.active : strings.inactive}
          </PersonStatus>
          <p className="mzp-c-card-desc">
            {seat.name} &bull; {seat.electoral_area}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PersonCard;
