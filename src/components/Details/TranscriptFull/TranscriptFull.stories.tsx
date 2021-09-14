import React, { createRef } from "react";

import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";

import TranscriptFull, { TranscriptFullProps } from "./TranscriptFull";
import { TranscriptItemRef } from "../TranscriptItem/TranscriptItem";

export default {
  component: TranscriptFull,
  title: "Library/Details/Transcript Full",
} as Meta;

const Template: Story<TranscriptFullProps> = (args) => <TranscriptFull {...args} />;

export const Default = Template.bind({});
Default.args = {
  sentences: Array.from({ length: 20 }).map((_, i) => ({
    session_index: 0,
    index: i,
    start_time: i,
    text: `This is a sentence${i}.`,
    speaker_index: i,
    speaker_name: "Lisa Herbold",
    speaker_id: "lisa-herbold",
    speaker_pictureSrc:
      "https://www.seattle.gov/images/Council/Members/Herbold/Herbold_225x225.jpg",
  })),
  transcriptItemsRefs: Array.from({ length: 20 }).map(() => createRef<TranscriptItemRef>()),
  jumpToVideoClip: (_, startTime) => action(`jump to video clip at ${startTime}`),
};
