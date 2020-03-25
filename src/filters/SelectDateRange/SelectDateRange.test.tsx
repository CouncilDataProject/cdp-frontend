import React from "react";

import { shallow, ShallowWrapper } from "enzyme";

import SelectDateRange, { SelectDateRangeProps } from "./SelectDateRange";

describe("SelectDateRange", () => {
  let selectDateRange: ShallowWrapper<SelectDateRangeProps>;
  const updateMock = jest.fn();

  beforeEach(() => {
    selectDateRange = shallow(
      <SelectDateRange state={{ start: "", end: "" }} update={updateMock} />
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Renders 2 Form Inputs", () => {
    expect(selectDateRange.find("FormInput")).toHaveLength(2);
  });

  test("Renders 2 Form Fields", () => {
    expect(selectDateRange.find("FormField")).toHaveLength(2);
  });

  test("Calls update date range state callback with correct args for start date field", () => {
    selectDateRange
      .find("FormInput[name='start']")
      .simulate("change", "", { name: "start", value: "01/01/2020" });
    expect(updateMock).toHaveBeenCalledWith("start", "01/01/2020");
  });

  test("Calls update date range state callback with correct args for end date field", () => {
    selectDateRange
      .find("FormInput[name='end']")
      .simulate("change", "", { name: "end", value: "01/01/2020" });
    expect(updateMock).toHaveBeenCalledWith("end", "01/01/2020");
  });
});
