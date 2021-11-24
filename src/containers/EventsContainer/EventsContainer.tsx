import React, {
  FC,
  useCallback,
  useMemo,
  useState,
  ChangeEventHandler,
  FormEventHandler,
} from "react";
import styled from "@emotion/styled";
import { Link, useHistory } from "react-router-dom";
import { Loader } from "semantic-ui-react";

import { useAppConfigContext } from "../../app";
import { SEARCH_TYPE } from "../../constants/ProjectConstants";
import { ORDER_DIRECTION, OR_QUERY_LIMIT_NUM } from "../../networking/constants";

import { MeetingCard } from "../../components/Cards/MeetingCard";
import useFilter from "../../components/Filters/useFilter";
import { EventsFilter } from "../../components/Filters/EventsFilter";
import { getDateText } from "../../components/Filters/SelectDateRange";
import { getSortingText } from "../../components/Filters/SelectSorting";
import {
  getCheckboxText,
  getSelectedOptions,
} from "../../components/Filters/SelectTextFilterOptions";
import { CardsContainer } from "../CardsContainer";
import useEventsPagination from "./useEventsPagination";
import { EventsData } from "./types";

import { strings } from "../../assets/LocalizedStrings";
import colors from "../../styles/colors";
import { fontSizes } from "../../styles/fonts";
import { screenWidths } from "../../styles/mediaBreakpoints";

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 32,
});

const SearchContainer = styled.div({
  display: "grid",
  gap: 8,
  gridTemplateColumns: "1fr",
  justifyContent: "start",
  alignItems: "start",
  [`@media (min-width:${screenWidths.tablet})`]: {
    gridTemplateColumns: "1fr auto",
  },
});

const FetchEventsMsg = styled.p({
  fontSize: fontSizes.font_size_6,
});

interface ShowMoreEventsProps {
  isVisible: boolean;
}
const ShowMoreEvents = styled.div<ShowMoreEventsProps>((props) => ({
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

const FETCH_EVENTS_BATCH_SIZE = 10;

const EventsContainer: FC<EventsData> = ({ bodies, events }: EventsData) => {
  const { firebaseConfig } = useAppConfigContext();

  const dateRangeFilter = useFilter<string>({
    name: "Date",
    initialState: { start: "", end: "" },
    defaultDataValue: "",
    textRepFunction: getDateText,
  });
  const committeeFilter = useFilter<boolean>({
    name: "Committee",
    initialState: bodies.reduce((obj, body) => {
      obj[body.id as string] = false;
      return obj;
    }, {} as Record<string, boolean>),
    defaultDataValue: false,
    textRepFunction: getCheckboxText,
    limit: OR_QUERY_LIMIT_NUM,
  });
  const sortFilter = useFilter<string>({
    name: "Sort",
    initialState: { by: "event_datetime", order: ORDER_DIRECTION.desc, label: "Newest first" },
    defaultDataValue: "",
    textRepFunction: getSortingText,
  });

  const [state, dispatch] = useEventsPagination(
    firebaseConfig,
    {
      batchSize: FETCH_EVENTS_BATCH_SIZE,
      events: events,
      fetchEvents: false,
      showMoreEvents: false,
      hasMoreEvents: events.length === FETCH_EVENTS_BATCH_SIZE,
      error: null,
    },
    getSelectedOptions(committeeFilter.state),
    dateRangeFilter.state,
    sortFilter.state
  );

  const handlePopupClose = useCallback(() => {
    dispatch({ type: "FETCH_EVENTS", payload: true });
  }, [dispatch]);

  const handleShowMoreEvents = useCallback(
    () => dispatch({ type: "FETCH_EVENTS", payload: false }),
    [dispatch]
  );

  const fetchEventsResult = useMemo(() => {
    if (state.fetchEvents) {
      return <Loader active size="massive" style={{ top: "40%" }} />;
    } else if (state.error) {
      return <FetchEventsMsg>{state.error.toString()}</FetchEventsMsg>;
    } else if (state.events.length === 0) {
      return <FetchEventsMsg>No events found.</FetchEventsMsg>;
    } else {
      const cards = state.events.map((event, i) => {
        const eventDateTimeStr = event.event_datetime?.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }) as string;
        return (
          <div key={i}>
            <Link
              to={`/events/${event.id}`}
              style={{
                textDecoration: "none",
                color: colors.black,
                fontSize: fontSizes.font_size_6,
              }}
            >
              <MeetingCard
                staticImgSrc={event.staticThumbnailURL}
                hoverImgSrc={event.hoverThumbnailURL}
                imgAlt={`${event.body?.name} - ${eventDateTimeStr}`}
                meetingDate={eventDateTimeStr}
                committee={event.body?.name as string}
                tags={event.keyGrams}
              />
            </Link>
          </div>
        );
      });
      return <CardsContainer cards={cards} />;
    }
  }, [state.fetchEvents, state.error, state.events]);

  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");
  const onSearchChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setSearchQuery(event.target.value);
  const onSearch: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const queryParams = `?q=${searchQuery.trim().replace(/\s+/g, "+")}`;

    history.push({
      pathname: "/search",
      search: queryParams,
      state: {
        query: searchQuery.trim(),
        types: [SEARCH_TYPE.MEETING],
        committees: getSelectedOptions(committeeFilter.state),
        dateRange: dateRangeFilter.state,
      },
    });
  };

  return (
    <Container>
      <h1 className="mzp-u-title-sm">{strings.events}</h1>
      <form className="mzp-c-form" role="search" onSubmit={onSearch} style={{ marginBottom: 0 }}>
        <SearchContainer>
          <input
            type="search"
            placeholder={strings.search_topic_placeholder}
            required
            aria-required
            value={searchQuery}
            onChange={onSearchChange}
            style={{ marginBottom: 0 }}
          />
          <button className="mzp-c-button mzp-t-product" type="submit">
            {strings.search}
          </button>
        </SearchContainer>
      </form>
      <EventsFilter
        allBodies={bodies}
        filters={[committeeFilter, dateRangeFilter, sortFilter]}
        sortOptions={[
          { by: "event_datetime", order: ORDER_DIRECTION.desc, label: "Newest first" },
          { by: "event_datetime", order: ORDER_DIRECTION.asc, label: "Oldest first" },
        ]}
        handlePopupClose={handlePopupClose}
      />
      {fetchEventsResult}
      <ShowMoreEvents isVisible={state.hasMoreEvents && !state.fetchEvents}>
        <button className="mzp-c-button mzp-t-secondary mzp-t-lg" onClick={handleShowMoreEvents}>
          <span>Show more events</span>
          <Loader inline active={state.showMoreEvents} size="tiny" />
        </button>
      </ShowMoreEvents>
    </Container>
  );
};

export default EventsContainer;
