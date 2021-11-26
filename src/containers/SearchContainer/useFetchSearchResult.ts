import { useReducer, useEffect, Dispatch } from "react";

import { FirebaseConfig } from "../../app/AppConfigContext";

import EventSearchService, { RenderableEvent } from "../../networking/EventSearchService";

import { SEARCH_TYPE } from "../../pages/SearchPage/types";

import { createError } from "../../utils/createError";

const SEARCH_RESULT_NUM = 4;

export interface SearchResult {
  event: {
    total: number;
    events: RenderableEvent[];
  };
  //TODO: add legislation result
}

export type FetchSearchResultAction =
  | { type: "FAILURE"; payload: Error }
  | { type: "SUCCESS"; payload: SearchResult }
  | { type: "FETCH_SEARCH_RESULT" };

export interface FetchSearchResultState {
  searchResult: SearchResult;
  //Is currently fetching search result?
  fetchSearchResult: boolean;
  error: Error | null;
}

function fetchSearchResultReducer(
  state: FetchSearchResultState,
  action: FetchSearchResultAction
): FetchSearchResultState {
  switch (action.type) {
    case "FAILURE": {
      return {
        ...state,
        error: action.payload,
      };
    }
    case "SUCCESS": {
      return {
        ...state,
        searchResult: action.payload,
        fetchSearchResult: false,
      };
    }
    case "FETCH_SEARCH_RESULT": {
      return {
        ...state,
        fetchSearchResult: true,
        error: null,
      };
    }
    default: {
      return state;
    }
  }
}

export default function useFetchSearchResult(
  firebaseConfig: FirebaseConfig,
  initialState: FetchSearchResultState,
  query: string,
  searchTypes: Record<SEARCH_TYPE, boolean>
): [FetchSearchResultState, Dispatch<FetchSearchResultAction>] {
  const [state, dispatch] = useReducer(fetchSearchResultReducer, initialState);

  useEffect(() => {
    const eventSearchService = new EventSearchService(firebaseConfig);

    let didCancel = false;

    const fetchSearchResult = async () => {
      try {
        const matchingEventsPromise = searchTypes.events
          ? eventSearchService.searchEvents(query)
          : Promise.resolve([]);
        const [matchingEvents] = await Promise.all([matchingEventsPromise]);
        //sort matching events by pure relevance with order desc
        matchingEvents.sort((a, b) => b.pureRelevance - a.pureRelevance);
        //TODO: add matching legislations

        const renderableEventsPromise = Promise.all(
          matchingEvents
            .slice(0, SEARCH_RESULT_NUM)
            .map((matchingEvent) => eventSearchService.getRenderableEvent(matchingEvent))
        );
        const [renderableEvents] = await Promise.all([renderableEventsPromise]);
        //TODO: add renderable legislations

        if (!didCancel) {
          dispatch({
            type: "SUCCESS",
            payload: {
              event: {
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
          dispatch({ type: "FAILURE", payload: error });
        }
      }
    };

    if (state.fetchSearchResult) {
      fetchSearchResult();
    }

    return () => {
      didCancel = true;
    };
  }, [state.fetchSearchResult, firebaseConfig, query, searchTypes]);

  return [state, dispatch];
}
