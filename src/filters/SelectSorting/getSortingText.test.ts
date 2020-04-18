import getSortingText, { sortBy } from "./getSortingText";

describe("getSortingText", () => {
  const defaultText = "Sort By";
  test("Returns defaultText", () => {
    const textRep = getSortingText({ by: "" }, defaultText);
    expect(textRep).toEqual(defaultText);
  });

  test("Returns defaultText with unknown sort by", () => {
    const textRep = getSortingText({ by: "unknown" }, defaultText);
    expect(textRep).toEqual(defaultText);
  });

  test("Returns sort by Most recent", () => {
    const textRep = getSortingText({ by: "date" }, defaultText);
    expect(textRep).toEqual(sortBy.date);
  });

  test("Returns sort by Most relevant", () => {
    const textRep = getSortingText({ by: "value" }, defaultText);
    expect(textRep).toEqual(sortBy.value);
  });
});
