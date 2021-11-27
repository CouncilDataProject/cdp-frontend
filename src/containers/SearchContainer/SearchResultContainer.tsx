import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import { CardsContainer } from "../CardsContainer";
import { Card } from "../CardsContainer/types";
import { SEARCH_TYPE } from "../../pages/SearchPage/types";

import { screenWidths } from "../../styles/mediaBreakpoints";
import { fontSizes } from "../../styles/fonts";

const Title = styled.div({
  marginBottom: 16,
  display: "flex",
  flexDirection: "column",
  [`@media (min-width:${screenWidths.tablet})`]: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  "& > h1": {
    marginBottom: 0,
  },
  "& > :last-child": {
    fontSize: fontSizes.font_size_6,
  },
});

export interface SearchResultContainerProps {
  query: string;
  isVisible: boolean;
  searchType: SEARCH_TYPE;
  total: number;
  cards: Card[];
}

const SearchResultContainer: FC<SearchResultContainerProps> = ({
  query,
  isVisible,
  searchType,
  total,
  cards,
}: SearchResultContainerProps) => {
  const queryParams = `?q=${query.trim().replace(/\s+/g, "+")}`;
  if (!isVisible) {
    return null;
  }

  return (
    <div>
      <Title>
        <h1 className="mzp-u-title-xs">{`${searchType[0].toUpperCase()}${searchType.slice(1)}`}</h1>
        {total > 0 ? (
          <Link
            to={{
              pathname: `/${searchType}/search`,
              search: queryParams,
            }}
          >{`View all ${total} ${searchType} search results`}</Link>
        ) : (
          <p>{`No ${searchType} found.`}</p>
        )}
      </Title>
      <CardsContainer cards={cards} />
    </div>
  );
};

export default SearchResultContainer;
