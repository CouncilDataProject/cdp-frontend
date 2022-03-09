import { useEffect, useReducer, Dispatch } from "react";

import { createError } from "../utils/createError";

export enum FetchModelsActionType {
  FAILURE = "FAILURE",
  SUCCESS = "SUCCESS",
  FETCH_MODELS = "FETCH_MODELS",
}

export type FetchModelsAction<Model> =
  | { type: FetchModelsActionType.FAILURE; payload: Error }
  | { type: FetchModelsActionType.SUCCESS; payload: Model[] }
  //The payload is whether to fetch models with different filter parameters or fetch more models with same filter parameters.
  | { type: FetchModelsActionType.FETCH_MODELS; payload: boolean };

export interface FetchModelsState<Model> {
  batchSize: number;
  models: Model[];
  //Is currently fetching models with different filter parameters?
  fetchModels: boolean;
  //Is currently fetching more models with the same filter parameters?
  showMoreModels: boolean;
  hasMoreModels: boolean;
  error: Error | null;
}
export const createFetchModelsReducer =
  <Model>() =>
  (state: FetchModelsState<Model>, action: FetchModelsAction<Model>): FetchModelsState<Model> => {
    switch (action.type) {
      case FetchModelsActionType.SUCCESS: {
        return {
          ...state,
          models: state.fetchModels ? action.payload : [...state.models, ...action.payload],
          fetchModels: false,
          showMoreModels: false,
          hasMoreModels: action.payload.length === state.batchSize,
        };
      }
      case FetchModelsActionType.FAILURE: {
        return {
          ...state,
          error: action.payload,
          fetchModels: false,
          showMoreModels: false,
        };
      }
      case FetchModelsActionType.FETCH_MODELS: {
        return {
          ...state,
          error: null,
          fetchModels: action.payload,
          showMoreModels: !action.payload,
        };
      }
      default: {
        return state;
      }
    }
  };

export default function useFetchModels<StartAfterType, Model>(
  initialState: FetchModelsState<Model>,
  getStartAfterValueFunctionCreator: (
    state: FetchModelsState<Model>
  ) => () => StartAfterType | undefined,
  fetchModelsFunctionCreator: (
    batchSize: number,
    startAfterValue?: StartAfterType
  ) => () => Promise<Model[]>
): { state: FetchModelsState<Model>; dispatch: Dispatch<FetchModelsAction<Model>> } {
  const [state, dispatch] = useReducer(createFetchModelsReducer<Model>(), initialState);

  useEffect(() => {
    let didCancel = false;

    const fetchModels = async () => {
      try {
        const startAfterValue = getStartAfterValueFunctionCreator(state)();
        const fetch = fetchModelsFunctionCreator(state.batchSize, startAfterValue);
        const models = await fetch();
        if (!didCancel) {
          dispatch({ type: FetchModelsActionType.SUCCESS, payload: models });
        }
      } catch (e) {
        if (!didCancel) {
          const error = createError(e);
          dispatch({ type: FetchModelsActionType.FAILURE, payload: error });
        }
      }
    };

    if (state.fetchModels || state.showMoreModels) {
      fetchModels();
    }

    return () => {
      didCancel = true;
    };
  }, [
    state,
    state.batchSize,
    state.models,
    state.fetchModels,
    state.showMoreModels,
    getStartAfterValueFunctionCreator,
    fetchModelsFunctionCreator,
    dispatch,
  ]);

  return { state, dispatch };
}
