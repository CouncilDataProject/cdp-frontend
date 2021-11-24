import React, { FC, useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import { useAppConfigContext } from "../../app";
import EventSearchService from "../../networking/EventSearchService";

import { HomeSearchBar } from "../../components/Layout/HomeSearchBar";
import useFetchData, {
  FetchDataActionType,
} from "../../containers/FetchDataContainer/useFetchData";
import FetchDataContainer from "../../containers/FetchDataContainer/FetchDataContainer";
import { SearchContainer } from "../../containers/SearchContainer";
import { SearchContainerData } from "../../containers/SearchContainer/types";
import { SEARCH_TYPE, SearchState } from "./types";

import { createError } from "../../utils/createError";

const Container = styled.div({
  "& > div:first-of-type": {
    marginBottom: 32,
  },
});

const RESULTS_NUM = 4;

const SearchPage: FC = () => {
  const location = useLocation<SearchState>();
  const searchState = useMemo(() => {
    if (location.state) {
      return location.state;
    }
    const { q } = queryString.parse(location.search);
    return {
      query: (q as string) || " ",
      searchTypes: {
        [SEARCH_TYPE.EVENT]: true,
        [SEARCH_TYPE.LEGISLATION]: true,
      },
    };
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
        const matchingEventsPromise = searchState.searchTypes.events
          ? eventSearchService.searchEvents(searchState.query)
          : Promise.resolve([]);
        const [matchingEvents] = await Promise.all([matchingEventsPromise]);
        //TODO: add matching legislations

        const renderableEventsPromise = Promise.all(
          matchingEvents
            .slice(0, RESULTS_NUM)
            .map((matchingEvent) => eventSearchService.getRenderableEvent(matchingEvent))
        );
        const [renderableEvents] = await Promise.all([renderableEventsPromise]);
        //TODO: add renderable legislations

        if (!didCancel) {
          searchPageDataDispatch({
            type: FetchDataActionType.FETCH_SUCCESS,
            payload: {
              searchState: searchState,
              eventResult: {
                events: renderableEvents,
                total: matchingEvents.length,
              },
              //TODO: add legislation result
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
  }, [searchState, firebaseConfig]);

  return (
    <Container>
      <HomeSearchBar query={searchState.query} searchTypes={searchState.searchTypes} />
      <FetchDataContainer
        isLoading={searchPageDataState.isLoading}
        error={searchPageDataState.error}
      >
        {searchPageDataState.data && <SearchContainer {...searchPageDataState.data} />}
      </FetchDataContainer>
    </Container>
  );
};

export default SearchPage;
