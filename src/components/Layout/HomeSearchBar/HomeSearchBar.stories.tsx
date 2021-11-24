import React from "react";
import { Story, Meta } from "@storybook/react";

import HomeSearchBar, { HomeSearchBarProps } from "./HomeSearchBar";

export default {
  component: HomeSearchBar,
  title: "Library/Layout/Home Search Bar",
} as Meta;

const Template: Story<HomeSearchBarProps> = (args) => <HomeSearchBar {...args} />;

export const homeSearchBar = Template.bind({});
