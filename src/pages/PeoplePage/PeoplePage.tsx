import React, { FC, useCallback } from "react";
import { useAppConfigContext } from "../../app";
import useFetchData from "../../containers/FetchDataContainer/useFetchData";
import FetchDataContainer from "../../containers/FetchDataContainer/FetchDataContainer";
import { PeopleContainer } from "../../containers/PeopleContainer";
import { PeoplePageData } from "../../containers/PeopleContainer/types";
import RoleService from "../../networking/RoleService";
import PersonService from "../../networking/PersonService";

const PeoplePage: FC = () => {
  // Get the app config context
  const { firebaseConfig } = useAppConfigContext();

  const fetchPeopleData = useCallback(async () => {
    const personService = new PersonService(firebaseConfig);
    const roleService = new RoleService(firebaseConfig);

    const currentPeople = await roleService.getCurrentRoles();
    const allPeople = await personService.getAllPeople();

    const payload: PeoplePageData = {
      currentPeople,
      allPeople,
    };

    return payload;
  }, [firebaseConfig]);

  // Initialize the state of fetching the person's data
  const { state: peopleDataState } = useFetchData<PeoplePageData>(
    {
      isLoading: true,
      error: null,
      hasFetchRequest: true,
    },
    fetchPeopleData
  );

  return (
    <FetchDataContainer isLoading={peopleDataState.isLoading} error={peopleDataState.error}>
      {peopleDataState.data && <PeopleContainer {...peopleDataState.data} />}
    </FetchDataContainer>
  );
};

export default PeoplePage;
