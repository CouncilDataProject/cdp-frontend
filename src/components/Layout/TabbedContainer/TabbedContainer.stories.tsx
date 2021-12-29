import React from "react";
import { Story, Meta } from "@storybook/react";

import { TabbedContainer, TabbedContainerProps } from "./TabbedContainer";

export default {
  component: TabbedContainer,
  title: "Library/Layout/Tabbed Container",
} as Meta;

const Template: Story<TabbedContainerProps> = (args) => <TabbedContainer {...args} />;

export const tabbedContainer = Template.bind({});
tabbedContainer.args = {
  tabLabels: (["Minutes and Documents", "Full Transcript", "Votes"] as unknown) as JSX.Element[],
  children: [
    <p key={1}>Contents of Page 1</p>,
    <p key={2}>Contents of Page 2</p>,
    <p key={3}>Contents of Page 3</p>,
  ],
};
