import React, { FC, useEffect } from "react";
import { useAppConfigContext } from "../../app";
import useFetchData, {
  FetchDataActionType,
} from "../../containers/FetchDataContainer/useFetchData";
import FetchDataContainer from "../../containers/FetchDataContainer/FetchDataContainer";
import { PeopleContainer } from "../../containers/PeopleContainer";
import { PeoplePageData } from "../../containers/PeopleContainer/types";
import { filterRolesByTitle, ROLE_TITLE } from "../../models/util/RoleUtilities";
import { createError } from "../../utils/createError";
import RoleService from "../../networking/RoleService";
import PersonService from "../../networking/PersonService";

const PeoplePage: FC = () => {
  // Get the app config context
  const { firebaseConfig } = useAppConfigContext();

  // Initialize the state of fetching the people's data
  const { state: peopleDataState, dispatch: personDataDispatch } = useFetchData<PeoplePageData>({
    isLoading: false,
  });

  useEffect(() => {
    const rolesService = new RoleService(firebaseConfig);
    const personService = new PersonService(firebaseConfig);
    let didCancel = false;

    const fetchPersonData = async () => {
      personDataDispatch({ type: FetchDataActionType.FETCH_INIT });

      try {
        const currentPeople = await rolesService.getCurrentRoles();
        const allPeople = await personService.getAllPeople();
        if (!didCancel) {
          personDataDispatch({
            type: FetchDataActionType.FETCH_SUCCESS,
            payload: {
              currentPeople: filterRolesByTitle(currentPeople, ROLE_TITLE.COUNCILMEMBER),
              allPeople,
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
  }, []);

  return (
    <FetchDataContainer isLoading={peopleDataState.isLoading} error={peopleDataState.error}>
      {peopleDataState.data && <PeopleContainer {...peopleDataState.data} />}
    </FetchDataContainer>
  );
};

export default PeoplePage;
