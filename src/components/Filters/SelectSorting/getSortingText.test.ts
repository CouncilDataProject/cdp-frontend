import getSortingText from "./getSortingText";

describe("getSortingText", () => {
  const defaultText = "Sort By";
  test("Returns defaultText", () => {
    const textRep = getSortingText({ by: "", order: "", label: "" }, defaultText);
    expect(textRep).toEqual(defaultText);
  });

  test("Returns correct label given sort state", () => {
    const sortState = { by: "value", order: "desc", label: "Most relevant" };
    const textRep = getSortingText(sortState, defaultText);
    expect(textRep).toEqual(sortState.label);
  });
});
