import React from "react";

import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";

import TranscriptItem, { TranscriptItemProps } from "./TranscriptItem";

export default {
  component: TranscriptItem,
  title: "Library/Details/Transcript Item",
} as Meta;

const Template: Story<TranscriptItemProps> = (args) => <TranscriptItem {...args} />;

export const withPictureSrc = Template.bind({});
withPictureSrc.args = {
  sessionIndex: 0,
  speakerId: "speaker-id-1",
  speakerName: "Lisa Herbold",
  text:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  startTime: "05:00:45",
  speakerPictureSrc: "https://www.seattle.gov/images/Council/Members/Herbold/Herbold_225x225.jpg",
  handleJumpToTranscript: action("handleJumpToTranscript"),
};

export const withoutPictureSrc = Template.bind({});
withoutPictureSrc.args = {
  sessionIndex: 0,
  speakerId: "speaker-id-1",
  speakerName: "Lisa Herbold",
  text:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  startTime: "05:00:45",
  handleJumpToTranscript: action("handleJumpToTranscript"),
};

export const withSearchQuery = Template.bind({});
withSearchQuery.args = {
  sessionIndex: 0,
  speakerId: "speaker-id-1",
  speakerName: "Lisa Herbold",
  text:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  startTime: "05:00:45",
  speakerPictureSrc: "https://www.seattle.gov/images/Council/Members/Herbold/Herbold_225x225.jpg",
  searchQuery: "ipsum dolor sit",
  handleJumpToTranscript: action("handleJumpToTranscript"),
};
