import React from "react";
import { addDecorator } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { themes } from "@storybook/theming";
import "semantic-ui-css/semantic.min.css";

addDecorator(withInfo);

export const decorators = [
  (Story) => (
    <div style={{ margin: "1rem" }}>
      <Story />
    </div>
  ),
];

export const parameters = {
  options: {
    storySort: {
      order: ["Getting Started", "Library"],
    },
  },
  docs: {
    theme: themes.dark,
  },
  backgrounds: {
    default: "light",
    values: [
      {
        name: "light",
        value: "#f9f9f9",
      },
      {
        name: "grey",
        value: "#929396",
      },
      {
        name: "dark",
        value: "#333",
      },
    ],
  },
};
