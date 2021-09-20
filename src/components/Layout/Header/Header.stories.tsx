import React from "react";
import { Story, Meta } from "@storybook/react";

import Header from "./Header";

export default {
  component: Header,
  title: "Library/Layout/Header",
} as Meta;

const Template: Story = (args) => <Header {...args} />;

export const Default = Template.bind({});
