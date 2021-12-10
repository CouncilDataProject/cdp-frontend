import React from "react";
import { themes } from "@storybook/theming";
import { StaticRouter } from 'react-router-dom';
import "@councildataproject/cdp-design/dist/images.css";
import "@mozilla-protocol/core/protocol/css/protocol.css";
import "semantic-ui-css/semantic.min.css";

export const decorators = [
  (story) => <StaticRouter location={"http://localhost:6006/?path=/story"} ><div style={{ margin: "1rem" }}>{story()}</div></StaticRouter>
];

export const parameters = {
  options: {
    storySort: {
      order: ["Getting Started", "Library"],
    },
    isToolshown: true,
  },
  docs: {
    theme: themes.light,
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
