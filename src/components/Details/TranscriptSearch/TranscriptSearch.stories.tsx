/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";

import { initialFetchDataState } from "../../../containers/FetchDataContainer/useFetchData";

import TranscriptSearch, { TranscriptSearchProps } from "./TranscriptSearch";

export default {
  component: TranscriptSearch,
  title: "Library/Details/Transcript Search",
  decorators: [
    (Story) => (
      <div style={{ height: 600 }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: Story<TranscriptSearchProps> = (args) => <TranscriptSearch {...args} />;

export const Default = Template.bind({});
Default.args = {
  searchQuery: "sentence",
  sentences: {
    ...initialFetchDataState,
    data: [
      {
        session_index: 0,
        index: 0,
        start_time: 1.5,
        text: "This is a sentence.",
        speaker_index: 0,
        speaker_name: "Lisa Herbold",
        speaker_id: "lisa-herbold",
        speaker_pictureSrc:
          "https://www.seattle.gov/images/Council/Members/Herbold/Herbold_225x225.jpg",
      },
      {
        session_index: 0,
        index: 1,
        start_time: 2,
        text: "This is another sentence.",
        speaker_name: "Unknown",
        speaker_index: 1,
      },
    ],
  },
  jumpToVideoClip: (sessionIndex, startTime) => action("jump to video clip"),
  jumpToTranscript: (sentenceIndex) => action("jump to transcript"),
};

export const manySentences = Template.bind({});
manySentences.args = {
  searchQuery: "sentence",
  sentences: {
    ...initialFetchDataState,
    data: Array.from({ length: 200 }).map((_, i) => ({
      session_index: 0,
      index: i,
      start_time: i,
      text: `This is a sentence ${i}.`,
      speaker_name: "Lisa Herbold",
      speaker_id: "lisa-herbold",
      speaker_index: 0,
      speaker_pictureSrc:
        "https://www.seattle.gov/images/Council/Members/Herbold/Herbold_225x225.jpg",
    })),
  },
  jumpToVideoClip: (sessionIndex, startTime) => action("jump to video clip"),
  jumpToTranscript: (sentenceIndex) => action("jump to transcript"),
};
