import { act, renderHook } from "@testing-library/react-hooks";

import useFilter from "./useFilter";

describe("useFilter", () => {
  const textRepFuncMock = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Sets boolean filter state to all false", () => {
    const { result } = renderHook(() =>
      useFilter<boolean>("test", { a: true, b: true }, false, textRepFuncMock)
    );
    act(() => {
      result.current.clear();
    });
    const trueDataValues = Object.values(result.current.state).filter((dataValue) => dataValue);
    expect(trueDataValues).toHaveLength(0);
  });

  test("Updates boolean filter state", () => {
    const keyName = "a";
    const newDataValue = false;
    const { result } = renderHook(() =>
      useFilter<boolean>("test", { a: true, b: true }, false, textRepFuncMock)
    );
    act(() => {
      result.current.update(keyName, newDataValue);
    });
    expect(result.current.state[keyName]).toBe(newDataValue);
  });

  test("Calls textRepFunc callback", () => {
    const { result } = renderHook(() =>
      useFilter<boolean>("test", { a: false, b: false }, false, textRepFuncMock)
    );
    result.current.getTextRep();
    expect(textRepFuncMock).toHaveBeenCalledTimes(1);
  });

  describe("isActive for boolean filter", () => {
    test("Returns false for uninitialized state", () => {
      const { result } = renderHook(() => useFilter<boolean>("test", {}, false, textRepFuncMock));
      expect(result.current.isActive()).toBe(false);
    });

    test("Returns false for no selected options", () => {
      const { result } = renderHook(() =>
        useFilter<boolean>("test", { a: false, b: false }, false, textRepFuncMock)
      );
      expect(result.current.isActive()).toBe(false);
    });

    test("Returns true for one selected option", () => {
      const { result } = renderHook(() =>
        useFilter<boolean>("test", { a: true, b: false }, false, textRepFuncMock)
      );
      expect(result.current.isActive()).toBe(true);
    });
  });

  describe("isSameState for boolean filter", () => {
    test("Returns true for uninitialized prevState and newState has no selected options", () => {
      const prevState = {};
      const newState = { a: false, b: false };
      const { result } = renderHook(() =>
        useFilter<boolean>("test", newState, false, textRepFuncMock)
      );
      expect(result.current.isSameState(prevState)).toBe(true);
    });

    test("Returns false for uninitialized prevState and newState has one selected option", () => {
      const prevState = {};
      const newState = { a: true, b: false };
      const { result } = renderHook(() =>
        useFilter<boolean>("test", newState, false, textRepFuncMock)
      );
      expect(result.current.isSameState(prevState)).toBe(false);
    });

    test("Returns false for newState has a new selected option", () => {
      const prevState = { a: false };
      const newState = { a: false, b: true };
      const { result } = renderHook(() =>
        useFilter<boolean>("test", newState, false, textRepFuncMock)
      );
      expect(result.current.isSameState(prevState)).toBe(false);
    });

    test("Returns false for changing one dataValue false to true", () => {
      const prevState = { a: false, b: false };
      const newState = { a: true, b: false };
      const { result } = renderHook(() =>
        useFilter<boolean>("test", newState, false, textRepFuncMock)
      );
      expect(result.current.isSameState(prevState)).toBe(false);
    });

    test("Returns false for changing one dataValue true to false", () => {
      const prevState = { a: true, b: false };
      const newState = { a: false, b: false };
      const { result } = renderHook(() =>
        useFilter<boolean>("test", newState, false, textRepFuncMock)
      );
      expect(result.current.isSameState(prevState)).toBe(false);
    });

    test("Returns true for unchanged dataValues", () => {
      const prevState = { a: true, b: true };
      const newState = { a: true, b: true };
      const { result } = renderHook(() =>
        useFilter<boolean>("test", newState, false, textRepFuncMock)
      );
      expect(result.current.isSameState(prevState)).toBe(true);
    });
  });
});
