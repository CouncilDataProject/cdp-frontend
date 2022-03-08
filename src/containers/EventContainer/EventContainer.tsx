import React, { createRef, FC, useState, useRef, useEffect, useMemo, useCallback } from "react";
import styled from "@emotion/styled";

import { useLanguageConfigContext } from "../../app";
import useDocumentTitle from "../../hooks/useDocumentTitle";

import { EventVideoRef } from "../../components/Details/EventVideo/EventVideo";
import { TranscriptSearch } from "../../components/Details/TranscriptSearch";
import { TranscriptItemRef } from "../../components/Details/TranscriptItem/TranscriptItem";
import SessionsVideos from "./SessionsVideos";
import EventInfoTabs from "./EventInfoTabs";
import { EventData } from "./types";

import { screenWidths } from "../../styles/mediaBreakpoints";

const Container = styled.div({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  rowGap: "32px",
  "& > *": {
    // Children of this container have 100% width
    width: "100%",
  },
});

const EventName = styled.div({
  "& > h2": {
    // Remove mozilla protocol margin on h2
    margin: 0,
  },
});

const SessionsContainer = styled.div({
  // Fix the videos to the top on small and large mobile
  position: "sticky",
  top: 0,
  zIndex: 2,
  backgroundColor: "white",
  [`@media (min-width:${screenWidths.tablet})`]: {
    position: "static",
  },
  [`@media (min-aspect-ratio:5/4), (min-width:${screenWidths.desktop})`]: {
    width: "50%",
  },
});

const TranscriptSearchContainer = styled.div({
  [`@media (min-aspect-ratio:5/4), (min-width:${screenWidths.desktop})`]: {
    width: "47%",
  },
});

export interface EventContainerProps extends EventData {
  /** The initial session video*/
  initialSession: number;
  /** The initial current time of the intial session video */
  initialSeconds: number;
  /** The search query used to find the event */
  searchQuery?: string;
}

const EventContainer: FC<EventContainerProps> = ({
  event,
  sessions,
  sentences,
  eventMinutesItems,
  votes,
  initialSession,
  initialSeconds,
  searchQuery,
}: EventContainerProps) => {
  const { language } = useLanguageConfigContext();

  useDocumentTitle(
    `${event.body?.name}` +
      `${event.body?.name && event.event_datetime && " -- "}` +
      `${event.event_datetime?.toLocaleDateString(language, {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      })}`
  );

  // The current video session that is visible
  const [currentSession, setCurrentSession] = useState<number>(initialSession);
  // The current selected tab - minutes items list, full transcript, or votes
  const [currentInfoTab, setCurrentInfoTab] = useState<number>(0);

  // Create EventVideoRefs to create jumpToVideoClip callback
  const sessionVideoRefs = useRef(sessions.map(() => createRef<EventVideoRef>()));
  const jumpToVideoClip = useCallback(
    (nextSessionIndex: number, startTime: number) => {
      setCurrentSession((prevSessionIndex) => {
        if (prevSessionIndex !== nextSessionIndex) {
          // If jumping to video clip of different video, pause the previous video player
          sessionVideoRefs.current[prevSessionIndex].current?.pause();
        }
        return nextSessionIndex;
      });
      sessionVideoRefs.current[nextSessionIndex].current?.seekTo(startTime);
    },
    [sessionVideoRefs]
  );

  //Create the TranscriptItemsRefs to create jumpToTranscript callback
  const transcriptItemsRefs = useMemo(() => {
    return (sentences.data || []).map(() => createRef<TranscriptItemRef>());
  }, [sentences.data]);
  const [currentTranscriptItem, setCurrentTranscriptItem] = useState<number>();
  const jumpToTranscript = useCallback(
    (sentenceIndex: number) => {
      if (currentInfoTab !== 1) {
        // Select the full transcript tab
        setCurrentInfoTab(1);
        // Set the index of the transcript item to scroll to
        setCurrentTranscriptItem(sentenceIndex);
      } else {
        // Full transcript tab is already selected, just scroll to the item
        transcriptItemsRefs[sentenceIndex].current?.scrollIntoView();
      }
    },
    [transcriptItemsRefs, currentInfoTab]
  );
  useEffect(() => {
    if (currentInfoTab === 1 && currentTranscriptItem !== undefined) {
      // Full transcript tab is now selected, scroll to the item
      transcriptItemsRefs[currentTranscriptItem].current?.scrollIntoView();
      // Reset the current transcript item index
      setCurrentTranscriptItem(undefined);
    }
  }, [currentInfoTab, currentTranscriptItem, transcriptItemsRefs]);

  return (
    <Container>
      <EventName>
        <h2 className="mzp-u-title-xs">{event.body?.name}</h2>
        <p className="mzp-c-card-desc">
          {event.event_datetime?.toLocaleDateString(language, {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </EventName>
      <SessionsContainer>
        <SessionsVideos
          eventVideoRefs={sessionVideoRefs.current}
          sessions={sessions}
          currentSession={currentSession}
          initialSeconds={initialSeconds}
          setCurrentSession={setCurrentSession}
        />
      </SessionsContainer>
      <TranscriptSearchContainer>
        <TranscriptSearch
          searchQuery={searchQuery || ""}
          sentences={sentences}
          jumpToVideoClip={jumpToVideoClip}
          jumpToTranscript={jumpToTranscript}
        />
      </TranscriptSearchContainer>
      <div>
        <EventInfoTabs
          currentInfoTab={currentInfoTab}
          setCurrentInfoTab={setCurrentInfoTab}
          sentences={sentences}
          transcriptItemsRefs={transcriptItemsRefs}
          eventMinutesItems={eventMinutesItems}
          votes={votes}
          jumpToVideoClip={jumpToVideoClip}
        />
      </div>
    </Container>
  );
};

export default EventContainer;
