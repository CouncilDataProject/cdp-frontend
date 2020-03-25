import { FILTER_CLEAR, FILTER_UPDATE } from "./actions";
import createFilterReducer from "./reducer";

describe("filterReducer", () => {
  const filterReducer = createFilterReducer<boolean>();

  test("Return current state", () => {
    const currentState = { a: true };
    const action = { type: "unknown", payload: {} };
    expect(filterReducer(currentState, action)).toEqual(currentState);
  });

  test("Updates state's keyName with correct dataValue", () => {
    const currentState = { a: true };
    const nextState = { a: false };
    const action = { type: FILTER_UPDATE, payload: { keyName: "a", dataValue: false } };
    expect(filterReducer(currentState, action)).toEqual(nextState);
  });

  test("Resets state's dataValues with default dataValue", () => {
    const currentState = { a: true, b: false };
    const nextState = { a: false, b: false };
    const action = { type: FILTER_CLEAR, payload: { dataValue: false } };
    expect(filterReducer(currentState, action)).toEqual(nextState);
  });
});
