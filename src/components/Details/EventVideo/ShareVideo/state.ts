import { timePointToSeconds, secondsToTimePointStr } from "./utils";

export interface TimePointState {
  /** The time point str */
  value: string;
  /** Is the input html (to enter a timepoint) disabled? */
  isDisabled: boolean;
  /** Does the share link URL contain a timepoint query parameter? */
  isActive: boolean;
  /** Is the the modal open? */
  isOpen: boolean;
}

export enum TimePointActionType {
  UPDATE_VALUE,
  VALIDATE_VALUE,
  OPEN,
  CLOSE,
}

export type TimePointAction =
  | { type: TimePointActionType.UPDATE_VALUE; payload: string }
  // The payload is for `isActive`
  | { type: TimePointActionType.VALIDATE_VALUE; payload?: boolean }
  | { type: TimePointActionType.OPEN; payload: number }
  | { type: TimePointActionType.CLOSE };

export const initialTimePoint = {
  value: "",
  isDisabled: false,
  isActive: false,
  isOpen: false,
};

export const timePointReducer = (state: TimePointState, action: TimePointAction) => {
  switch (action.type) {
    case TimePointActionType.UPDATE_VALUE: {
      return { ...state, value: action.payload };
    }
    case TimePointActionType.VALIDATE_VALUE: {
      const newValue = secondsToTimePointStr(timePointToSeconds(state.value));
      if (action.payload !== undefined) {
        return {
          ...state,
          value: newValue,
          isDisabled: !action.payload,
          isActive: action.payload,
        };
      } else {
        return { ...state, value: newValue };
      }
    }
    case TimePointActionType.OPEN: {
      const newValue = secondsToTimePointStr(action.payload);
      return { ...state, isOpen: true, value: newValue, isDisabled: false, isActive: false };
    }
    case TimePointActionType.CLOSE: {
      return { ...state, isOpen: false };
    }
    default:
      return state;
  }
};
