import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppConfigContext } from "../../app";
import Person from "../../models/Person";
import PersonService from "../../networking/PersonService";

import useFetchData, {
  FetchDataActionType,
} from "../../containers/FetchDataContainer/useFetchData";
import FetchDataContainer from "../../containers/FetchDataContainer/FetchDataContainer";
import { PersonContainer } from "../../containers/PersonContainer";

import { createError } from "../../utils/createError";

const PersonPage: FC = () => {
  // Get the id the person, provided the route is `persons/:id`
  const { id } = useParams<{ id: string }>();
  // Get the app config context
  const { firebaseConfig } = useAppConfigContext();

  // Initialize the state of fetching the person's data
  const { state: personDataState, dispatch: personDataDispatch } = useFetchData<Person>({
    isLoading: false,
  });

  useEffect(() => {
    const personService = new PersonService(firebaseConfig);

    let didCancel = false;

    const fetchPersonData = async () => {
      personDataDispatch({ type: FetchDataActionType.FETCH_INIT });

      try {
        // Get data from the person id
        const person = await personService.getPersonById(id);

        if (!didCancel) {
          personDataDispatch({
            type: FetchDataActionType.FETCH_SUCCESS,
            payload: person,
          });
        }
      } catch (err) {
        if (!didCancel) {
          const error = createError(err);
          personDataDispatch({ type: FetchDataActionType.FETCH_FAILTURE, payload: error });
        }
      }
    };

    fetchPersonData();

    return () => {
      didCancel = true;
    };
  }, [id]);

  return (
    <FetchDataContainer isLoading={personDataState.isLoading} error={personDataState.error}>
      {personDataState.data && <PersonContainer person={personDataState.data} />}
    </FetchDataContainer>
  );
};

export default PersonPage;
