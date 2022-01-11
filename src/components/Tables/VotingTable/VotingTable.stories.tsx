import React from "react";
import { Story, Meta } from "@storybook/react";
import { voteList, voteListWithBrokenVote } from "../../../stories/model-mocks/vote";
import VotingTable, { VotingTableProps } from "./VotingTable";

export default {
  component: VotingTable,
  title: "Library/Tables/Voting Record Table",
} as Meta;

const Template: Story<VotingTableProps> = (args) => <VotingTable {...args} />;

export const EmptyTable = Template.bind({});
EmptyTable.args = {
  votesPage: [],
  name: "Alice",
};

export const SingleVote = Template.bind({});
SingleVote.args = {
  votesPage: voteList,
  name: "Alice",
};

export const SingleBrokenVote = Template.bind({});
SingleBrokenVote.args = {
  votesPage: voteListWithBrokenVote,
  name: "Alice",
};

export const ManyVotes = Template.bind({});
ManyVotes.args = {
  votesPage: voteList,
  name: "Alice",
};
