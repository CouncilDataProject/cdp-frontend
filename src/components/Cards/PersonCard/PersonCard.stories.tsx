import React from "react";
import { Story, Meta } from "@storybook/react";

import PersonCard, { PersonCardProps } from "./PersonCard";

export default {
  component: PersonCard,
  title: "Library/Cards/Person",
} as Meta;

const Template: Story<PersonCardProps> = (args) => <PersonCard {...args} />;

export const withSeatPicture = Template.bind({});
withSeatPicture.args = {
  personName: "Lisa Herbold",
  personPictureSrc: "https://www.seattle.gov/images/Council/Members/Herbold/Herbold_225x225.jpg",
  personIsActive: true,
  seatName: "District 1",
  seatElectoralArea: "West Seattle / South Park",
  seatPictureSrc:
    "https://uploads.visitseattle.org/2018/06/20095301/VSMap_Puget-Sound-e1529519202971-450x300.jpg",
  chairedBodyNames: "Civil Rights, Utilities, Economic Development, and Arts Committee",
  tenureStatus: "2nd term",
  billsSponsored: 15,
};

export const withoutSeatPicture = Template.bind({});
withoutSeatPicture.args = {
  personName: "Lisa Herbold",
  personPictureSrc: "https://www.seattle.gov/images/Council/Members/Herbold/Herbold_225x225.jpg",
  personIsActive: true,
  seatName: "District 1",
  seatElectoralArea: "West Seattle / South Park",
  chairedBodyNames: "Civil Rights, Utilities, Economic Development, and Arts Committee",
  tenureStatus: "2nd term",
  billsSponsored: 15,
};
