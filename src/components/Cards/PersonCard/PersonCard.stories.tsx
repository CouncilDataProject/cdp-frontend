import React from "react";
import { Story, Meta } from "@storybook/react";

import PersonCard, { PersonCardProps } from "./PersonCard";
import { realPerson } from "../../../stories/model-mocks/person";
import { realSeat, realSeatNoImage } from "../../../stories/model-mocks/seat";

export default {
  component: PersonCard,
  title: "Library/Cards/Person",
} as Meta;

const Template: Story<PersonCardProps> = (args) => <PersonCard {...args} />;

export const withSeatPicture = Template.bind({});
withSeatPicture.args = {
  person: realPerson,
  seat: realSeat,
};

export const withoutSeatPicture = Template.bind({});
withoutSeatPicture.args = {
  person: realPerson,
  seat: realSeatNoImage,
};
