import getSelectedOptions from "./getSelectedOptions";

describe("getSelectedOptions", () => {
  test("Returns no selections with default state", () => {
    const selectedOptions = getSelectedOptions({});
    expect(selectedOptions).toHaveLength(0);
  });

  test("Returns correct selections", () => {
    const selectedOptions = getSelectedOptions({ a: true, b: false });
    expect(selectedOptions).toHaveLength(1);
    expect(selectedOptions).toContainEqual("a");
  });

  test("Return no selections with all false state", () => {
    const selectedOptions = getSelectedOptions({ a: false, b: false });
    expect(selectedOptions).toHaveLength(0);
  });
});
