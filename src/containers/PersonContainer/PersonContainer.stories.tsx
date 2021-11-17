import React from "react";
import { Story, Meta } from "@storybook/react";
import {
  ten_years_councilmember,
  expired_chair,
  recent_chair,
} from "../../stories/model-mocks/role";
import { basicMatterSponsor } from "../../stories/model-mocks/matterSponsor";
import { basicPerson } from "../../stories/model-mocks/person";
import { vote } from "../../stories/model-mocks/vote";
import PersonContainer, { PersonContainerProps } from "./PersonContainer";

export default {
  component: PersonContainer,
  title: "Library/Containers/Person",
} as Meta;

const Template: Story<PersonContainerProps> = (args) => <PersonContainer {...args} />;

export const personWithoutVotes = Template.bind({});
personWithoutVotes.args = {
  person: basicPerson,
  roles: [ten_years_councilmember, expired_chair, recent_chair],
  mattersSponsored: [basicMatterSponsor],
};

export const standardLayout = Template.bind({});
standardLayout.args = {
  person: basicPerson,
  roles: [ten_years_councilmember, expired_chair, recent_chair],
  mattersSponsored: [basicMatterSponsor],
  votes: [vote],
};
