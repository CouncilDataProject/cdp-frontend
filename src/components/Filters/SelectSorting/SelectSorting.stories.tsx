import React from "react";

import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";

import SelectSorting, { SelectSortingProps } from "./SelectSorting";

export default {
  component: SelectSorting,
  title: "Library/Filters/Select Sorting",
} as Meta;

const Template: Story<SelectSortingProps> = (args) => <SelectSorting {...args} />;

export const selectSorting = Template.bind({});
selectSorting.args = {
  state: {
    by: "value",
    order: "desc",
    label: "Most relevant",
  },
  update: action("update-sorting-state"),
  sortOptions: [
    { by: "value", order: "desc", label: "Most relevant" },
    { by: "date", order: "desc", label: "Newest first" },
    { by: "date", order: "asc", label: "Oldest first" },
  ],
  onPopupClose: action("on-popup-close"),
};
