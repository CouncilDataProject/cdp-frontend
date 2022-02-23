import React, { createRef } from "react";

import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";

import TranscriptFull, { TranscriptFullProps } from "./TranscriptFull";
import { TranscriptItemRef } from "../TranscriptItem/TranscriptItem";

import { mockSentences } from "../../../stories/model-mocks/sentence";

export default {
  component: TranscriptFull,
  title: "Library/Details/Transcript Full",
} as Meta;

const Template: Story<TranscriptFullProps> = (args) => <TranscriptFull {...args} />;

const exampleSentences = mockSentences(2, 10);

export const transcriptFull = Template.bind({});
transcriptFull.args = {
  sentences: exampleSentences,
  transcriptItemsRefs: exampleSentences.map(() => createRef<TranscriptItemRef>()),
  jumpToVideoClip: (_, startTime) => action(`jump to video clip at ${startTime}`),
};
