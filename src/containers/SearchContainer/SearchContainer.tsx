import React, { FC, useMemo } from "react";
import styled from "@emotion/styled";

import SearchResultContainer from "./SearchResultContainer";
import { SearchContainerData } from "./types";

import { MeetingCard } from "../../components/Cards/MeetingCard";
import { SEARCH_TYPE } from "../../pages/SearchPage/types";

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 32,
});

const SearchContainer: FC<SearchContainerData> = ({
  searchState,
  eventResult,
}: SearchContainerData) => {
  const eventCards = useMemo(() => {
    return eventResult.events.map((renderableEvent) => {
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
  }, [eventResult.events]);

  //TODO: add the legislation cards

  return (
    <Container>
      <h1 className="mzp-u-title-xs">Search Results</h1>
      <SearchResultContainer
        query={searchState.query}
        isVisible={searchState.searchTypes.events}
        searchType={SEARCH_TYPE.EVENT}
        total={eventResult.total}
        cards={eventCards}
      />
    </Container>
  );
};

export default SearchContainer;
