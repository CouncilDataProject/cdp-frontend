import React from "react";

import { Story, Meta } from "@storybook/react";

import {
  basicIndexMatterGram,
  rentBasicMatterGram,
} from "../../../stories/model-mocks/indexedMatterGram";
import {
  adoptedMatterStatus,
  rejectedMatterStatus,
  inProgressMatterStatus,
  longTitleMatterStatus,
} from "../../../stories/model-mocks/matterStatus";

import LegislationIntroduction, { LegislationIntroductionProps } from "./LegislationIntroduction";

export default {
  component: LegislationIntroduction,
  title: "Library/Details/Legislation/Introduction",
} as Meta;

const approvalProps: LegislationIntroductionProps = {
  matterStatus: adoptedMatterStatus,
  indexedMatterGrams: [basicIndexMatterGram, rentBasicMatterGram],
};

const rejectedProps: LegislationIntroductionProps = {
  matterStatus: rejectedMatterStatus,
  indexedMatterGrams: [basicIndexMatterGram, rentBasicMatterGram],
};

const inProgressProps: LegislationIntroductionProps = {
  matterStatus: inProgressMatterStatus,
  indexedMatterGrams: [basicIndexMatterGram, rentBasicMatterGram],
};

const longTitleProps: LegislationIntroductionProps = {
  matterStatus: longTitleMatterStatus,
  indexedMatterGrams: [basicIndexMatterGram, rentBasicMatterGram],
};

const Template: Story<LegislationIntroductionProps> = (args) => (
  <LegislationIntroduction {...args} />
);

export const approvalStory = Template.bind({});
approvalStory.args = approvalProps;

export const rejectedStory = Template.bind({});
rejectedStory.args = rejectedProps;

export const inProgressStory = Template.bind({});
inProgressStory.args = inProgressProps;

export const longTitleStory = Template.bind({});
longTitleStory.args = longTitleProps;
