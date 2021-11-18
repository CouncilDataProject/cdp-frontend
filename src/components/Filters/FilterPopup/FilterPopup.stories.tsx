import React from "react";

import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";

import { ORDER_DIRECTION } from "../../../networking/constants";

import FilterPopup, { FilterPopupProps } from "./FilterPopup";
import { SelectDateRange } from "../SelectDateRange";
import { SelectSorting } from "../SelectSorting";
import { SelectTextFilterOptions } from "../SelectTextFilterOptions";

export default {
  component: FilterPopup,
  title: "Library/Filters/Filter Popup",
} as Meta;

const Template: Story<FilterPopupProps> = (args) => (
  <FilterPopup {...args}>{args.children}</FilterPopup>
);

export const selectDateRange = Template.bind({});
selectDateRange.args = {
  popupIsOpen: false,
  closeOnChange: false,
  clear: action("clear-filter"),
  getTextRep: () => "Date",
  isActive: () => true,
  setPopupIsOpen: action("set-popup-is-open"),
  handlePopupClose: action("handle-popup-close"),
  children: (
    <SelectDateRange state={{ start: "", end: "" }} update={action("update-date-range-state")} />
  ),
};

export const selectSorting = Template.bind({});
selectSorting.args = {
  popupIsOpen: false,
  closeOnChange: false,
  clear: action("clear-filter"),
  getTextRep: () => "Most relevant",
  isActive: () => true,
  setPopupIsOpen: action("set-popup-is-open"),
  handlePopupClose: action("handle-popup-close"),
  children: (
    <SelectSorting
      state={{
        by: "value",
        order: ORDER_DIRECTION.desc,
        label: "Most relevant",
      }}
      update={action("update-sorting-state")}
      sortOptions={[
        { by: "value", order: ORDER_DIRECTION.desc, label: "Most relevant" },
        { by: "date", order: ORDER_DIRECTION.desc, label: "Newest first" },
        { by: "date", order: ORDER_DIRECTION.asc, label: "Oldest first" },
      ]}
      onPopupClose={action("on-popup-close")}
    />
  ),
};

export const selectCommittees = Template.bind({});
selectCommittees.args = {
  popupIsOpen: false,
  closeOnChange: false,
  clear: action("clear-filter"),
  getTextRep: () => "Committee",
  isActive: () => true,
  setPopupIsOpen: action("set-popup-is-open"),
  handlePopupClose: action("handle-popup-close"),
  children: (
    <SelectTextFilterOptions
      name={"Committee"}
      state={{}}
      update={action("update-filter-options-state")}
      options={[
        {
          name: "city-council",
          label: "City Council",
          disabled: false,
        },
        {
          name: "council-briefing",
          label: "Council Briefing",
          disabled: false,
        },
        {
          name: "finance-housing",
          label: "Finance and Housing Committee",
          disabled: false,
        },
        {
          name: "finance-neighborhood",
          label: "Finance and Neighborhoods Committee",
          disabled: false,
        },
        {
          name: "select-budget",
          label: "Select Budget Committee",
          disabled: false,
        },
        {
          name: "transportation-utilities",
          label: "Transportation and Utilities Committee",
          disabled: false,
        },
      ]}
      optionQuery={""}
      setOptionQuery={action("set-option-query")}
    />
  ),
};
