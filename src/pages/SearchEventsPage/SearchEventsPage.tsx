import React, { FC, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import { useAppConfigContext } from "../../app";
import BodyService from "../../networking/BodyService";

import { FetchDataContainer } from "../../containers/FetchDataContainer";
import useFetchData, {
  FetchDataActionType,
} from "../../containers/FetchDataContainer/useFetchData";
import { SearchEventsContainer } from "../../containers/SearchEventsContainer";
import { SearchEventsContainerData } from "../../containers/SearchEventsContainer/types";
import { SearchEventsState } from "./types";

import { createError } from "../../utils/createError";

const SearchEventsPage: FC = () => {
  const location = useLocation<SearchEventsState>();
  const searchEventsState = useMemo(() => {
    if (location.state) {
      return location.state;
    }
    const { q } = queryString.parse(location.search);
    return {
      query: (q as string) || " ",
      committees: {},
      dateRange: { start: "", end: "" },
    };
  }, [location]);

  const { firebaseConfig } = useAppConfigContext();

  const { state: searchEventsDataState, dispatch: searchEventsDataDispatch } = useFetchData<
    SearchEventsContainerData
  >({
    isLoading: false,
  });

  useEffect(() => {
    const bodyService = new BodyService(firebaseConfig);
    let didCancel = false;

    const fetchSearchEventsData = async () => {
      searchEventsDataDispatch({ type: FetchDataActionType.FETCH_INIT });

      try {
        const allBodies = await bodyService.getAllBodies();

        if (!didCancel) {
          searchEventsDataDispatch({
            type: FetchDataActionType.FETCH_SUCCESS,
            payload: {
              searchEventsState: searchEventsState,
              bodies: allBodies,
            },
          });
        }
      } catch (err) {
        if (!didCancel) {
          const error = createError(err);
          searchEventsDataDispatch({ type: FetchDataActionType.FETCH_FAILURE, payload: error });
        }
      }
    };

    fetchSearchEventsData();

    return () => {
      didCancel = true;
    };
  }, [searchEventsState, firebaseConfig]);

  return (
    <FetchDataContainer
      isLoading={searchEventsDataState.isLoading}
      error={searchEventsDataState.error}
    >
      {searchEventsDataState.data && <SearchEventsContainer {...searchEventsDataState.data} />}
    </FetchDataContainer>
  );
};

export default SearchEventsPage;
