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
    website: "www.google.com",
    router_string: "test.person",
    is_active: true,
  },

  votes: [
    {
      matter: {
        id: "example-matter-id",
        name: "example-matter-name",
        title: "example-matter-title",
      },
      decision: "Approve",
      in_majority: true,
      event: {
        id: "example-event-id",
        event_datetime: new Date(),
      },
    },
  ],
};
