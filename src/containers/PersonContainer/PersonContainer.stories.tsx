import React from "react";
import { Story, Meta } from "@storybook/react";
import {
  ten_years_councilmember,
  expired_chair,
  recent_chair,
} from "../../stories/model-mocks/role";
import { basicPerson } from "../../stories/model-mocks/person";
import { mockImageUrl } from "../../stories/model-mocks/imageUrl";
import PersonContainer, { PersonContainerProps } from "./PersonContainer";

export default {
  component: PersonContainer,
  title: "Library/Containers/Person",
} as Meta;

import { initialFetchDataState } from "../FetchDataContainer/useFetchData";

const Template: Story<PersonContainerProps> = (args) => <PersonContainer {...args} />;

export const personWithoutVotes = Template.bind({});
personWithoutVotes.args = {
  person: basicPerson,
  councilMemberRoles: [ten_years_councilmember],
  roles: [expired_chair, recent_chair],
  personPictureSrc: { ...initialFetchDataState, data: mockImageUrl(400, 400, "Avatar Face") },
  seatPictureSrc: { ...initialFetchDataState, data: mockImageUrl(1400, 800, "Electoral Seat") },
};

export const standardLayout = Template.bind({});
standardLayout.args = {
  person: basicPerson,
  councilMemberRoles: [ten_years_councilmember],
  roles: [expired_chair, recent_chair],
  personPictureSrc: { ...initialFetchDataState, data: mockImageUrl(400, 400, "Avatar Face") },
  seatPictureSrc: { ...initialFetchDataState, data: mockImageUrl(1400, 800, "Electoral Seat") },
};
