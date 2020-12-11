import React from "react";
import { addDecorator } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import { themes } from "@storybook/theming";

addDecorator(withInfo);
addDecorator(withA11y);
addDecorator(withKnobs);

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
