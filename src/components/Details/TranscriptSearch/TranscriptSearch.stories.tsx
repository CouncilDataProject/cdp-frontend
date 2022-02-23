/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";

import { initialFetchDataState } from "../../../containers/FetchDataContainer/useFetchData";

import TranscriptSearch, { TranscriptSearchProps } from "./TranscriptSearch";

import { mockSentences } from "../../../stories/model-mocks/sentence";

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
    data: mockSentences(1, 2),
  },
  jumpToVideoClip: (sessionIndex, startTime) => action("jump to video clip"),
  jumpToTranscript: (sentenceIndex) => action("jump to transcript"),
};

export const manySentences = Template.bind({});
manySentences.args = {
  searchQuery: "sentence",
  sentences: {
    ...initialFetchDataState,
    data: mockSentences(2, 100),
  },
  jumpToVideoClip: (sessionIndex, startTime) => action("jump to video clip"),
  jumpToTranscript: (sentenceIndex) => action("jump to transcript"),
};
