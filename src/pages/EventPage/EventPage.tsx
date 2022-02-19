import React, { FC, useCallback, useMemo, useEffect } from "react";
import queryString from "query-string";
import { useParams, useLocation } from "react-router-dom";

import Event from "../../models/Event";
import Session from "../../models/Session";
import Vote from "../../models/Vote";

import { useAppConfigContext } from "../../app";
import EventService from "../../networking/EventService";
import SessionService from "../../networking/SessionService";
import TranscriptService from "../../networking/TranscriptService";
import EventMinutesItemService from "../../networking/EventMinutesItemService";
import EventMinutesItemFileService from "../../networking/EventMinutesItemFileService";
import VoteService from "../../networking/VoteService";
import TranscriptJsonService from "../../networking/TranscriptJsonService";

import { EventContainer } from "../../containers/EventContainer";
import { ECSentence, ECEventMinutesItem } from "../../containers/EventContainer/types";
import { FetchDataContainer } from "../../containers/FetchDataContainer";
import useFetchData, {
  initialFetchDataState,
  FetchDataActionType,
} from "../../containers/FetchDataContainer/useFetchData";

const EventPage: FC = () => {
  // Get the id the the event, provided the route is `events/:id`
  const { id } = useParams<{ id: string }>();
  // Get the app config context
  const { firebaseConfig } = useAppConfigContext();
  //Get the query
  const location = useLocation<{ query: string }>();
  const searchQuery = useMemo(() => {
    if (location.state) {
      return location.state.query;
    }
    return "";
  }, [location.state]);

  const [initialSession, initialSeconds] = useMemo(() => {
    const { s, t } = queryString.parse(location.search);
    return [s, t].map((el) => {
      if (el !== null && typeof el === "string") {
        const n = parseFloat(el);
        const isInvalid = isNaN(n) || n < 0;
        return isInvalid ? 0 : Math.floor(n);
      } else {
        return 0;
      }
    });
  }, [location.search]);

  const fetchEvent = useCallback(async () => {
    const eventService = new EventService(firebaseConfig);
    const event = await eventService.getEventById(id);
    return Promise.resolve(event);
  }, [firebaseConfig, id]);
  const { state: eventDataState } = useFetchData<Event>({ ...initialFetchDataState }, fetchEvent);

  const fetchSessions = useCallback(async () => {
    const sessionService = new SessionService(firebaseConfig);
    const sessions = await sessionService.getSessionsByEventId(id);
    return Promise.resolve(sessions);
  }, [firebaseConfig, id]);
  const { state: sessionsDataState } = useFetchData<Session[]>(
    { ...initialFetchDataState },
    fetchSessions
  );

  const fetchMinutesItemsWithFiles = useCallback(async () => {
    const eventMinutesItemService = new EventMinutesItemService(firebaseConfig);
    const eventMinutesItemFileService = new EventMinutesItemFileService(firebaseConfig);
    const eventMinutesItems = await eventMinutesItemService.getEventMinutesItemsByEventId(id);
    const eventMinutesItemsFiles = await Promise.all(
      eventMinutesItems.map(({ id }) =>
        eventMinutesItemFileService.getEventMinutesItemFilesByEventMinutesItemId(id as string)
      )
    );
    return Promise.resolve(
      eventMinutesItems.map((eventMinutesItem, i) => {
        return {
          ...eventMinutesItem,
          files: eventMinutesItemsFiles[i],
        };
      })
    );
  }, [firebaseConfig, id]);
  const { state: eventMinutesItemsDataState } = useFetchData<ECEventMinutesItem[]>(
    { ...initialFetchDataState },
    fetchMinutesItemsWithFiles
  );

  const fetchVotes = useCallback(async () => {
    const voteService = new VoteService(firebaseConfig);
    const votes = await voteService.getVotesByEventId(id);
    return Promise.resolve(votes);
  }, [firebaseConfig, id]);
  const { state: votesDataState } = useFetchData<Vote[]>({ ...initialFetchDataState }, fetchVotes);

  const fetchSentences = useCallback(async () => {
    const transcriptService = new TranscriptService(firebaseConfig);
    const transcriptJsonService = new TranscriptJsonService(firebaseConfig);
    if (sessionsDataState.data) {
      // Get the transcripts from the sessions
      const transcripts = await Promise.all(
        sessionsDataState.data.map(({ id }) =>
          transcriptService.getTranscriptBySessionId(id as string)
        )
      );
      // Create transcript items from the transcripts
      const transcriptJsons = await Promise.all(
        transcripts.map((transcript) => {
          return transcriptJsonService.download(transcript[0].file?.uri as string);
        })
      );
      // Unpack sentences from all transcripts
      const sentences: ECSentence[] = [];
      transcriptJsons.forEach((transcriptJson, sessionIndex) => {
        transcriptJson?.sentences?.forEach((sentence) => {
          sentences.push({
            session_index: sessionIndex,
            index: sentences.length,
            start_time: sentence.start_time,
            end_time: sentence.end_time,
            text: sentence.text,
            speaker_name: sentence.speaker_name,
            speaker_index: sentence.speaker_index,
            speaker_id: undefined,
            speaker_pictureSrc: undefined,
          } as ECSentence);
        });
      });
      return Promise.resolve(sentences);
    }

    return Promise.resolve([]);
  }, [firebaseConfig, sessionsDataState.data]);
  const { state: sentencesDataState, dispatch: sentencesDataDispatch } = useFetchData<ECSentence[]>(
    { ...initialFetchDataState, hasFetchRequest: false },
    fetchSentences
  );
  useEffect(() => {
    if (sessionsDataState.data) {
      // fetch sentences after sessions are fetched
      sentencesDataDispatch({ type: FetchDataActionType.FETCH });
    }
  }, [sessionsDataState.data, sentencesDataDispatch]);

  const isFetchingEventData = useMemo(() => {
    return (
      eventDataState.isLoading ||
      sessionsDataState.isLoading ||
      eventMinutesItemsDataState.isLoading ||
      votesDataState.isLoading
    );
  }, [
    eventDataState.isLoading,
    sessionsDataState.isLoading,
    eventMinutesItemsDataState.isLoading,
    votesDataState.isLoading,
  ]);

  const eventData = useMemo(() => {
    if (
      !eventDataState.data ||
      !sessionsDataState.data ||
      !eventMinutesItemsDataState.data ||
      !votesDataState.data
    ) {
      // not all fetch requests has completed
      return undefined;
    }
    return {
      event: eventDataState.data,
      sessions: sessionsDataState.data,
      eventMinutesItems: eventMinutesItemsDataState.data,
      votes: votesDataState.data,
    };
  }, [
    eventDataState.data,
    sessionsDataState.data,
    eventMinutesItemsDataState.data,
    votesDataState.data,
  ]);

  const fetchEventDataError = useMemo(() => {
    const errorMsgs = [
      eventDataState.error,
      sessionsDataState.error,
      eventMinutesItemsDataState.error,
      votesDataState.error,
      sentencesDataState.error,
    ]
      .map((error) => error?.message || "")
      .filter((errorMsg) => errorMsg.length > 0);
    if (errorMsgs.length > 0) {
      // create one error from all the error msgs
      return new Error(errorMsgs.join("\n"));
    }
    return null;
  }, [
    eventDataState.error,
    sessionsDataState.error,
    eventMinutesItemsDataState.error,
    votesDataState.error,
    sentencesDataState.error,
  ]);

  return (
    <FetchDataContainer isLoading={isFetchingEventData} error={fetchEventDataError}>
      {eventData && (
        <EventContainer
          {...eventData}
          sentences={sentencesDataState.data}
          searchQuery={searchQuery}
          initialSession={
            initialSession > 0 && initialSession < eventData.sessions.length ? initialSession : 0
          }
          initialSeconds={initialSeconds}
        />
      )}
    </FetchDataContainer>
  );
};

export default EventPage;
