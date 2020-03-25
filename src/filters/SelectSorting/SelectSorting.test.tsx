import React from "react";

import { shallow, ShallowWrapper } from "enzyme";

import { SortByOption, SortOrderOption } from "./getSortingText";
import SelectSorting, { SelectSortingProps } from "./SelectSorting";
import { ORDER_OPERATORS } from "../../api/database";

describe("SelectSorting", () => {
  let selectSorting: ShallowWrapper<SelectSortingProps>;
  const updateMock = jest.fn();
  const sortByOptions: SortByOption[] = ["name", "date"];

  const sortOrderOptions: SortOrderOption[] = [ORDER_OPERATORS.asc, ORDER_OPERATORS.desc];

  beforeEach(() => {
    selectSorting = shallow(
      <SelectSorting
        state={{ by: "", order: "" }}
        update={updateMock}
        sortByOptions={sortByOptions}
      />
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Renders 4 Checkboxes", () => {
    expect(selectSorting.find("FormCheckbox")).toHaveLength(4);
  });

  test("Renders 2 disabled Checkboxes for sort order options", () => {
    expect(selectSorting.find("FormCheckbox[disabled=true]")).toHaveLength(2);
  });

  test("Calls update sort state with correct args", () => {
    const options = [...sortByOptions, ...sortOrderOptions];
    for (let i = 0; i < options.length; i++) {
      selectSorting
        .find("FormCheckbox")
        .at(i)
        .simulate("change", "", { name: "", value: options[i] });
      expect(updateMock).toHaveBeenCalledWith("", options[i]);
    }
    expect(updateMock).toHaveBeenCalledTimes(options.length);
  });
});
