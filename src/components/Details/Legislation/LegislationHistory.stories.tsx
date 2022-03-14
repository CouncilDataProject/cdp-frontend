import React from "react";

import { Story, Meta } from "@storybook/react";

import { LegislationHistoryProps, LegislationHistory } from "./LegislationHistory";
import {
  basicFailEventMinutesItem,
  basicPassEventMinutesItem,
  nonVotingEventMinutesItem,
} from "../../../stories/model-mocks/eventMinutesItem";

export default {
  component: LegislationHistory,
  title: "Library/Details/Legislation/History",
} as Meta;

const Template: Story<LegislationHistoryProps> = (args) => <LegislationHistory {...args} />;

export const history = Template.bind({});
history.args = {
  eventMinutesItems: [
    basicFailEventMinutesItem,
    nonVotingEventMinutesItem,
    basicPassEventMinutesItem,
    basicFailEventMinutesItem,
    nonVotingEventMinutesItem,
  ],
};
