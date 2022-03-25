import React from "react";
import { Story, Meta } from "@storybook/react";

import MeetingCard, { MeetingCardProps } from "./MeetingCard";

import { eventWithRealImages } from "../../../stories/model-mocks/event";

export default {
  component: MeetingCard,
  title: "Library/Cards/Event",
} as Meta;

const Template: Story<MeetingCardProps> = (args) => <MeetingCard {...args} />;

export const meeting = Template.bind({});
meeting.args = {
  event: eventWithRealImages,
  tags: ["bike", "adu", "accessories", "rental"],
};

export const meetingSearchResult = Template.bind({});
meetingSearchResult.args = {
  event: eventWithRealImages,
  tags: ["bike", "adu", "accessories", "rental"],
  excerpt:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum, lorem eget vestibulum tincidunt, augue eros gravida lectus, ut efficitur neque nisi eu metus.",
  gram: "ipsum",
};
