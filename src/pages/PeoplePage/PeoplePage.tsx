import React, { FC, useCallback } from "react";
import { useAppConfigContext } from "../../app";
import useFetchData from "../../containers/FetchDataContainer/useFetchData";
import FetchDataContainer from "../../containers/FetchDataContainer/FetchDataContainer";
import { PeopleContainer } from "../../containers/PeopleContainer";

import SeatService from "../../networking/SeatService";
import RoleService from "../../networking/RoleService";
import Role from "../../models/Role";
import Seat from "../../models/Seat";
interface PeopleContainerData {
  roles: Role[];
  seats: Seat[];
}

const PeoplePage: FC = () => {
  // Get the app config context
  const { firebaseConfig } = useAppConfigContext();

  const fetchAllCouncilors = useCallback(async () => {
    const seatService = new SeatService(firebaseConfig);
    const roleService = new RoleService(firebaseConfig);

    const seats = await seatService.getAllSeats();
    const rolePromises = seats.map((seat) => {
      return roleService.getMostRecentCouncilMemberRoleBySeat(seat.id);
    });
    const roles = await Promise.all(rolePromises);
    return { seats, roles };
  }, [firebaseConfig]);

  // Initialize the state of fetching the person's data
  const { state: peopleDataState } = useFetchData<PeopleContainerData>(
    {
      isLoading: false,
      error: null,
      hasFetchRequest: true,
    },
    fetchAllCouncilors
  );

  return (
    <FetchDataContainer isLoading={peopleDataState.isLoading} error={peopleDataState.error}>
      {peopleDataState.data && (
        <PeopleContainer roles={peopleDataState.data.roles} seats={peopleDataState.data.seats} />
      )}
    </FetchDataContainer>
  );
};

export default PeoplePage;
