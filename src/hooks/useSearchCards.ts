import { useEffect, useReducer, Dispatch } from "react";

import { createError } from "../utils/createError";

export enum SearchCardsActionType {
  FAILURE = "FAILURE",
  FETCH_CARDS = "FETCH_CARDS",
  FETCH_CARDS_SUCCESS = "FETCH_CARDS_SUCCESSS",
  SHOW_MORE_CARDS = "SHOW_MORE_CARDS",
}

export type SearchCardsAction<T> =
  | { type: SearchCardsActionType.FAILURE; payload: Error }
  | { type: SearchCardsActionType.FETCH_CARDS }
  | { type: SearchCardsActionType.FETCH_CARDS_SUCCESS; payload: T[] }
  | { type: SearchCardsActionType.SHOW_MORE_CARDS };

export interface SearchCardsState<T> {
  batchSize: number;
  //The number of visible cards
  visibleCount: number;
  //Filtered and sorted cards
  cards: T[];
  //Is currently fetching cards?
  fetchCards: boolean;
  error: Error | null;
}

const createSearchCardsReducer = <T>() => (
  state: SearchCardsState<T>,
  action: SearchCardsAction<T>
): SearchCardsState<T> => {
  switch (action.type) {
    case SearchCardsActionType.FAILURE: {
      return {
        ...state,
        error: action.payload,
        fetchCards: false,
      };
    }
    case SearchCardsActionType.FETCH_CARDS: {
      return {
        ...state,
        error: null,
        fetchCards: true,
      };
    }
    case SearchCardsActionType.FETCH_CARDS_SUCCESS: {
      const nextVisibleCount = Math.min(state.batchSize, action.payload.length);
      return {
        ...state,
        cards: action.payload,
        visibleCount: nextVisibleCount,
        fetchCards: false,
      };
    }
    case SearchCardsActionType.SHOW_MORE_CARDS: {
      const nextVisibleCount = Math.min(state.batchSize + state.visibleCount, state.cards.length);
      return {
        ...state,
        visibleCount: nextVisibleCount,
      };
    }
    default: {
      return state;
    }
  }
};

export default function useSearchCards<T>(
  initialState: SearchCardsState<T>,
  fetch: () => Promise<T[]>
): [SearchCardsState<T>, Dispatch<SearchCardsAction<T>>] {
  const reducer = createSearchCardsReducer<T>();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let didCancel = false;

    const fetchCards = async () => {
      try {
        const cards = await fetch();
        if (!didCancel) {
          dispatch({ type: SearchCardsActionType.FETCH_CARDS_SUCCESS, payload: cards });
        }
      } catch (e) {
        if (!didCancel) {
          const error = createError(e);
          dispatch({ type: SearchCardsActionType.FAILURE, payload: error });
        }
      }
    };

    if (state.fetchCards) {
      fetchCards();
    }

    return () => {
      didCancel = true;
    };
  }, [state.fetchCards, fetch, dispatch]);

  return [state, dispatch];
}
