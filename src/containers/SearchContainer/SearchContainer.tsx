import React, { FC } from "react";

import { SearchContainerData } from "./types";

import { MeetingCard } from "../../components/Cards/MeetingCard";
import { Link } from "react-router-dom";
import colors from "../../styles/colors";
import { fontSizes } from "../../styles/fonts";

const SearchContainer: FC<SearchContainerData> = ({ events }) => {
  console.log("events", events);
  return (
    <>
      {events.map((renderableEvent, i) => {
        const eventDateTimeStr = renderableEvent.event.event_datetime?.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }) as string;
        return (
          <div key={i}>
            <Link
              to={`/events/${renderableEvent.event.id}`}
              style={{
                textDecoration: "none",
                color: colors.black,
                fontSize: fontSizes.font_size_6,
              }}
            >
              <MeetingCard
                staticImgSrc={renderableEvent.staticThumbnailURL}
                hoverImgSrc={renderableEvent.hoverThumbnailURL}
                imgAlt={`${renderableEvent.event.body?.name} - ${eventDateTimeStr}`}
                meetingDate={eventDateTimeStr}
                committee={renderableEvent.event.body?.name as string}
                tags={renderableEvent.keyGrams}
                excerpt={renderableEvent.selectedContextSpan}
              />
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default SearchContainer;
