import styled from "@emotion/styled";

import { screenWidths } from "../../../styles/mediaBreakpoints";

const FiltersContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  [`@media (min-width:${screenWidths.tablet})`]: {
    flexDirection: "row",
    flexWrap: "wrap",
    "& > div:last-of-type:not(:first-of-type), & > button:last-of-type": {
      marginLeft: "auto",
    },
  },
});

export default FiltersContainer;
