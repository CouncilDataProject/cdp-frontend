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

    const person = await personService.getPersonById(id);
    const votes = await voteService.getFullyPopulatedVotesByPersonId(id);
    const mattersSponsored = await matterSponsorService.getMattersSponsoredByPersonId(id);
    const roles = await roleService.getPopulatedRolesByPersonId(id);

    const payload: PersonPageData = {
      person,
      votes,
      mattersSponsored,
      roles,
    };

    return payload;
  }, [id, firebaseConfig]);

  // Initialize the state of fetching the person's data
  const { state: personDataState } = useFetchData<PersonPageData>(
    {
      isLoading: true,
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
