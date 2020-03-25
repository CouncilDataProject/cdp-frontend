import React from "react";

import { addDecorator } from "@storybook/react";
import { withInfo } from '@storybook/addon-info';
import "semantic-ui-css/semantic.min.css";
import { Segment } from "semantic-ui-react";

addDecorator(withInfo);

// Wrap a simple container around all stories.
addDecorator((storyFn) => (
  <Segment>{storyFn()}</Segment>
));
