import React from "react";
import { Story, Meta } from "@storybook/react";
import {
  ten_years_councilmember,
  expired_chair,
  recent_chair,
} from "../../stories/model-mocks/role";
import {
  basicMatterSponsor,
  populatedMatterMatterSponsor,
} from "../../stories/model-mocks/matterSponsor";
import { basicPerson } from "../../stories/model-mocks/person";
import { vote } from "../../stories/model-mocks/vote";
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
  votes: { ...initialFetchDataState, data: [] },
  councilMemberRoles: [ten_years_councilmember],
  roles: [expired_chair, recent_chair],
  mattersSponsored: {
    ...initialFetchDataState,
    data: [basicMatterSponsor, populatedMatterMatterSponsor],
  },
  personPictureSrc: { ...initialFetchDataState, data: mockImageUrl(400, 400, "Avatar Face") },
  seatPictureSrc: { ...initialFetchDataState, data: mockImageUrl(1400, 800, "Electoral Seat") },
};

export const standardLayout = Template.bind({});
standardLayout.args = {
  person: basicPerson,
  councilMemberRoles: [ten_years_councilmember],
  roles: [expired_chair, recent_chair],
  mattersSponsored: { ...initialFetchDataState, data: [populatedMatterMatterSponsor] },
  votes: { ...initialFetchDataState, data: [vote] },
  personPictureSrc: { ...initialFetchDataState, data: mockImageUrl(400, 400, "Avatar Face") },
  seatPictureSrc: { ...initialFetchDataState, data: mockImageUrl(1400, 800, "Electoral Seat") },
};
