import { useReducer } from "react";

export interface FetchDataState<T> {
  isLoading: boolean;
  data?: T;
  error?: any;
}

export enum FetchDataActionType {
  FETCH_INIT = "FETCH_INIT",
  FETCH_SUCCESS = "FETCH_SUCCESS",
  FETCH_FAILTURE = "FETCH_FAILURE",
}

export interface FetchDataAction {
  type: FetchDataActionType;
  payload?: any;
}

const createFetchDataReducer = <T>() => (
  state: FetchDataState<T>,
  action: FetchDataAction
): FetchDataState<T> => {
  switch (action.type) {
    case "FETCH_INIT": {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case "FETCH_SUCCESS": {
      return {
        ...state,
        isLoading: false,
        data: action.payload as T,
      };
    }
    case "FETCH_FAILURE": {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default function useFetchData<T>(initialState: FetchDataState<T>) {
  const fetchDataReducer = createFetchDataReducer<T>();
  const [state, dispatch] = useReducer(fetchDataReducer, initialState);

  return { state, dispatch };
}
