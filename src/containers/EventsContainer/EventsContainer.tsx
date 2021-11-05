import React, { FC, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import { useAppConfigContext } from "../../app";

import useEventsPagination from "./useEventsPagination";
import useFilter from "../../components/Filters/useFilter";
import { getDateText } from "../../components/Filters/SelectDateRange";
import { getCheckboxText } from "../../components/Filters/SelectTextFilterOptions";
import { getSortingText } from "../../components/Filters/SelectSorting";
import { ORDER_DIRECTION } from "../../networking/constants";
import getSelectedOptions from "../../components/Filters/SelectTextFilterOptions/getSelectedOptions";
import { Loader } from "semantic-ui-react";
import { MeetingCard } from "../../components/Cards/MeetingCard";

import colors from "../../styles/colors";
import { fontSizes } from "../../styles/fonts";

import { EventsData } from "./types";

const Events = styled.div({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 24,
  "& > *": {
    width: "50%",
  },
});

const EventsContainer: FC<EventsData> = ({ bodies, events }) => {
  const { firebaseConfig } = useAppConfigContext();

  const dateRangeFilter = useFilter<string>("Date", { start: "", end: "" }, "", getDateText);
  const committeeFilter = useFilter<boolean>("Committee", {}, false, getCheckboxText);
  const sortFilter = useFilter<string>(
    "Sort",
    { by: "event_datetime", order: ORDER_DIRECTION.desc, label: "Newest first" },
    "",
    getSortingText
  );

  const [state, dispatch] = useEventsPagination(
    firebaseConfig,
    {
      shouldFetchEvents: false,
      events: events,
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
    dispatch({ type: "FETCH_EVENTS" });
  }, [dispatch]);

  const handleShowMoreEvents = useCallback(() => dispatch({ type: "SHOW_MORE" }), [dispatch]);

  if (state.isLoading) {
    return <Loader />;
  }

  if (state.error) {
    return <div>{state.error.toString()}</div>;
  }

  return (
    <>
      <Events>
        {state.events.map((event, i) => {
          return (
            <Link
              key={i}
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
          );
        })}
        {state.hasMoreEvents && <button onClick={handleShowMoreEvents}>Show more</button>}
      </Events>
    </>
  );
};

export default EventsContainer;
