import React from "react";

import { shallow, ShallowWrapper } from "enzyme";

import { SortByOption } from "./getSortingText";
import SelectSorting, { SelectSortingProps } from "./SelectSorting";

describe("SelectSorting", () => {
  let selectSorting: ShallowWrapper<SelectSortingProps>;
  const updateMock = jest.fn();
  const sortByOptions: SortByOption[] = ["date", "value"];

  beforeEach(() => {
    selectSorting = shallow(
      <SelectSorting state={{ by: "" }} update={updateMock} sortByOptions={sortByOptions} />
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Renders 2 Checkboxes", () => {
    expect(selectSorting.find("FormCheckbox")).toHaveLength(sortByOptions.length);
  });

  test("Calls update sort state with correct args", () => {
    const checkboxes = selectSorting.find("FormCheckbox");
    for (let i = 0; i < sortByOptions.length; i++) {
      checkboxes.at(i).simulate("change", "", { name: "by", value: sortByOptions[i] });
      expect(updateMock).toHaveBeenCalledWith("by", sortByOptions[i]);
    }
    expect(updateMock).toHaveBeenCalledTimes(sortByOptions.length);
  });
});
