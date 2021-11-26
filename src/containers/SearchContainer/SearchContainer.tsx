import React, { FC, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import { Loader } from "semantic-ui-react";

import { useAppConfigContext } from "../../app";

import { MeetingCard } from "../../components/Cards/MeetingCard";
import { FilterPopup } from "../../components/Filters/FilterPopup";
import useFilter from "../../components/Filters/useFilter";
import { SelectTextFilterOptions } from "../../components/Filters/SelectTextFilterOptions";
import { getSearchTypeText, searchTypeOptions } from "../../components/Layout/HomeSearchBar";
import FetchCardsStatus from "../../components/Shared/FetchCardsStatus";
import PageContainer from "../../components/Shared/PageContainer";
import SearchBar from "../../components/Shared/SearchBar";
import SearchPageTitle from "../../components/Shared/SearchPageTitle";
import SearchResultContainer from "./SearchResultContainer";
import { SearchContainerData } from "./types";
import useFetchSearchResult from "./useFetchSearchResult";
import { SEARCH_TYPE } from "../../pages/SearchPage/types";

import { strings } from "../../assets/LocalizedStrings";
import { screenWidths } from "../../styles/mediaBreakpoints";

const SearchFilter = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 8,
  [`@media (min-width:${screenWidths.tablet})`]: {
    gridTemplateColumns: "auto 1fr",
  },
});

const SearchContainer: FC<SearchContainerData> = ({ searchState }: SearchContainerData) => {
  const { firebaseConfig } = useAppConfigContext();

  const [query, setQuery] = useState(searchState.query);
  const searchTypeFilter = useFilter<boolean>({
    name: "Search Type",
    initialState: searchState.searchTypes,
    defaultDataValue: false,
    textRepFunction: getSearchTypeText,
    isRequired: true,
  });
  const [state, dispatch] = useFetchSearchResult(
    firebaseConfig,
    {
      searchResult: {
        event: {
          events: [],
          total: 0,
        },
      },
      fetchSearchResult: true,
      error: null,
    },
    query,
    searchTypeFilter.state as Record<SEARCH_TYPE, boolean>
  );

  /* useEffect(() => {
    dispatch({ type: "FETCH_SEARCH_RESULT" });
  }, [dispatch]); */

  const location = useLocation();
  const handleSearch = () => {
    const queryParams = `?q=${query.trim().replace(/\s+/g, "+")}`;
    // # is because the react-router-dom BrowserRouter is used
    history.pushState({}, "", `#${location.pathname}${queryParams}`);
    dispatch({ type: "FETCH_SEARCH_RESULT" });
  };

  const eventCards = useMemo(() => {
    return state.searchResult.event.events.map((renderableEvent) => {
      const eventDateTimeStr = renderableEvent.event.event_datetime?.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }) as string;
      return {
        link: `/${SEARCH_TYPE.EVENT}/${renderableEvent.event.id}`,
        jsx: (
          <MeetingCard
            staticImgSrc={renderableEvent.staticThumbnailURL}
            hoverImgSrc={renderableEvent.hoverThumbnailURL}
            imgAlt={`${renderableEvent.event.body?.name} - ${eventDateTimeStr}`}
            meetingDate={eventDateTimeStr}
            committee={renderableEvent.event.body?.name as string}
            tags={renderableEvent.keyGrams}
            excerpt={renderableEvent.selectedContextSpan}
          />
        ),
      };
    });
  }, [state.searchResult.event]);

  //TODO: add the legislation cards

  return (
    <PageContainer>
      <SearchPageTitle>
        <h1 className="mzp-u-title-xs">Search Results</h1>
        <SearchBar
          placeholder={strings.search_topic_placeholder}
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
        />
      </SearchPageTitle>
      <SearchFilter>
        <div>
          <FilterPopup
            name={searchTypeFilter.name}
            clear={searchTypeFilter.clear}
            getTextRep={searchTypeFilter.getTextRep}
            isActive={searchTypeFilter.isActive}
            popupIsOpen={searchTypeFilter.popupIsOpen}
            setPopupIsOpen={searchTypeFilter.setPopupIsOpen}
            closeOnChange={false}
            hasRequiredError={searchTypeFilter.hasRequiredError()}
          >
            <SelectTextFilterOptions
              name={searchTypeFilter.name}
              state={searchTypeFilter.state}
              update={searchTypeFilter.update}
              options={searchTypeOptions}
            />
          </FilterPopup>
        </div>
      </SearchFilter>
      <Loader active={state.fetchSearchResult} size="massive" />
      {state.error && <FetchCardsStatus>{state.error.toString()}</FetchCardsStatus>}
      <SearchResultContainer
        query={query}
        isVisible={searchTypeFilter.state.events && !state.fetchSearchResult}
        searchType={SEARCH_TYPE.EVENT}
        total={state.searchResult.event.total}
        cards={eventCards}
      />
    </PageContainer>
  );
};

export default SearchContainer;
