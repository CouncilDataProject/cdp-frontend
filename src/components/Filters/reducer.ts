import { FILTER_CLEAR, FILTER_UPDATE } from "./actions";

/**The filter's state type. */
export interface FilterState<T> {
  [key: string]: T;
}
/**The action type to update filter's state  */
export interface FilterAction<T> {
  type: string;
  payload: {
    keyName?: string;
    dataValue?: T;
  };
}

/**Create a filterReducer to manage filter's state.*/
const createFilterReducer =
  <T>() =>
  (state: FilterState<T>, action: FilterAction<T>): FilterState<T> => {
    switch (action.type) {
      case FILTER_UPDATE:
        return { ...state, [action.payload.keyName as string]: action.payload.dataValue as T };
      case FILTER_CLEAR:
        const newState = { ...state };
        Object.keys(newState).forEach(
          (keyName) => (newState[keyName] = action.payload.dataValue as T)
        );
        return newState;
      default:
        return state;
    }
  };

export default createFilterReducer;
