import React from "react";
import { Story, Meta } from "@storybook/react";

import LocalizationWidget from "./LocalizationWidget";

export default {
  component: LocalizationWidget,
  title: "Library/Layout/Localization Widget",
} as Meta;

const Template: Story = (args) => <LocalizationWidget {...args} />;

export const localizationWidget = Template.bind({});
