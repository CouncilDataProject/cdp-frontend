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
    id: "test-id",
    name: "Test Person",
    email: "test-person@test.com",
    phone: "206-867-5309",
    website: "https://www.google.com",
    picture: {
      id: "test-picture-id",
      uri: "https://via.placeholder.com/400x400?text=Avatar+Face",
      name: "test-pic.jpg",
      description: "a populated test pic",
      media_type: "jpeg",
    },
    router_string: "test.person",
    is_active: true,
  },
  votes: [
    {
      id: "vote-1",
      decision: "Approve",
      event_minutes_item: {
        id: "event_minutes_item_test_1",
        decision: "Rejected",
        event_ref: "unpopulated",
        external_source_id: "external_source_id_test",
        index: 0,
        minutes_item_ref: "unpopulated",
      },
      event: {
        id: "event_test_string_1",
        agenda_uri: "agenda uri",
        body: {
          id: "body_test_string_1",
          description: "Test Event Body Description",
          end_datetime: new Date(),
          is_active: false,
          name: "Event Bod 1",
          start_datetime: new Date(),
        },
        event_datetime: new Date(),
      },
      in_majority: true,
      matter: {
        id: "string test matter",
        name: "Test Matter",
        title: "title",
      },
      person: {
        id: "test person",
      },
    },
  ],
};
