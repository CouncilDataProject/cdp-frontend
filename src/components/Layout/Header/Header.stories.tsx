import React from "react";
import { Story, Meta } from "@storybook/react";

import Header, { HeaderProps } from "./Header";

export default {
  component: Header,
  title: "Library/Layout/Header",
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  municipalityName: "Test deployment",
};
