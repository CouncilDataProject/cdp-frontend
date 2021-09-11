import styled from "@emotion/styled";

import { Tab } from "semantic-ui-react";
import { fontSizes } from "../../styles/fonts";
import { screenWidths } from "../../styles/mediaBreakpoints";

interface ResponsiveTabProps {
  padding: string;
  breakpoint?: string;
}

export default styled(Tab)<ResponsiveTabProps>((props) => ({
  "& > .ui.tab": {
    // Get rid of margin on the tabs
    margin: 0,
    // Get rid of border on the tabs
    border: 0,
    padding: props.padding,
  },
  [`@media (min-width:${screenWidths.tablet})`]: {
    "& > .ui.menu > a.item": {
      // On tablet or above, increase the font size of menu items
      fontSize: fontSizes.font_size_7,
    },
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
