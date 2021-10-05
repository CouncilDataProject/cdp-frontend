import React from "react";
import { Story, Meta } from "@storybook/react";

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
  votesPage: [
    {
      matter: {
        id: "example-matter-id",
        name: "Council Community Meeting",
        keywords: ["keyword1", "keyword2", "keyword3"],
      },
      decision: "Approve",
      council_decision: "Adopted",
      event: {
        id: "example-event-id",
        date: new Date(),
        body_name: "example-event-name",
      },
    },
  ],
  name: "Alice",
};

export const SingleBrokenVote = Template.bind({});
SingleBrokenVote.args = {
  votesPage: [
    {
      matter: {
        id: "example-matter-id",
        name: "Council Community Meeting",
        keywords: ["keyword1", "keyword2", "keyword3"],
      },
      decision: "Approve",
      council_decision: "Adopted",
      event: {
        id: "example-event-id",
        date: new Date(),
        body_name: "example-event-name",
      },
    },
    {
      error: "This is a vote object with broken properties.",
    },
    {
      matter: {
        id: "example-matter-id2",
        name: "Council Community Meeting",
        keywords: ["keyword1", "keyword2", "keyword3"],
      },
      decision: "Reject",
      council_decision: "Adopted",
      event: {
        id: "example-event-id",
        date: new Date(),
        body_name: "example-event-name",
      },
    },
    {
      matter: {
        id: "example-matter-id3",
        name: "Council Community Meeting",
        keywords: ["keyword1", "keyword2", "keyword3"],
      },
      decision: "Approve",
      council_decision: "Adopted",
      event: {
        id: "example-event-id",
        date: new Date(),
        body_name: "example-event-name",
      },
    },
  ],
  name: "Alice",
};

export const ManyVotes = Template.bind({});
ManyVotes.args = {
  votesPage: [
    {
      matter: {
        id: "example-matter-id",
        name: "SLC 123.53",
        keywords: ["keyword1", "keyword2", "keyword3"],
      },
      decision: "Reject",
      council_decision: "Rejected",
      event: {
        id: "example-event-id",
        date: new Date(),
        body_name: "example-event-name",
      },
    },
    {
      matter: {
        id: "example-matter-id2",
        name: "Example Matter",
        keywords: ["keyword1", "keyword2", "keyword3"],
      },
      decision: "Approve",
      council_decision: "Rejected",
      event: {
        id: "example-event-id",
        date: new Date(),
        body_name: "example-event-name",
      },
    },
    {
      matter: {
        id: "example-matter-id3",
        name: "WA RPC 13.34",
        keywords: ["keyword1", "keyword2", "keyword3"],
      },
      decision: "Reject",
      council_decision: "Adopted",
      event: {
        id: "example-event-id",
        date: new Date(),
        body_name: "example-event-name",
      },
    },
    {
      matter: {
        id: "example-matter-id4",
        name: "SEA 124",
        keywords: ["keyword1", "keyword2", "keyword3"],
      },
      decision: "Approve",
      council_decision: "Adopted",
      event: {
        id: "example-event-id",
        date: new Date(),
        body_name: "example-event-name",
      },
    },
    {
      matter: {
        id: "example-matter-id5",
        name: "Matter Example",
        keywords: ["keyword1", "keyword2", "keyword3"],
      },
      decision: "Approve",
      council_decision: "Adopted",
      event: {
        id: "example-event-id",
        date: new Date(),
        body_name: "example-event-name",
      },
    },
    {
      matter: {
        id: "example-matter-id6",
        name: "Last Matter",
        keywords: ["keyword1", "keyword2", "keyword3"],
      },
      decision: "Reject",
      council_decision: "Adopted",
      event: {
        id: "example-event-id",
        date: new Date(),
        body_name: "example-event-name",
      },
    },
  ],
  name: "Alice",
};
