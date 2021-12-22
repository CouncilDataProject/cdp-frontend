import styled from "@emotion/styled";

import { screenWidths } from "../../styles/mediaBreakpoints";

/**A container of the show more cards button */
const ShowMoreCards = styled.div<{ isVisible: boolean }>((props) => ({
  visibility: props.isVisible ? "visible" : "hidden",
  "& > button": {
    width: "100%",
  },
  "& .ui.loader": {
    marginLeft: 16,
  },
  [`@media (min-width:${screenWidths.tablet})`]: {
    "& > button": {
      width: "auto",
    },
  },
}));

export default ShowMoreCards;
