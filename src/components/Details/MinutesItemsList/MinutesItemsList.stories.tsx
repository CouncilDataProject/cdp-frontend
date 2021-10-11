import React from "react";
import { Story, Meta } from "@storybook/react";

import MinutesItemsList, { MinutesItemsListProps } from "./MinutesItemsList";

export default {
  component: MinutesItemsList,
  title: "Library/Details/Minutes Items List",
} as Meta;

const Template: Story<MinutesItemsListProps> = (args) => <MinutesItemsList {...args} />;

export const minutesItemsList = Template.bind({});
minutesItemsList.args = {
  minutesItems: [
    {
      item: "Approval of the minutes",
    },
    {
      item: "Council briefing minutes (2019)",
      docs: [
        {
          url: "http://google.com",
          label: "Meeting transcript",
        },
        {
          url: "http://google.com",
          label: "2nd Meeting transcript",
        },
      ],
    },
    {
      item: "President's report",
    },
    {
      item: "Preview of today's city council actions, council and regional committees",
    },
    {
      item: "Inf 1579",
      docs: [
        {
          url: "http://google.com",
          label: "A document",
        },
      ],
    },
    {
      item: "Executive session on Pending, Potential, or Actual Litigation",
    },
  ],
};
