import React, { FC, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useAppConfigContext } from "../../../app";

import Person from "../../../models/Person";
import Seat from "../../../models/Seat";
import FileService from "../../../networking/FileService";

import { FetchDataContainer } from "../../../containers/FetchDataContainer";
import useFetchData from "../../../containers/FetchDataContainer/useFetchData";

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
  const history = useHistory();

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

  return (
    <section className="mzp-c-card mzp-c-card-medium mzp-has-aspect-16-9">
      <div
        className="mzp-c-card-block-link"
        onClick={() => {
          history.push(`/people/${person.id}`);
        }}
      >
        <FetchDataContainer isLoading={pictureDataState.isLoading} error={pictureDataState.error}>
          <div className="mzp-c-card-media-wrapper">
            {pictureDataState.data && (
              <Img
                className="mzp-c-card-image"
                src={pictureDataState.data.personPictureSrc}
                width={pictureDataState.data.seatPictureSrc ? "40%" : "100%"}
                left="0"
                alt={person.name}
              />
            )}
            {pictureDataState.data?.seatPictureSrc && (
              <Img
                className="mzp-c-card-image"
                src={pictureDataState.data.seatPictureSrc}
                width="60%"
                left="40%"
                alt={`${seat.name} - ${seat.electoral_area}`}
              />
            )}
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
        </FetchDataContainer>
      </div>
    </section>
  );
};

export default PersonCard;
