import styled from "@emotion/styled";

import { screenWidths } from "../../styles/mediaBreakpoints";

/**A container of an `h1` and a `SearchBar` for pages with title and seach bar. */
const SearchPageTitle = styled.div({
  display: "flex",
  flexDirection: "column",
  rowGap: 32,
  "& > h1, & form, & input": {
    marginBottom: 0,
  },
  "& input": {
    width: "100%",
  },
  [`@media (min-width:${screenWidths.tablet})`]: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    "& input": {
      width: "auto",
    },
  },
});

export default SearchPageTitle;
