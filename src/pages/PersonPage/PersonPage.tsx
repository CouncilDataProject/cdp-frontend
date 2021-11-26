import React, { FC, useCallback } from "react";
import { useParams } from "react-router-dom";

import { useAppConfigContext } from "../../app";
import Person from "../../models/Person";
import PersonService from "../../networking/PersonService";

import useFetchData from "../../containers/FetchDataContainer/useFetchData";
import FetchDataContainer from "../../containers/FetchDataContainer/FetchDataContainer";
import { PersonContainer } from "../../containers/PersonContainer";

const PersonPage: FC = () => {
  // Get the id the person, provided the route is `persons/:id`
  const { id } = useParams<{ id: string }>();
  // Get the app config context
  const { firebaseConfig } = useAppConfigContext();

  const fetchPerson = useCallback(async () => {
    const personService = new PersonService(firebaseConfig);
    return personService.getPersonById(id);
  }, [id, firebaseConfig]);

  // Initialize the state of fetching the person's data
  const { state: personDataState } = useFetchData<Person>(
    {
      isLoading: false,
      error: null,
      hasFetchRequest: true,
    },
    fetchPerson
  );

  return (
    <FetchDataContainer isLoading={personDataState.isLoading} error={personDataState.error}>
      {personDataState.data && <PersonContainer person={personDataState.data} />}
    </FetchDataContainer>
  );
};

export default PersonPage;
