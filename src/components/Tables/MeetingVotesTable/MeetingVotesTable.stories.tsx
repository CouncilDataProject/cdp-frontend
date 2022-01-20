import React from "react";
import { Story, Meta } from "@storybook/react";

import { EVENT_MINUTES_ITEM_DECISION, VOTE_DECISION } from "../../../models/constants";

import MeetingVotesTable, { MeetingVotesTableProps } from "./MeetingVotesTable";

export default {
  component: MeetingVotesTable,
  title: "Library/Tables/Meeting Votes Table",
} as Meta;

const Template: Story<MeetingVotesTableProps> = (args) => <MeetingVotesTable {...args} />;

const persons = ["Alice", "Bob", "Charlie", "Denise", "Elton", "Floyd", "Gregory", "Haley", "Ivan"];
const voteDecisions = Object.values(VOTE_DECISION);
const councilDecisions = Object.values(EVENT_MINUTES_ITEM_DECISION);

const generateCouncilDecision = () =>
  councilDecisions[Math.floor(Math.random() * councilDecisions.length)];
const generateVotes = () => {
  return persons.map((person) => {
    return {
      name: person,
      personId: `${person}-id`,
      decision: voteDecisions[Math.floor(Math.random() * voteDecisions.length)],
      id: `${person}-vote`,
    };
  });
};

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
      council_decision: generateCouncilDecision(),
      votes: generateVotes(),
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
      council_decision: generateCouncilDecision(),
      votes: generateVotes(),
    },
    {
      matter: {
        id: "example-legislation-id",
        description: "A description of the legislation",
        name: "IRC 200",
      },
      date: new Date(),
      council_decision: generateCouncilDecision(),
      votes: generateVotes(),
    },
    { broken: "simulating a broken row due to missing or malformed data" },
    {
      matter: {
        id: "example-legislation-id",
        description: "A description of the legislation",
        name: "IRC 201",
      },
      date: new Date(),
      council_decision: generateCouncilDecision(),
      votes: generateVotes(),
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
      council_decision: generateCouncilDecision(),
      votes: generateVotes(),
    },
    {
      matter: {
        id: "example-legislation-id",
        description: "A description of the legislation",
        name: "IRC 200",
      },
      date: new Date(),
      council_decision: generateCouncilDecision(),
      votes: generateVotes(),
    },
    {
      matter: {
        id: "example-legislation-id",
        description: "A description of the legislation",
        name: "IRC 290",
      },
      date: new Date(),
      council_decision: generateCouncilDecision(),
      votes: generateVotes(),
    },
    {
      matter: {
        id: "example-legislation-id",
        description: "A description of the legislation",
        name: "IRC 201",
      },
      date: new Date(),
      council_decision: generateCouncilDecision(),
      votes: generateVotes(),
    },
  ],
};
