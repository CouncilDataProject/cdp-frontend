import React from "react";
import { Story, Meta } from "@storybook/react";
import { basicPerson } from "../../stories/model-mocks/person";
import { Biography, BiographyProps } from "./Biography";
import {
  ten_years_councilmember,
  expired_chair,
  recent_chair,
  varietyRoles,
} from "../../stories/model-mocks/role";
import {
  populatedMatterMatterSponsor,
  basicMatterSponsor,
} from "../../stories/model-mocks/matterSponsor";

export default {
  component: Biography,
  title: "Library/Containers/Person/Biography",
} as Meta;

const Template: Story<BiographyProps> = (args) => <Biography {...args} />;

export const noExtraRolesBio = Template.bind({});
noExtraRolesBio.args = {
  person: basicPerson,
  councilMemberRoles: [ten_years_councilmember],
  roles: [expired_chair, recent_chair],
  mattersSponsored: [populatedMatterMatterSponsor, basicMatterSponsor],
};

export const extensiveRolesBio = Template.bind({});
extensiveRolesBio.args = {
  person: basicPerson,
  councilMemberRoles: [ten_years_councilmember],
  roles: varietyRoles,
  mattersSponsored: [populatedMatterMatterSponsor, basicMatterSponsor],
};
