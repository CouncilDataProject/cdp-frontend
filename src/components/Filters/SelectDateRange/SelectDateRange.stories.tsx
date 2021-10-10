import React from "react";

import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";

import SelectDateRange, { SelectDateRangeProps } from "./SelectDateRange";

export default {
  component: SelectDateRange,
  title: "Library/Filters/Select Date Range",
} as Meta;

const Template: Story<SelectDateRangeProps> = (args) => <SelectDateRange {...args} />;

export const selectDateRange = Template.bind({});
selectDateRange.args = {
  state: {
    start: "",
    end: "",
  },
  update: action("update-date-range-state"),
};
