import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import { Loader } from "semantic-ui-react";

import { useAppConfigContext } from "../../app";
import { ORDER_DIRECTION } from "../../networking/constants";

import { MeetingCard } from "../../components/Cards/MeetingCard";
import useFilter from "../../components/Filters/useFilter";
import { EventsFilter } from "../../components/Filters/EventsFilter";
import { getDateText } from "../../components/Filters/SelectDateRange";
import { getSortingText } from "../../components/Filters/SelectSorting";
import {
  getCheckboxText,
  getSelectedOptions,
} from "../../components/Filters/SelectTextFilterOptions";
import SearchBar from "../../components/Shared/SearchBar";
import SearchPageTitle from "../../components/Shared/SearchPageTitle";
import { CardsContainer } from "../CardsContainer";
import { SearchEventsContainerData } from "./types";
import useSearchEventsPagination from "./useSearchEventsPagination";
import { SEARCH_TYPE } from "../../pages/SearchPage/types";

import { strings } from "../../assets/LocalizedStrings";
import { fontSizes } from "../../styles/fonts";
import { screenWidths } from "../../styles/mediaBreakpoints";

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 32,
});

const FetchEventsMsg = styled.p({
  fontSize: fontSizes.font_size_6,
});

const ShowMoreEvents = styled.div<{ isVisible: boolean }>((props) => ({
  visibility: props.isVisible ? "visible" : "hidden",
  "& > button": {
    width: "100%",
  },
  [`@media (min-width:${screenWidths.tablet})`]: {
    "& > button": {
      width: "auto",
    },
  },
}));

const FETCH_EVENTS_BATCH_SIZE = 10;

const SearchEventsContainer: FC<SearchEventsContainerData> = ({
  searchEventsState,
  bodies,
}: SearchEventsContainerData) => {
  const { firebaseConfig } = useAppConfigContext();

  const dateRangeFilter = useFilter<string>({
    name: "Date",
    initialState: searchEventsState.dateRange,
    defaultDataValue: "",
    textRepFunction: getDateText,
  });
  const committeeFilter = useFilter<boolean>({
    name: "Committee",
    initialState: searchEventsState.committees,
    defaultDataValue: false,
    textRepFunction: getCheckboxText,
  });
  const sortFilter = useFilter<string>({
    name: "Sort",
    initialState: { by: "pureRelevance", order: ORDER_DIRECTION.desc, label: "Most relevant" },
    defaultDataValue: "",
    textRepFunction: getSortingText,
  });

  const [searchQuery, setSearchQuery] = useState(searchEventsState.query);
  const [state, dispatch] = useSearchEventsPagination(
    firebaseConfig,
    {
      batchSize: FETCH_EVENTS_BATCH_SIZE,
      visibleCount: 0,
      searchedEvents: [],
      events: [],
      fetchEvents: false,
      filterAndSortEvents: false,
      error: null,
    },
    searchQuery,
    getSelectedOptions(committeeFilter.state),
    dateRangeFilter.state,
    sortFilter.state
  );

  useEffect(() => {
    dispatch({ type: "FETCH_EVENTS" });
  }, [dispatch]);

  const handlePopupClose = useCallback(() => {
    dispatch({ type: "FILTER_AND_SORT_EVENTS" });
  }, [dispatch]);

  const handleShowMoreEvents = useCallback(() => dispatch({ type: "SHOW_MORE_EVENTS" }), [
    dispatch,
  ]);

  const fetchEventsResult = useMemo(() => {
    if (state.fetchEvents || state.filterAndSortEvents) {
      return <Loader active size="massive" />;
    } else if (state.error) {
      return <FetchEventsMsg>{state.error.toString()}</FetchEventsMsg>;
    } else if (state.events.length === 0) {
      return <FetchEventsMsg>No events found.</FetchEventsMsg>;
    } else {
      const cards = state.events.slice(0, state.visibleCount).map((renderableEvent) => {
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
      return (
        <>
          <FetchEventsMsg>{`${state.events.length} ${SEARCH_TYPE.EVENT}`}</FetchEventsMsg>
          <CardsContainer cards={cards} />
        </>
      );
    }
  }, [state.fetchEvents, state.filterAndSortEvents, state.error, state.events, state.visibleCount]);

  const location = useLocation();
  const handleSearch = () => {
    const queryParams = `?q=${searchQuery.trim().replace(/\s+/g, "+")}`;
    //# is because the react-router-dom BrowserRouter is used
    history.pushState({}, "", `#${location.pathname}${queryParams}`);
    dispatch({ type: "FETCH_EVENTS" });
  };

  const showMoreEvents = useMemo(() => {
    return (
      state.visibleCount < state.events.length && !state.fetchEvents && !state.filterAndSortEvents
    );
  }, [state]);

  return (
    <Container>
      <SearchPageTitle>
        <h1 className="mzp-u-title-sm">Event Search Results</h1>
        <SearchBar
          placeholder={strings.search_topic_placeholder}
          query={searchQuery}
          setQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
      </SearchPageTitle>
      <EventsFilter
        allBodies={bodies}
        filters={[committeeFilter, dateRangeFilter, sortFilter]}
        sortOptions={[
          { by: "pureRelevance", order: ORDER_DIRECTION.desc, label: "Most relevant" },
          {
            by: "datetimeWeightedRelevance",
            order: ORDER_DIRECTION.desc,
            label: "Most relevant (weighted)",
          },
          { by: "event.event_datetime", order: ORDER_DIRECTION.desc, label: "Newest first" },
          { by: "event.event_datetime", order: ORDER_DIRECTION.asc, label: "Oldest first" },
        ]}
        handlePopupClose={handlePopupClose}
      />
      {fetchEventsResult}
      <ShowMoreEvents isVisible={showMoreEvents}>
        <button className="mzp-c-button mzp-t-secondary mzp-t-lg" onClick={handleShowMoreEvents}>
          Show more events
        </button>
      </ShowMoreEvents>
    </Container>
  );
};

export default SearchEventsContainer;
