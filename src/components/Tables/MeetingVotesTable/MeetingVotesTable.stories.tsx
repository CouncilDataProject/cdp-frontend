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

export const VoteOnLegislationWithLongDescription = Template.bind({});
VoteOnLegislationWithLongDescription.args = {
  votesPage: [
    {
      matter: {
        id: "example-legislation-id",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna nec tincidunt praesent semper feugiat nibh. Morbi non arcu risus quis varius quam quisque. Posuere morbi leo urna molestie at elementum eu. Cras adipiscing enim eu turpis egestas pretium aenean pharetra magna. Urna molestie at elementum eu facilisis sed odio. Odio tempor orci dapibus ultrices in iaculis nunc. Sed risus ultricies tristique nulla aliquet enim. Et leo duis ut diam quam nulla porttitor massa id. Lorem ipsum dolor sit amet consectetur. Imperdiet proin fermentum leo vel orci porta non. Dui sapien eget mi proin sed libero enim sed. Amet purus gravida quis blandit turpis cursus. Cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl. Aliquam sem et tortor consequat. Nunc pulvinar sapien et ligula ullamcorper. Ut sem viverra aliquet eget sit amet tellus. A diam sollicitudin tempor id. Id semper risus in hendrerit. Elementum nibh tellus molestie nunc non blandit massa enim nec. Mattis enim ut tellus elementum sagittis. Vitae suscipit tellus mauris a diam maecenas sed. Sem viverra aliquet eget sit. Amet nulla facilisi morbi tempus iaculis urna id. Id interdum velit laoreet id donec ultrices tincidunt arcu. Fermentum iaculis eu non diam. Dis parturient montes nascetur ridiculus mus mauris. Pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Vulputate odio ut enim blandit volutpat maecenas volutpat blandit aliquam. Tortor at auctor urna nunc id cursus metus aliquam. Sed vulputate mi sit amet mauris commodo quis imperdiet massa. Rhoncus urna neque viverra justo nec ultrices dui. Senectus et netus et malesuada. Nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est. Cursus eget nunc scelerisque viverra mauris in aliquam sem. Vel facilisis volutpat est velit. Venenatis tellus in metus vulputate eu scelerisque felis. Nec ultrices dui sapien eget. Vitae justo eget magna fermentum iaculis eu non diam phasellus. Risus at ultrices mi tempus imperdiet nulla malesuada. Ut sem nulla pharetra diam sit amet nisl suscipit adipiscing. Aliquet enim tortor at auctor urna nunc id cursus. Posuere sollicitudin aliquam ultrices sagittis orci a.",
        name: "IRC 8",
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
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
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
