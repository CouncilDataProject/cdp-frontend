import { Dispatch, useReducer, useState } from "react";

import { FILTER_CLEAR, FILTER_UPDATE } from "./actions";
import createFilterReducer, { FilterState } from "./reducer";

/**
 * The return type of useFilter hook
 */
export interface Filter<T> {
  /**The name of the filter. */
  name: string;
  /**The filter's state */
  state: FilterState<T>;
  /**Reset the filter's state. */
  clear(): void;
  /**Update the filter's state. */
  update(keyName: string, dataValue: T): void;
  /**Whether the filter's popup is open. */
  popupIsOpen: boolean;
  /**Toggle filter's UI popup open/close. */
  setPopupIsOpen: Dispatch<boolean>;
  /**Returns the text representation of the filter's state. */
  getTextRep(): string;
  /**Return whether any of the filter's dataValue does not equal the default dataValue. */
  isActive(): boolean;
  /**Return whether the other filter's state is the same as this filter's state */
  isSameState(otherState: FilterState<T>): boolean;
}
/**Returns an object that encapsulates the filter's state with functions to update filter's state
 * and get other useful informations about the state. */
function useFilter<T>(
  name: string,
  initialState: FilterState<T>,
  defaultDataValue: T,
  textRepFunction: (state: FilterState<T>, defaultText: string) => string
): Filter<T> {
  const filterReducer = createFilterReducer<T>();
  const [state, dispatch] = useReducer(filterReducer, initialState);
  const [popupIsOpen, setPopupIsOpen] = useState(false);

  const clear = () => {
    dispatch({
      type: FILTER_CLEAR,
      payload: {
        dataValue: defaultDataValue,
      },
    });
  };

  const update = (keyName: string, dataValue: T) => {
    dispatch({
      type: FILTER_UPDATE,
      payload: {
        keyName,
        dataValue,
      },
    });
  };

  const getTextRep = (): string => {
    return textRepFunction(state, name);
  };

  const isActive = (): boolean => {
    return Object.values(state).some((dataValue) => dataValue !== defaultDataValue);
  };

  const isSameState = (otherState: FilterState<T>): boolean => {
    if (!Object.entries(otherState).length) {
      return !isActive();
    }
    const keyNames = Object.keys(state);
    for (const keyName of keyNames) {
      if (state[keyName] && !otherState.hasOwnProperty(keyName)) {
        return false;
      }
      if (state[keyName] !== otherState[keyName] && otherState.hasOwnProperty(keyName)) {
        return false;
      }
    }
    return true;
  };

  return {
    name,
    state,
    clear,
    update,
    popupIsOpen,
    setPopupIsOpen,
    getTextRep,
    isActive,
    isSameState,
  };
}

export default useFilter;
