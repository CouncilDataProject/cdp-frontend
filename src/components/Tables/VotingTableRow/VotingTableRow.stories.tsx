import React from "react";
import { Story, Meta } from "@storybook/react";

import VotingTableRow, { VotingTableRowProps } from "./VotingTableRow";
import { VOTE_DECISION, EVENT_MINUTES_ITEM_DECISION } from "../../../models/constants";

export default {
  component: VotingTableRow,
  title: "Library/Tables/Rows",
} as Meta;

const Template: Story<VotingTableRowProps> = (args) => <VotingTableRow {...args} />;

export const SingleRow = Template.bind({});
SingleRow.args = {
  legislationName: "Example Legislation Name",
  legislationLink: "https://www.google.com",
  index: 0,
  voteDecision: VOTE_DECISION.REJECT,
  councilDecision: EVENT_MINUTES_ITEM_DECISION.PASSED,
  legislationTags: ["bike", "example", "lanes", "rental"],
  meetingDate: new Date(),
  meetingLink: "https://www.google.com",
  committeeName: "Example Committee",
  columnNames: ["Legislation", "Alice's Vote", "Council Decision", "Meeting"],
  columnDistribution: ["30%", "15%", "20%", "35%"],
};
