import React from "react";

import { Story, Meta } from "@storybook/react";

import { generatePopulatedVoteList } from "../../../stories/model-mocks/vote";
import { LegislationLatestVoteProps, LegislationLatestVote } from "./LegislationLatestVote";
import { VOTE_DECISION } from "../../../models/constants";

export default {
  component: LegislationLatestVote,
  title: "Library/Details/Legislation/LatestVote",
} as Meta;

const Template: Story<LegislationLatestVoteProps> = (args) => <LegislationLatestVote {...args} />;

export const adopted = Template.bind({});
adopted.args = {
  votes: generatePopulatedVoteList(VOTE_DECISION.APPROVE),
};

export const rejected = Template.bind({});
rejected.args = {
  votes: generatePopulatedVoteList(VOTE_DECISION.REJECT),
};
