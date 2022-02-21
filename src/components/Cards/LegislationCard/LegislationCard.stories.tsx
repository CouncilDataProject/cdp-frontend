import React from "react";
import { Story, Meta } from "@storybook/react";

import { MATTER_STATUS_DECISION } from "../../../models/constants";

import LegislationCard, { LegislationCardProps } from "./LegislationCard";

import { basicPerson } from "../../../stories/model-mocks/person";

export default {
  component: LegislationCard,
  title: "Library/Cards/Legislation",
} as Meta;

const Template: Story<LegislationCardProps> = (args) => <LegislationCard {...args} />;

const exampleLegislation = {
  name: "Council Budget Action SPD-4-A-1",
  excerpt:
    "Add $175,000 GF (ongoing) in 2020 to SPD to contract with an Indigenous led organization that can assist the City with its efforts to end the Missing and Murdered Indigenous Women and Girls Crisis, and impose a proviso",
  status: MATTER_STATUS_DECISION.ADOPTED,
  date: "January 22nd, 2020",
  tags: ["barbara bailey boulevard", "ADU", "single-family", "cottage"],
  sponsors: Array.from({ length: 5 }).map((_, i) => {
    return {
      ...basicPerson,
      id: `${basicPerson.id}-${i}`,
      name: `${basicPerson.name} ${i}`,
    };
  }),
};

export const adopted = Template.bind({});
adopted.args = exampleLegislation;

export const rejected = Template.bind({});
rejected.args = {
  ...exampleLegislation,
  status: MATTER_STATUS_DECISION.REJECTED,
};

export const inProgress = Template.bind({});
inProgress.args = {
  ...exampleLegislation,
  status: MATTER_STATUS_DECISION.IN_PROGRESS,
};

export const withSearchQuery = Template.bind({});
withSearchQuery.args = {
  ...exampleLegislation,
  excerpt:
    "... contract with an Indigenous led organization that can assist the City with its efforts ...",
  query: "indigenous",
};
