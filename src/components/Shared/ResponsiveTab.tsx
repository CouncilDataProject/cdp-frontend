import styled from "@emotion/styled";

import { Tab } from "semantic-ui-react";

import { screenWidths } from "../../styles/mediaBreakpoints";

export default styled(Tab)({
  // Tab menu items on mobile
  [`@media (max-width:${screenWidths.largeMobile})`]: {
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
});
