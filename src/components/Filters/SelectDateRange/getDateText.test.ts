import getDateText from "./getDateText";

describe("getDateText", () => {
  const defaultText = "Date";

  test("Returns defaultText", () => {
    const textRep = getDateText({ start: "", end: "" }, defaultText);
    expect(textRep).toEqual(defaultText);
  });

  test("Returns start date", () => {
    const textRep = getDateText({ start: "2020/01/01", end: "" }, defaultText);
    expect(textRep).toEqual("Jan 1, 2020 -");
  });

  test("Returns end date", () => {
    const textRep = getDateText({ start: "", end: "2020/01/01" }, defaultText);
    expect(textRep).toEqual("- Jan 1, 2020");
  });

  test("Returns start and end date with same year and month", () => {
    const textRep = getDateText({ start: "2020/01/01", end: "2020/01/02" }, defaultText);
    expect(textRep).toEqual("Jan 1 - 2, 2020");
  });

  test("Returns start and end date with same year only", () => {
    const textRep = getDateText({ start: "2020/01/01", end: "2020/02/01" }, defaultText);
    expect(textRep).toEqual("Jan 1 - Feb 1, 2020");
  });

  test("Returns start and end date with different year", () => {
    const textRep = getDateText({ start: "2020/01/01", end: "2021/01/01" }, defaultText);
    expect(textRep).toEqual("Jan 1, 2020 - Jan 1, 2021");
  });
});
