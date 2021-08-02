import React from "react";
import { Story, Meta } from "@storybook/react";

import EventVideo, { EventVideoProps } from "./EventVideo";

export default {
  component: EventVideo,
  title: "Library/Details/Event Video",
} as Meta;

const Template: Story<EventVideoProps> = (args) => <EventVideo {...args} />;

export const Default = Template.bind({});
Default.args = {
  uri: "https://video.seattle.gov/media/council/council_113020_2022091V.mp4",
};
