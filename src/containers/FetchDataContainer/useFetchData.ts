import { useReducer, useEffect } from "react";

import { createError } from "../../utils/createError";

export const initialFetchDataState = {
  isLoading: false,
  error: null,
  hasFetchRequest: true,
};

export interface FetchDataState<T> {
  isLoading: boolean;
  data?: T;
  error: Error | null;
  //Should fetch data?
  hasFetchRequest: boolean;
}

export enum FetchDataActionType {
  FETCH_INIT = "FETCH_INIT",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FETCH_FAILURE = "FETCH_FAILURE",
  FETCH = "FETCH",
}

export type FetchDataAction<T> =
  | { type: FetchDataActionType.FETCH_INIT }
  | { type: FetchDataActionType.FETCH_FAILURE; payload: Error }
  | { type: FetchDataActionType.FETCH_SUCCESS; payload: T }
  | { type: FetchDataActionType.FETCH };

const createFetchDataReducer =
  <T>() =>
  (state: FetchDataState<T>, action: FetchDataAction<T>): FetchDataState<T> => {
    switch (action.type) {
      case FetchDataActionType.FETCH_INIT: {
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      }
      case FetchDataActionType.FETCH_SUCCESS: {
        return {
          ...state,
          isLoading: false,
          data: action.payload,
          hasFetchRequest: false,
        };
      }
      case FetchDataActionType.FETCH_FAILURE: {
        return {
          ...state,
          isLoading: false,
          error: action.payload,
          hasFetchRequest: false,
        };
      }
      case FetchDataActionType.FETCH: {
        return {
          ...state,
          hasFetchRequest: true,
        };
      }
      default:
        return state;
    }
  };

export default function useFetchData<T>(
  initialState: FetchDataState<T>,
  fetchData: () => Promise<T>
) {
  const fetchDataReducer = createFetchDataReducer<T>();
  const [state, dispatch] = useReducer(fetchDataReducer, initialState);

  useEffect(() => {
    let didCancel = false;

    const fetch = async () => {
      try {
        dispatch({ type: FetchDataActionType.FETCH_INIT });
        const data = await fetchData();
        if (!didCancel) {
          dispatch({ type: FetchDataActionType.FETCH_SUCCESS, payload: data });
        }
      } catch (e) {
        if (!didCancel) {
          const error = createError(e);
          dispatch({ type: FetchDataActionType.FETCH_FAILURE, payload: error });
        }
      }
    };

    if (state.hasFetchRequest) {
      fetch();
    }

    return () => {
      didCancel = true;
    };
  }, [state.hasFetchRequest, fetchData]);

  return { state, dispatch };
}
