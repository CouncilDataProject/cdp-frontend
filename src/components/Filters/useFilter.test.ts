import { act, renderHook } from "@testing-library/react-hooks";

import useFilter from "./useFilter";

describe("useFilter", () => {
  const textRepFuncMock = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Sets boolean filter state to all false", () => {
    const { result } = renderHook(() =>
      useFilter<boolean>({
        name: "test",
        initialState: { a: true, b: true },
        defaultDataValue: false,
        textRepFunction: textRepFuncMock,
      })
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
      useFilter<boolean>({
        name: "test",
        initialState: { a: true, b: true },
        defaultDataValue: false,
        textRepFunction: textRepFuncMock,
      })
    );
    act(() => {
      result.current.update(keyName, newDataValue);
    });
    expect(result.current.state[keyName]).toBe(newDataValue);
  });

  test("Calls textRepFunc callback", () => {
    const { result } = renderHook(() =>
      useFilter<boolean>({
        name: "test",
        initialState: { a: false, b: false },
        defaultDataValue: false,
        textRepFunction: textRepFuncMock,
      })
    );
    result.current.getTextRep();
    expect(textRepFuncMock).toHaveBeenCalledTimes(1);
  });

  describe("isActive for boolean filter", () => {
    test("Returns false for uninitialized state", () => {
      const { result } = renderHook(() =>
        useFilter<boolean>({
          name: "test",
          initialState: {},
          defaultDataValue: false,
          textRepFunction: textRepFuncMock,
        })
      );
      expect(result.current.isActive()).toBe(false);
    });

    test("Returns false for no selected options", () => {
      const { result } = renderHook(() =>
        useFilter<boolean>({
          name: "test",
          initialState: { a: false, b: false },
          defaultDataValue: false,
          textRepFunction: textRepFuncMock,
        })
      );
      expect(result.current.isActive()).toBe(false);
    });

    test("Returns true for one selected option", () => {
      const { result } = renderHook(() =>
        useFilter<boolean>({
          name: "test",
          initialState: { a: true, b: false },
          defaultDataValue: false,
          textRepFunction: textRepFuncMock,
        })
      );
      expect(result.current.isActive()).toBe(true);
    });
  });

  describe("isSameState for boolean filter", () => {
    test("Returns true for uninitialized prevState and newState has no selected options", () => {
      const prevState = {};
      const newState = { a: false, b: false };
      const { result } = renderHook(() =>
        useFilter<boolean>({
          name: "test",
          initialState: newState,
          defaultDataValue: false,
          textRepFunction: textRepFuncMock,
        })
      );
      expect(result.current.isSameState(prevState)).toBe(true);
    });

    test("Returns false for uninitialized prevState and newState has one selected option", () => {
      const prevState = {};
      const newState = { a: true, b: false };
      const { result } = renderHook(() =>
        useFilter<boolean>({
          name: "test",
          initialState: newState,
          defaultDataValue: false,
          textRepFunction: textRepFuncMock,
        })
      );
      expect(result.current.isSameState(prevState)).toBe(false);
    });

    test("Returns false for newState has a new selected option", () => {
      const prevState = { a: false };
      const newState = { a: false, b: true };
      const { result } = renderHook(() =>
        useFilter<boolean>({
          name: "test",
          initialState: newState,
          defaultDataValue: false,
          textRepFunction: textRepFuncMock,
        })
      );
      expect(result.current.isSameState(prevState)).toBe(false);
    });

    test("Returns false for changing one dataValue false to true", () => {
      const prevState = { a: false, b: false };
      const newState = { a: true, b: false };
      const { result } = renderHook(() =>
        useFilter<boolean>({
          name: "test",
          initialState: newState,
          defaultDataValue: false,
          textRepFunction: textRepFuncMock,
        })
      );
      expect(result.current.isSameState(prevState)).toBe(false);
    });

    test("Returns false for changing one dataValue true to false", () => {
      const prevState = { a: true, b: false };
      const newState = { a: false, b: false };
      const { result } = renderHook(() =>
        useFilter<boolean>({
          name: "test",
          initialState: newState,
          defaultDataValue: false,
          textRepFunction: textRepFuncMock,
        })
      );
      expect(result.current.isSameState(prevState)).toBe(false);
    });

    test("Returns true for unchanged dataValues", () => {
      const prevState = { a: true, b: true };
      const newState = { a: true, b: true };
      const { result } = renderHook(() =>
        useFilter<boolean>({
          name: "test",
          initialState: newState,
          defaultDataValue: false,
          textRepFunction: textRepFuncMock,
        })
      );
      expect(result.current.isSameState(prevState)).toBe(true);
    });
  });
});
