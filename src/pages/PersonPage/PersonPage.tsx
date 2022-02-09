import React, { FC, useCallback } from "react";
import { useParams } from "react-router-dom";

import { useAppConfigContext } from "../../app";
import useFetchData from "../../containers/FetchDataContainer/useFetchData";

import PersonService from "../../networking/PersonService";
import FetchDataContainer from "../../containers/FetchDataContainer/FetchDataContainer";
import { PersonContainer } from "../../containers/PersonContainer";
import { PersonPageData } from "../../containers/PersonContainer/types";

import VoteService from "../../networking/VoteService";
import MatterSponsorService from "../../networking/MatterSponsorService";
import RoleService from "../../networking/RoleService";
import FileService from "../../networking/FileService";

const PersonPage: FC = () => {
  // Get the id the person, provided the route is `persons/:id`
  const { id } = useParams<{ id: string }>();
  // Get the app config context
  const { firebaseConfig } = useAppConfigContext();

  const fetchPersonData = useCallback(async () => {
    const personService = new PersonService(firebaseConfig);
    const voteService = new VoteService(firebaseConfig);
    const matterSponsorService = new MatterSponsorService(firebaseConfig);
    const roleService = new RoleService(firebaseConfig);
    const fileService = new FileService(firebaseConfig);
    const { networkService } = fileService;

    const [person, votes, mattersSponsored, councilMemberRoles, roles] = await Promise.all([
      personService.getPersonById(id),
      voteService.getFullyPopulatedVotesByPersonId(id),
      matterSponsorService.getMattersSponsoredByPersonId(id),
      roleService.getCouncilMemberRolesByPersonId(id),
      roleService.getPopulatedRolesByPersonId(id),
    ]);

    const pictureSrcPromises: Promise<string | undefined>[] = [
      person.picture
        ? networkService.getDownloadUrl(person.picture.uri)
        : Promise.resolve(undefined),
    ];

    if (
      councilMemberRoles.length > 0 &&
      councilMemberRoles[0].seat &&
      councilMemberRoles[0].seat.image_ref
    ) {
      const seatImage = await fileService.getFileById(councilMemberRoles[0].seat.image_ref);
      pictureSrcPromises.push(networkService.getDownloadUrl(seatImage.uri));
    } else {
      pictureSrcPromises.push(Promise.resolve(undefined));
    }

    const [personPictureSrc, seatPictureSrc] = await Promise.all(pictureSrcPromises);

    const payload: PersonPageData = {
      person,
      votes,
      mattersSponsored,
      roles,
      personPictureSrc,
      seatPictureSrc,
      councilMemberRoles,
    };

    return payload;
  }, [id, firebaseConfig]);

  // Initialize the state of fetching the person's data
  const { state: personDataState } = useFetchData<PersonPageData>(
    {
      isLoading: false,
      error: null,
      hasFetchRequest: true,
    },
    fetchPersonData
  );

  return (
    <FetchDataContainer isLoading={personDataState.isLoading} error={personDataState.error}>
      {personDataState.data && <PersonContainer {...personDataState.data} />}
    </FetchDataContainer>
  );
};

export default PersonPage;
