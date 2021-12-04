import React from "react";
import { Story, Meta } from "@storybook/react";

import MeetingCard, { MeetingCardProps } from "./MeetingCard";

export default {
  component: MeetingCard,
  title: "Library/Cards/Event",
} as Meta;

const Template: Story<MeetingCardProps> = (args) => <MeetingCard {...args} />;

export const meeting = Template.bind({});
meeting.args = {
  staticImgSrc: "https://mynorthwest.com/wp-content/uploads/2016/05/arena2-1.jpg",
  hoverImgSrc: "https://mynorthwest.com/wp-content/uploads/2016/05/arena2-1.jpg",
  imgAlt: "Citizen presenting at a select budget committee meeting",
  meetingDate: "June 9th, 2020",
  committee: "Select Budget",
  tags: ["bike", "adu", "accessories", "rental"],
};

export const meetingSearchResult = Template.bind({});
meetingSearchResult.args = {
  staticImgSrc: "https://mynorthwest.com/wp-content/uploads/2016/05/arena2-1.jpg",
  hoverImgSrc: "https://mynorthwest.com/wp-content/uploads/2016/05/arena2-1.jpg",
  imgAlt: "Citizen presenting at a select budget committee meeting",
  meetingDate: "June 9th, 2020",
  committee: "Select Budget",
  tags: ["bike", "adu", "accessories", "rental"],
  excerpt:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce interdum, lorem eget vestibulum tincidunt, augue eros gravida lectus, ut efficitur neque nisi eu metus.",
  gram: "ipsum",
};
