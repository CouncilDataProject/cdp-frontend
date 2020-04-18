import getCheckboxText from "./getCheckboxText";

describe("getCheckboxText", () => {
  const defaultText = "default";

  test("Returns defaultText", () => {
    const textRep = getCheckboxText({ a: false, b: false }, defaultText);
    expect(textRep).toEqual(defaultText);
  });

  test("Returns number of selected options and defaultText", () => {
    const textRep = getCheckboxText({ a: true, b: false, c: true }, defaultText);
    expect(textRep).toEqual(`${defaultText} : 2`);
  });
});
