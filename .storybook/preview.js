import React from "react";

import { addDecorator } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { withInfo } from "@storybook/addon-info";
import "semantic-ui-css/semantic.min.css";
import { Segment } from "semantic-ui-react";

addDecorator(withInfo);
addDecorator(withA11y);

// Wrap a simple container around all stories.
addDecorator((storyFn) => (
  <Segment>{storyFn()}</Segment>
));
