import React from "react";

import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";

import SelectTextFilterOptions, { SelectTextFilterOptionsProps } from "./SelectTextFilterOptions";

export default {
  component: SelectTextFilterOptions,
  title: "Library/Filters/Select Text Filter Options",
} as Meta;

const Template: Story<SelectTextFilterOptionsProps> = (args) => (
  <SelectTextFilterOptions {...args} />
);

export const withOptionQuery = Template.bind({});
withOptionQuery.args = {
  name: "Committee",
  state: {},
  update: action("update-filter-options-state"),
  options: [
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
  ],
  optionQuery: "",
  setOptionQuery: action("set-option-query"),
};

export const withoutOptionQuery = Template.bind({});
withoutOptionQuery.args = {
  name: "Committee",
  state: {},
  update: action("update-filter-options-state"),
  options: [
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
  ],
  optionQuery: "",
  setOptionQuery: action("set-option-query"),
};

export const withDisabledOptions = Template.bind({});
withDisabledOptions.args = {
  name: "Committee",
  state: {},
  update: action("update-filter-options-state"),
  options: [
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
  ],
  optionQuery: "city",
  setOptionQuery: action("set-option-query"),
};
