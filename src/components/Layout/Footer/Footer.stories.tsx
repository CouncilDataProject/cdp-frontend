import React from "react";
import { Story, Meta } from "@storybook/react";

import Footer, { FooterProps } from "./Footer";

export default {
  component: Footer,
  title: "Library/Layout/Footer",
} as Meta;

const Template: Story<FooterProps> = (args) => <Footer {...args} />;

export const footer = Template.bind({});
footer.args = {
  footerLinksSections: [
    {
      links: [
        {
          label: "First",
          url: "http://google.com",
        },
        { label: "Second", url: "http://google.com" },
      ],
      footerLinksSectionName: "First Section",
    },
  ],
};
