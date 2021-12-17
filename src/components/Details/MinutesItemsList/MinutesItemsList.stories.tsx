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
      name: "Approval of the minutes",
    },
    {
      name: "Council briefing minutes (2019)",
      documents: [
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
      name: "President's report",
    },
    {
      name: "Preview of today's city council actions, council and regional committees",
    },
    {
      name: "Inf 1579",
      description: "Inf 1579 description",
      documents: [
        {
          url: "http://google.com",
          label: "A document",
        },
      ],
    },
    {
      name: "Executive session on Pending, Potential, or Actual Litigation",
    },
  ],
};
