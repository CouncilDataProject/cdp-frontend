import React from "react";

import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";

import { ORDER_DIRECTION } from "../../../networking/constants";

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
    order: ORDER_DIRECTION.desc,
    label: "Most relevant",
  },
  update: action("update-sorting-state"),
  sortOptions: [
    { by: "value", order: ORDER_DIRECTION.desc, label: "Most relevant" },
    { by: "date", order: ORDER_DIRECTION.desc, label: "Newest first" },
    { by: "date", order: ORDER_DIRECTION.asc, label: "Oldest first" },
  ],
  onPopupClose: action("on-popup-close"),
};
