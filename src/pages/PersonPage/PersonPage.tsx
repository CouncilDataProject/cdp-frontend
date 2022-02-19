import React, { FC, useCallback, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppConfigContext } from "../../app";

import MatterSponsor from "../../models/MatterSponsor";
import Person from "../../models/Person";
import Role from "../../models/Role";
import Vote from "../../models/Vote";

import FileService from "../../networking/FileService";
import MatterSponsorService from "../../networking/MatterSponsorService";
import PersonService from "../../networking/PersonService";
import RoleService from "../../networking/RoleService";
import VoteService from "../../networking/VoteService";

import FetchDataContainer from "../../containers/FetchDataContainer/FetchDataContainer";
import useFetchData, {
  FetchDataActionType,
  initialFetchDataState,
} from "../../containers/FetchDataContainer/useFetchData";
import { PersonContainer } from "../../containers/PersonContainer";

const PersonPage: FC = () => {
  // Get the id the person, provided the route is `persons/:id`
  const { id } = useParams<{ id: string }>();
  // Get the app config context
  const { firebaseConfig } = useAppConfigContext();

  const fetchPerson = useCallback(async () => {
    const personService = new PersonService(firebaseConfig);
    const person = await personService.getPersonById(id);
    return Promise.resolve(person);
  }, [id, firebaseConfig]);
  const { state: personDataState } = useFetchData<Person>(
    { ...initialFetchDataState },
    fetchPerson
  );

  const fetchPersonPicture = useCallback(async () => {
    const fileService = new FileService(firebaseConfig);
    const { networkService } = fileService;
    if (personDataState.data?.picture) {
      const personPictureSrc = await networkService.getDownloadUrl(
        personDataState.data.picture.uri
      );
      return Promise.resolve(personPictureSrc);
    }
    return Promise.resolve(null);
  }, [personDataState.data, firebaseConfig]);
  const { state: personPictureDataState, dispatch: personPictureDataDispatch } = useFetchData<
    string | null
  >({ ...initialFetchDataState, hasFetchRequest: false }, fetchPersonPicture);

  useEffect(() => {
    if (personDataState.data) {
      // fetch the person picture when the person is fetched
      personPictureDataDispatch({ type: FetchDataActionType.FETCH });
    }
  }, [personDataState.data, personPictureDataDispatch]);

  const fetchCouncilmemberRoles = useCallback(async () => {
    const roleService = new RoleService(firebaseConfig);
    const roles = await roleService.getCouncilMemberRolesByPersonId(id);
    return Promise.resolve(roles);
  }, [id, firebaseConfig]);
  const { state: councilmemberRolesDataState } = useFetchData<Role[]>(
    { ...initialFetchDataState },
    fetchCouncilmemberRoles
  );

  const fetchSeatPicture = useCallback(async () => {
    const fileService = new FileService(firebaseConfig);
    const { networkService } = fileService;
    if (
      councilmemberRolesDataState.data &&
      councilmemberRolesDataState.data.length > 0 &&
      councilmemberRolesDataState.data[0].seat &&
      councilmemberRolesDataState.data[0].seat.image_ref
    ) {
      const seatImage = await fileService.getFileById(
        councilmemberRolesDataState.data[0].seat.image_ref
      );
      const seatImageSrc = await networkService.getDownloadUrl(seatImage.uri);
      return Promise.resolve(seatImageSrc);
    }
    return Promise.resolve(null);
  }, [councilmemberRolesDataState.data, firebaseConfig]);
  const { state: seatPictureDataState, dispatch: seatPictureDataDispatch } = useFetchData<
    string | null
  >({ ...initialFetchDataState, hasFetchRequest: false }, fetchSeatPicture);
  useEffect(() => {
    if (councilmemberRolesDataState.data) {
      // fetch the seat picture when the council member roles are fetched
      seatPictureDataDispatch({ type: FetchDataActionType.FETCH });
    }
  }, [councilmemberRolesDataState.data, seatPictureDataDispatch]);

  const fetchRoles = useCallback(async () => {
    const roleService = new RoleService(firebaseConfig);
    const roles = await roleService.getPopulatedRolesByPersonId(id);
    return Promise.resolve(roles);
  }, [id, firebaseConfig]);
  const { state: rolesDataState } = useFetchData<Role[]>({ ...initialFetchDataState }, fetchRoles);

  const fetchMatterSponsored = useCallback(async () => {
    const matterSponsorService = new MatterSponsorService(firebaseConfig);
    const mattersSponsored = await matterSponsorService.getMattersSponsoredByPersonId(id);
    return Promise.resolve(mattersSponsored);
  }, [id, firebaseConfig]);
  const { state: mattersSponsoredDataState } = useFetchData<MatterSponsor[]>(
    { ...initialFetchDataState },
    fetchMatterSponsored
  );

  const fetchVotes = useCallback(async () => {
    const voteService = new VoteService(firebaseConfig);
    const votes = await voteService.getFullyPopulatedVotesByPersonId(id);
    return Promise.resolve(votes);
  }, [id, firebaseConfig]);
  const { state: votesDataState } = useFetchData<Vote[]>({ ...initialFetchDataState }, fetchVotes);

  const isFetchingPersonData = useMemo(() => {
    return (
      personDataState.isLoading || councilmemberRolesDataState.isLoading || rolesDataState.isLoading
    );
  }, [personDataState.isLoading, councilmemberRolesDataState.isLoading, rolesDataState.isLoading]);

  const personData = useMemo(() => {
    if (!personDataState.data || !councilmemberRolesDataState.data || !rolesDataState.data) {
      // not all fetch requests has completed
      return undefined;
    }
    return {
      person: personDataState.data,
      councilMemberRoles: councilmemberRolesDataState.data,
      roles: rolesDataState.data,
    };
  }, [personDataState.data, councilmemberRolesDataState.data, rolesDataState.data]);

  const fetchPersonDataError = useMemo(() => {
    const errorMsgs = [
      personDataState.error,
      councilmemberRolesDataState.error,
      rolesDataState.error,
    ]
      .map((error) => error?.message || "")
      .filter((errorMsg) => errorMsg.length > 0);
    if (errorMsgs.length > 0) {
      // create one error from all the error msgs
      return new Error(errorMsgs.join("\n"));
    }
    return null;
  }, [personDataState.error, councilmemberRolesDataState.error, rolesDataState.error]);

  return (
    <FetchDataContainer isLoading={isFetchingPersonData} error={fetchPersonDataError}>
      {personData && (
        <PersonContainer
          {...personData}
          personPictureSrc={personPictureDataState}
          seatPictureSrc={seatPictureDataState}
          mattersSponsored={mattersSponsoredDataState}
          votes={votesDataState}
        />
      )}
    </FetchDataContainer>
  );
};

export default PersonPage;
