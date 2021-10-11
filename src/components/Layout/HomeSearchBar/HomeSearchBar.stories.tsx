import React from "react";
import { Story, Meta } from "@storybook/react";

import HomeSearchBar from "./HomeSearchBar";

export default {
  component: HomeSearchBar,
  title: "Library/Layout/Home Search Bar",
} as Meta;

const Template: Story = (args) => <HomeSearchBar {...args} />;

export const homeSearchBar = Template.bind({});
