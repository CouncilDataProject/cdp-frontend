import React from "react";

import { shallow, ShallowWrapper } from "enzyme";

import { ORDER_DIRECTION } from "../../../networking/constants";

import { SortOption } from "./getSortingText";
import SelectSorting, { SelectSortingProps } from "./SelectSorting";

describe("SelectSorting", () => {
  let selectSorting: ShallowWrapper<SelectSortingProps>;
  const updateMock = jest.fn();
  const onPopupCloseMock = jest.fn();
  const sortOptions: SortOption[] = [
    { by: "value", order: ORDER_DIRECTION.desc, label: "Most relevant" },
    { by: "date", order: ORDER_DIRECTION.desc, label: "Newest first" },
    { by: "date", order: ORDER_DIRECTION.asc, label: "Oldest first" },
  ];

  beforeEach(() => {
    selectSorting = shallow(
      <SelectSorting
        state={{ by: "", order: "", label: "" }}
        update={updateMock}
        sortOptions={sortOptions}
        onPopupClose={onPopupCloseMock}
      />
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Renders 3 sort options", () => {
    expect(selectSorting.find(".mzp-c-choice")).toHaveLength(sortOptions.length);
  });

  test("Calls onPopupClose when user select a sort option", () => {
    const checkboxes = selectSorting.find(".mzp-c-choice-control");
    for (let i = 0; i < sortOptions.length; i++) {
      checkboxes.at(i).simulate("change", {
        currentTarget: {
          value: `${sortOptions[i].by}#${sortOptions[i].order}`,
          parentNode: {
            textContent: sortOptions[i].label,
          },
        },
      });
    }
    expect(onPopupCloseMock).toHaveBeenCalledTimes(sortOptions.length);
  });

  test("Calls update sort state with correct args", () => {
    const checkboxes = selectSorting.find(".mzp-c-choice-control");
    for (let i = 0; i < sortOptions.length; i++) {
      checkboxes.at(i).simulate("change", {
        currentTarget: {
          value: `${sortOptions[i].by}#${sortOptions[i].order}`,
          parentNode: {
            textContent: sortOptions[i].label,
          },
        },
      });
      expect(updateMock).toHaveBeenCalledWith("by", sortOptions[i].by);
      expect(updateMock).toHaveBeenCalledWith("order", sortOptions[i].order);
      expect(updateMock).toHaveBeenCalledWith("label", sortOptions[i].label);
    }
    expect(updateMock).toHaveBeenCalledTimes(sortOptions.length * 3);
  });
});
