import React from "react";

import { Story, Meta } from "@storybook/react";

import LegislationOverview, { LegislationOverviewProps } from "./LegislationOverview";
import { basicEvent } from "../../../stories/model-mocks/event";
import {
  adoptedMatterStatus,
  rejectedMatterStatus,
  inProgressMatterStatus,
} from "../../../stories/model-mocks/matterStatus";

import { basicPerson } from "../../../stories/model-mocks/person";

const basicDocument = {
  name: "Legislation Summary",
  url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
};

export default {
  component: LegislationOverview,
  title: "Library/Details/Legislation/Overview",
} as Meta;

const Template: Story<LegislationOverviewProps> = (args) => <LegislationOverview {...args} />;

export const adopted = Template.bind({});
adopted.args = {
  matterStatus: adoptedMatterStatus,
  event: basicEvent,
  sponsors: [
    basicPerson,
    { ...basicPerson, id: `${basicPerson.id}-2`, name: `${basicPerson.name} 2` },
  ],
  document: basicDocument,
};

export const rejected = Template.bind({});
rejected.args = {
  matterStatus: rejectedMatterStatus,
  event: basicEvent,
  sponsors: [basicPerson],
  document: basicDocument,
};

export const inProgress = Template.bind({});
inProgress.args = {
  matterStatus: inProgressMatterStatus,
  event: basicEvent,
  sponsors: [basicPerson],
  document: basicDocument,
};
