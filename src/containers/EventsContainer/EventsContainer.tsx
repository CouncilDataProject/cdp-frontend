import React, { FC, useCallback } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { Loader } from "semantic-ui-react";

import { useAppConfigContext } from "../../app";
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

const Events = styled.div({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  rowGap: 64,
  "& > div": {
    width: "100%",
  },
  [`@media (min-width:${screenWidths.tablet})`]: {
    justifyContent: "space-between",
    "& > div": {
      width: "35%",
    },
  },
});

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

  if (state.error) {
    //TODO: throw the error
    return <div>{state.error.toString()}</div>;
  }

  return (
    <Container>
      <h1 className="mzp-u-title-sm">{strings.events}</h1>
      <EventsFilter
        allBodies={bodies}
        filters={[committeeFilter, dateRangeFilter, sortFilter]}
        sortOptions={[
          { by: "event_datetime", order: "desc", label: "Newest first" },
          { by: "event_datetime", order: "asc", label: "Oldest first" },
        ]}
        handlePopupClose={handlePopupClose}
      />
      {state.fetchEvents ? (
        <Loader active size="massive" style={{ top: "40%" }} />
      ) : (
        <>
          {state.events.length > 0 ? (
            <Events>
              {state.events.map((event, i) => {
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
                        imgAlt={""}
                        meetingDate={
                          event.event_datetime?.toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }) as string
                        }
                        committee={event.body?.name as string}
                        tags={event.keyGrams}
                      />
                    </Link>
                  </div>
                );
              })}
            </Events>
          ) : (
            <p>No events found.</p>
          )}
        </>
      )}
      {state.hasMoreEvents && !state.fetchEvents && (
        <div>
          <button className="mzp-c-button mzp-t-secondary mzp-t-lg" onClick={handleShowMoreEvents}>
            <span>Show more events</span>
            <Loader inline active={state.showMoreEvents} size="tiny" style={{ marginLeft: 8 }} />
          </button>
        </div>
      )}
    </Container>
  );
};

export default EventsContainer;
