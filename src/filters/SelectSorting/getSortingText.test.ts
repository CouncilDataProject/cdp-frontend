import getSortingText from "./getSortingText";

describe("getSortingText", () => {
  const defaultText = "Sort";
  test("Returns defaultText", () => {
    const textRep = getSortingText({ by: "", order: "" }, defaultText);
    expect(textRep).toEqual(`${defaultText} By`);
  });

  test("Returns defaultText with unknown sort by", () => {
    const textRep = getSortingText({ by: "unknown", order: "" }, defaultText);
    expect(textRep).toEqual(`${defaultText} By`);
  });

  test("Returns sort by date", () => {
    const textRep = getSortingText({ by: "date", order: "" }, defaultText);
    expect(textRep).toEqual(`${defaultText} by Event Date`);
  });

  test("Returns sort by value", () => {
    const textRep = getSortingText({ by: "value", order: "" }, defaultText);
    expect(textRep).toEqual(`${defaultText} by Search Relevance`);
  });

  test("Returns sort order", () => {
    const textRep = getSortingText({ by: "", order: "desc" }, defaultText);
    expect(textRep).toEqual(`${defaultText} Descending`);
  });

  test("Returns sort by and order", () => {
    const textRep = getSortingText({ by: "name", order: "asc" }, defaultText);
    expect(textRep).toEqual(`${defaultText} by Committee Name: Ascending`);
  });
});
