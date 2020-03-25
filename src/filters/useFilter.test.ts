import { renderHook } from "@testing-library/react-hooks";

import useFilter from "./useFilter";

describe("useFilter", () => {
  describe("isActive for boolean filter", () => {
    test("Returns false for unitialized state", () => {
      const textRepFuncMock = jest.fn();
      const { result } = renderHook(() => useFilter<boolean>("test", {}, false, textRepFuncMock));
      expect(result.current.isActive()).toBe(false);
    });

    test("Returns false for no selected options", () => {
      const textRepFuncMock = jest.fn();
      const { result } = renderHook(() =>
        useFilter<boolean>("test", { a: false, b: false }, false, textRepFuncMock)
      );
      expect(result.current.isActive()).toBe(false);
    });

    test("Returns true for one selected option", () => {
      const textRepFuncMock = jest.fn();
      const { result } = renderHook(() =>
        useFilter<boolean>("test", { a: true, b: false }, false, textRepFuncMock)
      );
      expect(result.current.isActive()).toBe(true);
    });
  });

  describe("isSameState for boolean filter", () => {
    test("Returns true for uninitialized otherState and no selected options", () => {
      const textRepFuncMock = jest.fn();
      const { result } = renderHook(() =>
        useFilter<boolean>("test", { a: false, b: false }, false, textRepFuncMock)
      );
      expect(result.current.isSameState({})).toBe(true);
    });

    test("Returns false for uninitialized otherState and one selected options", () => {
      const textRepFuncMock = jest.fn();
      const { result } = renderHook(() =>
        useFilter<boolean>("test", { a: true, b: false }, false, textRepFuncMock)
      );
      expect(result.current.isSameState({})).toBe(false);
    });

    test("Returns false for otherState with new selected option", () => {
      const textRepFuncMock = jest.fn();
      const { result } = renderHook(() =>
        useFilter<boolean>("test", { a: false, b: true }, false, textRepFuncMock)
      );
      expect(result.current.isSameState({ a: false })).toBe(false);
    });

    test("Returns false for changing one dataValue false to true", () => {
      const textRepFuncMock = jest.fn();
      const { result } = renderHook(() =>
        useFilter<boolean>("test", { a: true, b: false }, false, textRepFuncMock)
      );
      expect(result.current.isSameState({ a: false, b: false })).toBe(false);
    });
    test("Returns false for changing one dataValue true to false", () => {
      const textRepFuncMock = jest.fn();
      const { result } = renderHook(() =>
        useFilter<boolean>("test", { a: false, b: false }, false, textRepFuncMock)
      );
      expect(result.current.isSameState({ a: true, b: false })).toBe(false);
    });

    test("Returns true for unchanged dataValue", () => {
      const textRepFuncMock = jest.fn();
      const { result } = renderHook(() =>
        useFilter<boolean>("test", { a: true, b: true }, false, textRepFuncMock)
      );
      expect(result.current.isSameState({ a: true, b: true })).toBe(true);
    });
  });
});
