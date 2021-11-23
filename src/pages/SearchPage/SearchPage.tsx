import React, { FC, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import { useAppConfigContext } from "../../app";
import EventSearchService from "../../networking/EventSearchService";

import useFetchData, {
  FetchDataActionType,
} from "../../containers/FetchDataContainer/useFetchData";
import FetchDataContainer from "../../containers/FetchDataContainer/FetchDataContainer";
import { SearchContainer } from "../../containers/SearchContainer";
import { SearchContainerData } from "../../containers/SearchContainer/types";

import { createError } from "../../utils/createError";

const SearchPage: FC = () => {
  const location = useLocation<{ query: string }>();
  const searchQuery = useMemo(() => {
    if (location.state && location.state.query) {
      return location.state.query;
    }
    const { q } = queryString.parse(location.search);
    return (q as string) || " ";
  }, [location]);

  const { firebaseConfig } = useAppConfigContext();

  const { state: searchPageDataState, dispatch: searchPageDataDispatch } = useFetchData<
    SearchContainerData
  >({
    isLoading: false,
  });

  useEffect(() => {
    const eventSearchService = new EventSearchService(firebaseConfig);
    let didCancel = false;

    const fetchEventData = async () => {
      searchPageDataDispatch({ type: FetchDataActionType.FETCH_INIT });

      try {
        const events = await eventSearchService.searchEvents(searchQuery);
        const renderableEvents = await Promise.all(
          events.map((event) => eventSearchService.getRenderableEvent(event))
        );

        if (!didCancel) {
          searchPageDataDispatch({
            type: FetchDataActionType.FETCH_SUCCESS,
            payload: {
              events: renderableEvents,
            },
          });
        }
      } catch (err) {
        if (!didCancel) {
          const error = createError(err);
          searchPageDataDispatch({ type: FetchDataActionType.FETCH_FAILURE, payload: error });
        }
      }
    };

    fetchEventData();

    return () => {
      didCancel = true;
    };
  }, [searchQuery, firebaseConfig]);

  return (
    <FetchDataContainer isLoading={searchPageDataState.isLoading} error={searchPageDataState.error}>
      {searchPageDataState.data && <SearchContainer {...searchPageDataState.data} />}
    </FetchDataContainer>
  );
};

export default SearchPage;
