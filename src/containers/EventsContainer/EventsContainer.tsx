import React, { FC, useCallback } from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

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
import useEventsPagination from "./useEventsPagination";
import { EventsData } from "./types";

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
      width: "45%",
    },
  },
});

const EventsContainer: FC<EventsData> = ({ bodies, events }) => {
  const { firebaseConfig } = useAppConfigContext();

  const dateRangeFilter = useFilter<string>("Date", { start: "", end: "" }, "", getDateText);
  const committeeFilter = useFilter<boolean>(
    "Committee",
    bodies.reduce((obj, body) => {
      obj[body.id as string] = false;
      return obj;
    }, {} as Record<string, boolean>),
    false,
    getCheckboxText
  );
  const sortFilter = useFilter<string>(
    "Sort",
    { by: "event_datetime", order: ORDER_DIRECTION.desc, label: "Newest first" },
    "",
    getSortingText
  );

  const [state, dispatch] = useEventsPagination(
    firebaseConfig,
    {
      fetchEvents: false,
      events: events,
      showMoreEvents: false,
      hasMoreEvents: events.length === 10,
      isLoading: false,
      error: null,
      eventsPerPage: 10,
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
      <EventsFilter
        allBodies={bodies}
        filters={[committeeFilter, dateRangeFilter, sortFilter]}
        sortOptions={[
          { by: "event_datetime", order: "desc", label: "Newest first" },
          { by: "event_datetime", order: "asc", label: "Oldest first" },
        ]}
        handlePopupClose={handlePopupClose}
      />
      {state.events.length === 0 && <p>No events found.</p>}
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
      {state.hasMoreEvents && (
        <div>
          <button className="mzp-c-button mzp-t-secondary mzp-t-lg" onClick={handleShowMoreEvents}>
            {state.isLoading ? "Loading..." : "Show more events"}
          </button>
        </div>
      )}
    </Container>
  );
};

export default EventsContainer;
