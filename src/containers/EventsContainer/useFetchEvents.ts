import { useEffect, useReducer, Dispatch } from "react";

import { RenderableEvent } from "../../networking/EventService";

import { createError } from "../../utils/createError";

export enum FetchEventsActionType {
  FAILURE = "FAILURE",
  SUCCESS = "SUCCESS",
  FETCH_EVENTS = "FETCH_EVENTS",
}

export type FetchEventsAction =
  | { type: FetchEventsActionType.FAILURE; payload: Error }
  | { type: FetchEventsActionType.SUCCESS; payload: RenderableEvent[] }
  //The payload is whether to fetch events with different filter parameters or fetch more events with same filter parameters.
  | { type: FetchEventsActionType.FETCH_EVENTS; payload: boolean };

export interface FetchEventsState {
  batchSize: number;
  events: RenderableEvent[];
  //Is currently fetching events with different filter parameters?
  fetchEvents: boolean;
  //Is currently fetching more events with the same filter parameters?
  showMoreEvents: boolean;
  hasMoreEvents: boolean;
  error: Error | null;
}

export function fetchEventsReducer(
  state: FetchEventsState,
  action: FetchEventsAction
): FetchEventsState {
  switch (action.type) {
    case FetchEventsActionType.SUCCESS: {
      return {
        ...state,
        events: state.fetchEvents ? action.payload : [...state.events, ...action.payload],
        fetchEvents: false,
        showMoreEvents: false,
        hasMoreEvents: action.payload.length === state.batchSize,
      };
    }
    case FetchEventsActionType.FAILURE: {
      return {
        ...state,
        error: action.payload,
        fetchEvents: false,
        showMoreEvents: false,
      };
    }
    case FetchEventsActionType.FETCH_EVENTS: {
      return {
        ...state,
        error: null,
        fetchEvents: action.payload,
        showMoreEvents: !action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default function useFetchEvents(
  initialState: FetchEventsState,
  fetchEventsFunctionCreator: (
    batchSize: number,
    afterDate?: Date
  ) => () => Promise<RenderableEvent[]>
): [FetchEventsState, Dispatch<FetchEventsAction>] {
  const [state, dispatch] = useReducer(fetchEventsReducer, initialState);

  useEffect(() => {
    let didCancel = false;

    const fetchEvents = async () => {
      try {
        const startAfterEventDate =
          !state.fetchEvents && state.events.length > 0
            ? state.events[state.events.length - 1].event_datetime
            : undefined;
        const fetch = fetchEventsFunctionCreator(state.batchSize, startAfterEventDate);
        const renderableEvents = await fetch();
        if (!didCancel) {
          dispatch({ type: FetchEventsActionType.SUCCESS, payload: renderableEvents });
        }
      } catch (e) {
        if (!didCancel) {
          const error = createError(e);
          dispatch({ type: FetchEventsActionType.FAILURE, payload: error });
        }
      }
    };

    if (state.fetchEvents || state.showMoreEvents) {
      fetchEvents();
    }

    return () => {
      didCancel = true;
    };
  }, [state.batchSize, state.events, state.fetchEvents, state.showMoreEvents, dispatch]);

  return [state, dispatch];
}
