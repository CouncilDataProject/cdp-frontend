import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppConfigContext } from "../../app";
import useFetchData, {
  FetchDataActionType,
} from "../../containers/FetchDataContainer/useFetchData";
import FetchDataContainer from "../../containers/FetchDataContainer/FetchDataContainer";
import { PersonContainer } from "../../containers/PersonContainer";
import { PersonPageData } from "../../containers/PersonContainer/types";
import PersonService from "../../networking/PersonService";

import { createError } from "../../utils/createError";
import VoteService from "../../networking/VoteService";

const PersonPage: FC = () => {
  // Get the id the person, provided the route is `persons/:id`
  const { id } = useParams<{ id: string }>();
  // Get the app config context
  const { firebaseConfig } = useAppConfigContext();

  // Initialize the state of fetching the person's data
  const { state: personDataState, dispatch: personDataDispatch } = useFetchData<PersonPageData>({
    isLoading: false,
  });

  useEffect(() => {
    const personService = new PersonService(firebaseConfig);
    const voteService = new VoteService(firebaseConfig);

    let didCancel = false;

    const fetchPersonData = async () => {
      personDataDispatch({ type: FetchDataActionType.FETCH_INIT });

      try {
        // Get data from the person id
        const person = await personService.getPersonById(id);
        const votes = await voteService.getVotesByPersonId(id);
        if (!didCancel) {
          personDataDispatch({
            type: FetchDataActionType.FETCH_SUCCESS,
            payload: {
              person,
              votes,
            },
          });
        }
      } catch (err) {
        if (!didCancel) {
          const error = createError(err);
          personDataDispatch({ type: FetchDataActionType.FETCH_FAILURE, payload: error });
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
      {personDataState.data && <PersonContainer {...personDataState.data} />}
    </FetchDataContainer>
  );
};

export default PersonPage;
