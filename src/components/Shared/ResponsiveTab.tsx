import styled from "@emotion/styled";

import { Tab } from "semantic-ui-react";

interface ResponsiveTabProps {
  breakpoint?: string;
}

export default styled(Tab)<ResponsiveTabProps>((props) => ({
  "& > .ui.tab": {
    // Get rid of margin and padding on the tabs
    margin: 0,
    padding: 0,
  },
  // Tab menu items given the breakpoint
  [`@media (max-width:${props.breakpoint})`]: {
    "& > .ui.menu": {
      // Vertical tab menu instead of horizontal tab menu
      flexDirection: "column",
    },
    "& > .ui.secondary.pointing.menu > a.item": {
      // Align menu items at start, instead of end
      alignSelf: "flex-start",
      // Remove border-bottom style
      borderBottomStyle: "none",
    },
    "& > .ui.secondary.pointing.menu > a.active.item": {
      // Add border-left when menu item is active
      borderLeft: "2px solid",
    },
  },
}));
