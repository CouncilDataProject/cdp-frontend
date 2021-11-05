import { useEffect, useReducer, Dispatch } from "react";

import { FirebaseConfig } from "../../app/AppConfigContext";
import { ORDER_DIRECTION } from "../../networking/constants";

import EventService, { RenderableEvent } from "../../networking/EventService";

import { createError } from "../../utils/createError";

export type Action =
  | { type: "INIT" }
  | { type: "FAILURE"; payload: Error }
  | { type: "SUCCESS"; payload: RenderableEvent[] }
  | { type: "SHOW_MORE" }
  | { type: "UPDATE_CURRENT_PAGE"; payload: number }
  | { type: "FETCH_EVENTS" };

export interface State {
  shouldFetchEvents: boolean;
  eventsPerPage: number;
  events: RenderableEvent[];
  hasMoreEvents: boolean;
  isLoading: boolean;
  error: Error | null;
}

export function eventsPageReducer(state: State, action: Action): State {
  switch (action.type) {
    case "INIT": {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case "SUCCESS": {
      return {
        ...state,
        isLoading: false,
        events: [...state.events, ...action.payload],
        shouldFetchEvents: false,
        hasMoreEvents: action.payload.length === state.eventsPerPage,
      };
    }
    case "FAILURE": {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        shouldFetchEvents: false,
      };
    }
    case "SHOW_MORE": {
      return {
        ...state,
        shouldFetchEvents: true,
      };
    }
    case "FETCH_EVENTS": {
      return {
        ...state,
        shouldFetchEvents: true,
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
          state.events.length > 0 ? state.events[state.events.length - 1].event_datetime : undefined
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

    if (state.shouldFetchEvents) {
      fetchEvents();
    }

    return () => {
      didCancel = true;
    };
  }, [state.events, state.shouldFetchEvents, firebaseConfig, bodyIds, dateRange, sort]);

  return [state, dispatch];
}
