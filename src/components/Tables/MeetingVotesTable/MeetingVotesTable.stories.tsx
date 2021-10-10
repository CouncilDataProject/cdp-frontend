import React from "react";
import { Story, Meta } from "@storybook/react";

import MeetingVotesTable, { MeetingVotesTableProps } from "./MeetingVotesTable";

export default {
  component: MeetingVotesTable,
  title: "Library/Tables/Meeting Votes Table",
} as Meta;

const Template: Story<MeetingVotesTableProps> = (args) => <MeetingVotesTable {...args} />;

export const EmptyLegislationVoteTable = Template.bind({});
EmptyLegislationVoteTable.args = {
  votesPage: [],
};

export const SingleLegislationVote = Template.bind({});
SingleLegislationVote.args = {
  votesPage: [
    {
      matter: {
        id: "example-legislation-id",
        description: "A description of the legislation",
        name: "IRC 188",
      },
      date: new Date(),
      council_decision: "Adopted",
      votes: [
        {
          name: "Alice",
          decision: "Approve",
          id: "vote1",
        },
        {
          name: "Bob",
          decision: "Approve",
          id: "vote2",
        },
        {
          name: "Charlie",
          decision: "Approve",
          id: "vote3",
        },
        {
          name: "Denise",
          decision: "Reject",
          id: "vote4",
        },
        {
          name: "Elton",
          decision: "Abstain",
          id: "vote5",
        },
        {
          name: "Floyd",
          decision: "Reject",
          id: "vote6",
        },
        {
          name: "Gregory",
          decision: "Approve",
          id: "vote7",
        },
        {
          name: "Haley",
          decision: "Reject",
          id: "vote8",
        },
        {
          name: "Ivan",
          decision: "Abstain",
          id: "vote9",
        },
      ],
    },
  ],
};

export const SingleBrokenLegislationRow = Template.bind({});
SingleBrokenLegislationRow.args = {
  votesPage: [
    {
      matter: {
        id: "example-legislation-id",
        description: "A description of the legislation",
        name: "IRC 189",
      },
      date: new Date(),
      council_decision: "Adopted",
      votes: [
        {
          name: "Alice",
          personId: "personId1",
          decision: "Approve",
          id: "vote1",
        },
        {
          name: "Bob",
          personId: "personId1",
          decision: "Approve",
          id: "vote2",
        },
        {
          name: "Charlie",
          personId: "personId1",
          decision: "Approve",
          id: "vote3",
        },
        {
          name: "Denise",
          personId: "personId1",
          decision: "Approve",
          id: "vote4",
        },
        {
          name: "Elton",
          personId: "personId1",
          decision: "Abstain",
          id: "vote5",
        },
        {
          name: "Floyd",
          personId: "personId1",
          decision: "Reject",
          id: "vote6",
        },
        {
          name: "Gregory",
          personId: "personId1",
          decision: "Approve",
          id: "vote7",
        },
        {
          name: "Haley",
          personId: "personId1",
          decision: "Reject",
          id: "vote8",
        },
        {
          name: "Ivan",
          personId: "personId1",
          decision: "Abstain",
          id: "vote9",
        },
      ],
    },
    {
      matter: {
        id: "example-legislation-id",
        description: "A description of the legislation",
        name: "IRC 200",
      },
      date: new Date(),
      council_decision: "Adopted",
      votes: [
        {
          name: "Alice",
          personId: "personId1",
          decision: "Approve",
          id: "vote1",
        },
        {
          name: "Bob",
          personId: "personId1",
          decision: "Approve",
          id: "vote2",
        },
        {
          name: "Charlie",
          personId: "personId1",
          decision: "Approve",
          id: "vote3",
        },
        {
          name: "Denise",
          personId: "personId1",
          decision: "Reject",
          id: "vote4",
        },
        {
          name: "Elton",
          personId: "personId1",
          decision: "Abstain",
          id: "vote5",
        },
        {
          name: "Floyd",
          personId: "personId1",
          decision: "Reject",
          id: "vote6",
        },
        {
          name: "Gregory",
          personId: "personId1",
          decision: "Approve",
          id: "vote7",
        },
        {
          name: "Haley",
          personId: "personId1",
          decision: "Reject",
          id: "vote8",
        },
        {
          name: "Ivan",
          personId: "personId1",
          decision: "Abstain",
          id: "vote9",
        },
      ],
    },
    { broken: "simulating a broken row due to missing or malformed data" },
    {
      matter: {
        id: "example-legislation-id",
        description: "A description of the legislation",
        name: "IRC 201",
      },
      date: new Date(),
      council_decision: "Rejected",
      votes: [
        {
          name: "Alice",
          personId: "personId1",
          decision: "Reject",
          id: "vote1",
        },
        {
          name: "Bob",
          personId: "personId1",
          decision: "Reject",
          id: "vote2",
        },
        {
          name: "Charlie",
          personId: "personId1",
          decision: "Reject",
          id: "vote3",
        },
        {
          name: "Denise",
          personId: "personId1",
          decision: "Reject",
          id: "vote4",
        },
        {
          name: "Elton",
          personId: "personId1",
          decision: "Abstain",
          id: "vote5",
        },
        {
          name: "Floyd",
          personId: "personId1",
          decision: "Reject",
          id: "vote6",
        },
        {
          name: "Gregory",
          personId: "personId1",
          decision: "Approve",
          id: "vote7",
        },
        {
          name: "Haley",
          personId: "personId1",
          decision: "Reject",
          id: "vote8",
        },
        {
          name: "Ivan",
          personId: "personId1",
          decision: "Abstain",
          id: "vote9",
        },
      ],
    },
  ],
};

export const ManyLegislationRowsAndVotes = Template.bind({});
ManyLegislationRowsAndVotes.args = {
  votesPage: [
    {
      matter: {
        id: "example-legislation-id",
        description: "A description of the legislation",
        name: "IRC 189",
      },
      date: new Date(),
      council_decision: "Adopted",
      votes: [
        {
          name: "Alice",
          personId: "personId1",
          decision: "Approve",
          id: "vote1",
        },
        {
          name: "Bob",
          personId: "personId1",
          decision: "Approve",
          id: "vote2",
        },
        {
          name: "Charlie",
          personId: "personId1",
          decision: "Approve",
          id: "vote3",
        },
        {
          name: "Denise",
          personId: "personId1",
          decision: "Approve",
          id: "vote4",
        },
        {
          name: "Elton",
          personId: "personId1",
          decision: "Abstain",
          id: "vote5",
        },
        {
          name: "Floyd",
          personId: "personId1",
          decision: "Reject",
          id: "vote6",
        },
        {
          name: "Gregory",
          personId: "personId1",
          decision: "Approve",
          id: "vote7",
        },
        {
          name: "Haley",
          personId: "personId1",
          decision: "Reject",
          id: "vote8",
        },
        {
          name: "Ivan",
          personId: "personId1",
          decision: "Abstain",
          id: "vote9",
        },
      ],
    },
    {
      matter: {
        id: "example-legislation-id",
        description: "A description of the legislation",
        name: "IRC 200",
      },
      date: new Date(),
      council_decision: "Adopted",
      votes: [
        {
          name: "Alice",
          personId: "personId1",
          decision: "Approve",
          id: "vote1",
        },
        {
          name: "Bob",
          personId: "personId1",
          decision: "Approve",
          id: "vote2",
        },
        {
          name: "Charlie",
          personId: "personId1",
          decision: "Approve",
          id: "vote3",
        },
        {
          name: "Denise",
          personId: "personId1",
          decision: "Reject",
          id: "vote4",
        },
        {
          name: "Elton",
          personId: "personId1",
          decision: "Abstain",
          id: "vote5",
        },
        {
          name: "Floyd",
          personId: "personId1",
          decision: "Reject",
          id: "vote6",
        },
        {
          name: "Gregory",
          personId: "personId1",
          decision: "Approve",
          id: "vote7",
        },
        {
          name: "Haley",
          personId: "personId1",
          decision: "Reject",
          id: "vote8",
        },
        {
          name: "Ivan",
          personId: "personId1",
          decision: "Abstain",
          id: "vote9",
        },
      ],
    },
    {
      matter: {
        id: "example-legislation-id",
        description: "A description of the legislation",
        name: "IRC 290",
      },
      date: new Date(),
      council_decision: "In Progress",
      votes: [
        {
          name: "Alice",
          personId: "personId1",
          decision: "Reject",
          id: "vote1",
        },
        {
          name: "Bob",
          personId: "personId1",
          decision: "Approve",
          id: "vote2",
        },
        {
          name: "Charlie",
          personId: "personId1",
          decision: "Approve",
          id: "vote3",
        },
        {
          name: "Denise",
          personId: "personId1",
          decision: "Reject",
          id: "vote4",
        },
        {
          name: "Elton",
          personId: "personId1",
          decision: "Abstain",
          id: "vote5",
        },
        {
          name: "Floyd",
          personId: "personId1",
          decision: "Reject",
          id: "vote6",
        },
        {
          name: "Gregory",
          personId: "personId1",
          decision: "Approve",
          id: "vote7",
        },
        {
          name: "Haley",
          personId: "personId1",
          decision: "Reject",
          id: "vote8",
        },
        {
          name: "Ivan",
          personId: "personId1",
          decision: "Abstain",
          id: "vote9",
        },
      ],
    },
    {
      matter: {
        id: "example-legislation-id",
        description: "A description of the legislation",
        name: "IRC 201",
      },
      date: new Date(),
      council_decision: "Rejected",
      votes: [
        {
          name: "Alice",
          personId: "personId1",
          decision: "Reject",
          id: "vote1",
        },
        {
          name: "Bob",
          personId: "personId1",
          decision: "Reject",
          id: "vote2",
        },
        {
          name: "Charlie",
          personId: "personId1",
          decision: "Reject",
          id: "vote3",
        },
        {
          name: "Denise",
          personId: "personId1",
          decision: "Reject",
          id: "vote4",
        },
        {
          name: "Elton",
          personId: "personId1",
          decision: "Abstain",
          id: "vote5",
        },
        {
          name: "Floyd",
          personId: "personId1",
          decision: "Reject",
          id: "vote6",
        },
        {
          name: "Gregory",
          personId: "personId1",
          decision: "Approve",
          id: "vote7",
        },
        {
          name: "Haley",
          personId: "personId1",
          decision: "Reject",
          id: "vote8",
        },
        {
          name: "Ivan",
          personId: "personId1",
          decision: "Abstain",
          id: "vote9",
        },
      ],
    },
  ],
};
