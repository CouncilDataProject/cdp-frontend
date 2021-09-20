import React from "react";
import { Story, Meta } from "@storybook/react";

import PersonContainer, { PersonContainerProps } from "./PersonContainer";

export default {
  component: PersonContainer,
  title: "Library/Containers/Person",
} as Meta;

const Template: Story<PersonContainerProps> = (args) => <PersonContainer {...args} />;

export const Default = Template.bind({});
Default.args = {
  person: {
    name: "Person",
  },
};
