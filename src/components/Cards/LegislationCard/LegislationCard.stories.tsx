import React from "react";
import { Story, Meta } from "@storybook/react";

import LegislationCard, { LegislationCardProps } from "./LegislationCard";
import { MATTER_STATUS_DECISION } from "../../../models/constants";

export default {
  component: LegislationCard,
  title: "Library/Cards/Legislation",
} as Meta;

const Template: Story<LegislationCardProps> = (args) => <LegislationCard {...args} />;

export const adopted = Template.bind({});
adopted.args = {
  name: "Council Budget Action SPD-4-A-1",
  status: MATTER_STATUS_DECISION.ADOPTED,
  date: "January 22nd, 2020",
  tags: ["barbara bailey boulevard", "ADU", "single-family", "cottage"],
};

export const rejected = Template.bind({});
rejected.args = {
  name: "Council Budget Action SPD-4-A-1",
  status: MATTER_STATUS_DECISION.REJECTED,
  date: "January 22nd, 2020",
  tags: ["barbara bailey boulevard", "ADU", "single-family", "cottage"],
};

export const inProgress = Template.bind({});
inProgress.args = {
  name: "Council Budget Action SPD-4-A-1",
  status: MATTER_STATUS_DECISION.IN_PROGRESS,
  date: "January 22nd, 2020",
  tags: ["barbara bailey boulevard", "ADU", "single-family", "cottage"],
};
