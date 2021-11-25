import { useEffect, useReducer, Dispatch } from "react";
import { orderBy } from "lodash";

import { FirebaseConfig } from "../../app/AppConfigContext";

import { ORDER_DIRECTION } from "../../networking/constants";
import EventSearchService, { RenderableEvent } from "../../networking/EventSearchService";

import { createError } from "../../utils/createError";

export type SearchEventsAction =
  | { type: "FAILURE"; payload: Error }
  | { type: "FETCH_EVENTS" }
  | { type: "FETCH_EVENTS_SUCCESS"; payload: RenderableEvent[] }
  | { type: "FILTER_AND_SORT_EVENTS" }
  | { type: "FILTER_AND_SORT_EVENTS_SUCCESS"; payload: RenderableEvent[] }
  | { type: "SHOW_MORE_EVENTS" };

export interface SearchEventsState {
  batchSize: number;
  //Events retrieved from search query alone
  searchedEvents: RenderableEvent[];
  //The number of visible event
  visibleCount: number;
  //Filtered and sorted events
  events: RenderableEvent[];
  //Is currently fetching events with different search query?
  fetchEvents: boolean;
  //Is currently filerting and/or sorting the events?
  filterAndSortEvents: boolean;
  error: Error | null;
}

export function searchEventsPageReducer(
  state: SearchEventsState,
  action: SearchEventsAction
): SearchEventsState {
  switch (action.type) {
    case "FAILURE": {
      return {
        ...state,
        error: action.payload,
        fetchEvents: false,
        filterAndSortEvents: false,
      };
    }
    case "FETCH_EVENTS": {
      return {
        ...state,
        error: null,
        fetchEvents: true,
      };
    }
    case "FETCH_EVENTS_SUCCESS": {
      return {
        ...state,
        searchedEvents: action.payload,
        fetchEvents: false,
        filterAndSortEvents: true,
      };
    }
    case "FILTER_AND_SORT_EVENTS": {
      return {
        ...state,
        error: null,
        filterAndSortEvents: true,
      };
    }
    case "FILTER_AND_SORT_EVENTS_SUCCESS": {
      const nextVisibleCount = Math.min(state.batchSize, action.payload.length);
      return {
        ...state,
        events: action.payload,
        visibleCount: nextVisibleCount,
        filterAndSortEvents: false,
      };
    }
    case "SHOW_MORE_EVENTS": {
      const nextVisibleCount = Math.min(state.batchSize + state.visibleCount, state.events.length);
      return {
        ...state,
        visibleCount: nextVisibleCount,
      };
    }
    default: {
      return state;
    }
  }
}

export default function useSearchEventsPagination(
  firebaseConfig: FirebaseConfig,
  initialState: SearchEventsState,
  query: string,
  bodyIds: string[],
  dateRange: Record<string, string>,
  sort: Record<string, string>
): [SearchEventsState, Dispatch<SearchEventsAction>] {
  const [state, dispatch] = useReducer(searchEventsPageReducer, initialState);

  useEffect(() => {
    let didCancel = false;

    const filterAndSortEvents = () => {
      try {
        let filteredEvents = state.searchedEvents.filter(({ event }) => {
          if (bodyIds.length) {
            if (!event.body?.id) {
              //exclude events without a body
              return false;
            }
            if (!bodyIds.includes(event.body.id)) {
              //exclude body not in bodyIds
              return false;
            }
          }

          if (dateRange.start || dateRange.end) {
            if (!event.event_datetime) {
              //exclude events without a event_datetime
              return false;
            }
            if (dateRange.start && event.event_datetime < new Date(dateRange.start)) {
              //exclude events before start date
              return false;
            }
            if (dateRange.end) {
              //exclude events after end date
              const endDate = new Date(dateRange.end);
              endDate.setDate(endDate.getDate() + 1);
              if (event.event_datetime > endDate) {
                return false;
              }
            }
          }

          return true;
        });

        filteredEvents = orderBy(filteredEvents, [sort.by], [sort.order as ORDER_DIRECTION]);

        if (!didCancel) {
          dispatch({ type: "FILTER_AND_SORT_EVENTS_SUCCESS", payload: filteredEvents });
        }
      } catch (e) {
        if (!didCancel) {
          const error = createError(e);
          dispatch({ type: "FAILURE", payload: error });
        }
      }
    };

    if (state.filterAndSortEvents) {
      filterAndSortEvents();
    }

    return () => {
      didCancel = true;
    };
  }, [state.searchedEvents, state.filterAndSortEvents, bodyIds, dateRange, sort, dispatch]);

  useEffect(() => {
    let didCancel = false;

    const fetchEvents = async () => {
      try {
        const eventSearchService = new EventSearchService(firebaseConfig);
        const matchingEvents = await eventSearchService.searchEvents(query);
        const renderableEvents = await Promise.all(
          matchingEvents.map((matchingEvent) => {
            return eventSearchService.getRenderableEvent(matchingEvent);
          })
        );
        if (!didCancel) {
          dispatch({ type: "FETCH_EVENTS_SUCCESS", payload: renderableEvents });
        }
      } catch (e) {
        if (!didCancel) {
          const error = createError(e);
          dispatch({ type: "FAILURE", payload: error });
        }
      }
    };

    if (state.fetchEvents) {
      fetchEvents();
    }

    return () => {
      didCancel = true;
    };
  }, [state.fetchEvents, firebaseConfig, query, dispatch]);

  return [state, dispatch];
}
