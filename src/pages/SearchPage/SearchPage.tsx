import React, { FC, useMemo } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import { SearchContainer } from "../../containers/SearchContainer";
import { SEARCH_TYPE, SearchState } from "./types";

const SearchPage: FC = () => {
  const location = useLocation<SearchState>();
  const searchState = useMemo(() => {
    if (location.state) {
      return location.state;
    }
    const { q } = queryString.parse(location.search);
    return {
      query: (q as string) || "",
      searchTypes: {
        [SEARCH_TYPE.EVENT]: true,
        [SEARCH_TYPE.LEGISLATION]: true,
      },
    };
  }, [location]);

  return <SearchContainer searchState={searchState} />;
};

export default SearchPage;
