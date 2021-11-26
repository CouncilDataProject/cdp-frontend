import { useEffect, useReducer, Dispatch } from "react";

import { createError } from "../utils/createError";

export enum SearchCardsActionType {
  FAILURE = "FAILURE",
  FETCH_CARDS = "FETCH_CARDS",
  FETCH_CARDS_SUCCESS = "FETCH_CARDS_SUCCESSS",
  FILTER_AND_SORT_CARDS = "FILTER_AND_SORT_CARDS",
  FILTER_AND_SORT_CARDS_SUCCESS = "FILTER_AND_SORT_CARDS_SUCCESS",
  SHOW_MORE_CARDS = "SHOW_MORE_CARDS",
}

export type SearchCardsAction<T> =
  | { type: SearchCardsActionType.FAILURE; payload: Error }
  | { type: SearchCardsActionType.FETCH_CARDS }
  | { type: SearchCardsActionType.FETCH_CARDS_SUCCESS; payload: T[] }
  | { type: SearchCardsActionType.FILTER_AND_SORT_CARDS }
  | { type: SearchCardsActionType.FILTER_AND_SORT_CARDS_SUCCESS; payload: T[] }
  | { type: SearchCardsActionType.SHOW_MORE_CARDS };

export interface SearchCardsState<T> {
  batchSize: number;
  //Cards retrieved from search query alone
  searchedCards: T[];
  //The number of visible cards
  visibleCount: number;
  //Filtered and sorted cards
  cards: T[];
  //Is currently fetching cards with different search query?
  fetchCards: boolean;
  //Is currently filerting and/or sorting the cards?
  filterAndSortCards: boolean;
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
        filterAndSortCards: false,
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
      return {
        ...state,
        searchedCards: action.payload,
        fetchCards: false,
        filterAndSortCards: true,
      };
    }
    case SearchCardsActionType.FILTER_AND_SORT_CARDS: {
      return {
        ...state,
        error: null,
        filterAndSortCards: true,
      };
    }
    case SearchCardsActionType.FILTER_AND_SORT_CARDS_SUCCESS: {
      const nextVisibleCount = Math.min(state.batchSize, action.payload.length);
      return {
        ...state,
        cards: action.payload,
        visibleCount: nextVisibleCount,
        filterAndSortCards: false,
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
  fetch: () => Promise<T[]>,
  filterAndSortFunctionCreator: (searchCards: T[]) => () => T[]
): [SearchCardsState<T>, Dispatch<SearchCardsAction<T>>] {
  const reducer = createSearchCardsReducer<T>();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let didCancel = false;

    const fetchCards = async () => {
      try {
        let cards: T[] = [];
        if (state.fetchCards) {
          cards = await fetch();
        }
        if (state.filterAndSortCards) {
          const filterAndSort = filterAndSortFunctionCreator(state.searchedCards);
          cards = filterAndSort();
        }
        if (!didCancel) {
          const type = state.fetchCards
            ? SearchCardsActionType.FETCH_CARDS_SUCCESS
            : SearchCardsActionType.FILTER_AND_SORT_CARDS_SUCCESS;
          dispatch({ type, payload: cards });
        }
      } catch (e) {
        if (!didCancel) {
          const error = createError(e);
          dispatch({ type: SearchCardsActionType.FAILURE, payload: error });
        }
      }
    };

    if (state.fetchCards || state.filterAndSortCards) {
      fetchCards();
    }

    return () => {
      didCancel = true;
    };
  }, [
    state.fetchCards,
    state.filterAndSortCards,
    state.searchedCards,
    fetch,
    filterAndSortFunctionCreator,
    dispatch,
  ]);

  return [state, dispatch];
}
