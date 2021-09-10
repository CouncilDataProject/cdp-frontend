import React from "react";
import { Story, Meta } from "@storybook/react";
import { Timestamp } from "firebase/firestore";

import Event from "../../models/Event";
import Body from "../../models/Body";

import EventContainer, { EventContainerProps } from "./EventContainer";

import { MATTER_STATUS_DECISION, VOTE_DECISION } from "../../constants/ProjectConstants";

export default {
  component: EventContainer,
  title: "Library/Containers/Event",
} as Meta;

const Template: Story<EventContainerProps> = (args) => <EventContainer {...args} />;

export const Default = Template.bind({});
Default.args = {
  event: new Event({
    body_ref: new Body({ name: "City Council" }),
    event_datetime: new Timestamp(1, 1),
  }),
  sessions: [
    {
      video_uri: "https://video.seattle.gov/media/council/council_113020_2022091V.mp4",
      session_index: 1,
      session_datetime: new Date(0),
      sentences: Array.from({ length: 10 }).map((_, i) => ({
        index: i,
        start_time: i,
        text: `This is a sentence${i}.`,
        speaker: {
          index: i,
          name: "Lisa Herbold",
          id: "lisa-herbold",
          pictureSrc: "https://www.seattle.gov/images/Council/Members/Herbold/Herbold_225x225.jpg",
        },
      })),
    },
    {
      video_uri: "https://video.seattle.gov/media/council/econ_090821_2602120V.mp4",
      session_index: 2,
      session_datetime: new Date(3600000),
      sentences: Array.from({ length: 10 }).map((_, i) => ({
        index: 10 + i,
        start_time: i,
        text: `This is a sentence ${10 + i}.`,
        speaker: {
          index: i,
          name: "Lisa Herbold",
          id: "lisa-herbold",
          pictureSrc: "https://www.seattle.gov/images/Council/Members/Herbold/Herbold_225x225.jpg",
        },
      })),
    },
    {
      video_uri: "https://video.seattle.gov/media/council/council_072621_2022159V.mp4",
      session_index: 3,
      session_datetime: new Date(2 * 3600000),
      sentences: Array.from({ length: 10 }).map((_, i) => ({
        index: 20 + i,
        start_time: i,
        text: `This is a sentence ${20 + i}.`,
        speaker: {
          index: i,
          name: "Lisa Herbold",
          id: "lisa-herbold",
          pictureSrc: "https://www.seattle.gov/images/Council/Members/Herbold/Herbold_225x225.jpg",
        },
      })),
    },
  ],
  eventMinutesItems: [
    {
      minutes_item: { name: "test" },
    },
    {
      minutes_item: { name: "test2", description: "test desc", matter: { id: "matter-id" } },
      files: [
        {
          name: "file name",
          uri: "https://www.seattle.gov/images/Council/Members/Herbold/Herbold_225x225.jpg",
        },
      ],
      decision: MATTER_STATUS_DECISION.REJECTED,
      votes: [
        {
          id: "1",
          decision: VOTE_DECISION.APPROVE,
          person: {
            id: "1",
            name: "person name 1",
          },
        },
        {
          id: "2",
          decision: VOTE_DECISION.REJECT,
          person: {
            id: "2",
            name: "person name 2",
          },
        },
        {
          id: "3",
          decision: VOTE_DECISION.REJECT,
          person: {
            id: "3",
            name: "person name 3",
          },
        },
      ],
    },
  ],
};
