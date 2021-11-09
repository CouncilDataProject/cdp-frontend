import { useEffect, useReducer, Dispatch } from "react";

import { FirebaseConfig } from "../../app/AppConfigContext";
import { ORDER_DIRECTION } from "../../networking/constants";
import EventService, { RenderableEvent } from "../../networking/EventService";

import { createError } from "../../utils/createError";

export type Action =
  | { type: "FAILURE"; payload: Error }
  | { type: "SUCCESS"; payload: RenderableEvent[] }
  //The payload is whether to fetch events with different filter parameters or fetch more events with same filter parameters.
  | { type: "FETCH_EVENTS"; payload: boolean };

export interface State {
  eventsPerPage: number;
  events: RenderableEvent[];
  //Is currently fetching events with different filter parameters?
  fetchEvents: boolean;
  //Is currently fetching more events with the same filter parameters?
  showMoreEvents: boolean;
  hasMoreEvents: boolean;
  error: Error | null;
}

export function eventsPageReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SUCCESS": {
      return {
        ...state,
        events: state.fetchEvents ? action.payload : [...state.events, ...action.payload],
        fetchEvents: false,
        showMoreEvents: false,
        hasMoreEvents: action.payload.length === state.eventsPerPage,
      };
    }
    case "FAILURE": {
      return {
        ...state,
        error: action.payload,
        fetchEvents: false,
        showMoreEvents: false,
      };
    }
    case "FETCH_EVENTS": {
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

export default function useEventsPagination(
  firebaseConfig: FirebaseConfig,
  initialState: State,
  bodyIds: string[],
  dateRange: Record<string, string>,
  sort: Record<string, string>
): [State, Dispatch<Action>] {
  const [state, dispatch] = useReducer(eventsPageReducer, initialState);

  useEffect(() => {
    let didCancel = false;

    const fetchEvents = async () => {
      try {
        const eventService = new EventService(firebaseConfig);
        const events = await eventService.getEvents(
          state.eventsPerPage,
          bodyIds,
          {
            start: dateRange.start ? new Date(dateRange.start) : undefined,
            end: dateRange.end ? new Date(dateRange.end) : undefined,
          },
          {
            by: sort.by,
            order: sort.order as ORDER_DIRECTION,
          },
          !state.fetchEvents && state.events.length > 0
            ? state.events[state.events.length - 1].event_datetime
            : undefined
        );
        const renderableEvents = await Promise.all(
          events.map((event) => {
            return eventService.getRenderableEvent(event);
          })
        );
        if (!didCancel) {
          dispatch({ type: "SUCCESS", payload: renderableEvents });
        }
      } catch (e) {
        if (!didCancel) {
          const error = createError(e);
          dispatch({ type: "FAILURE", payload: error });
        }
      }
    };

    if (state.fetchEvents || state.showMoreEvents) {
      fetchEvents();
    }

    return () => {
      didCancel = true;
    };
  }, [
    state.eventsPerPage,
    state.events,
    state.fetchEvents,
    state.showMoreEvents,
    firebaseConfig,
    bodyIds,
    dateRange,
    sort,
    dispatch,
  ]);

  return [state, dispatch];
}
