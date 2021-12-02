import React, { FC, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import { useAppConfigContext } from "../../app";
import BodyService from "../../networking/BodyService";

import { FetchDataContainer } from "../../containers/FetchDataContainer";
import useFetchData from "../../containers/FetchDataContainer/useFetchData";
import { SearchEventsContainer } from "../../containers/SearchEventsContainer";
import { SearchEventsContainerData } from "../../containers/SearchEventsContainer/types";
import { SearchEventsState } from "./types";

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

  const fetchSearchEventsContainerData = useCallback(async () => {
    const bodyService = new BodyService(firebaseConfig);
    const bodies = await bodyService.getAllBodies();
    return Promise.resolve({ bodies, searchEventsState });
  }, [firebaseConfig, searchEventsState]);

  const { state: searchEventsDataState } = useFetchData<SearchEventsContainerData>(
    {
      isLoading: false,
      error: null,
      hasFetchRequest: true,
    },
    fetchSearchEventsContainerData
  );

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
