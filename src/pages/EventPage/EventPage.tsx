import React, { FC, useCallback } from "react";

import { useParams } from "react-router-dom";

import { useAppConfigContext } from "../../app";
import EventService from "../../networking/EventService";
import SessionService from "../../networking/SessionService";
import TranscriptService from "../../networking/TranscriptService";
import EventMinutesItemService from "../../networking/EventMinutesItemService";
import EventMinutesItemFileService from "../../networking/EventMinutesItemFileService";
import VoteService from "../../networking/VoteService";
import TranscriptJsonService from "../../networking/TranscriptJsonService";
import Vote from "../../models/Vote";

import { EventContainer } from "../../containers/EventContainer";
import { SentenceWithSessionIndex, EventData } from "../../containers/EventContainer/types";
import { FetchDataContainer } from "../../containers/FetchDataContainer";
import useFetchData from "../../containers/FetchDataContainer/useFetchData";

const EventPage: FC = () => {
  // Get the id the the event, provided the route is `events/:id`
  const { id } = useParams<{ id: string }>();
  // Get the app config context
  const { firebaseConfig } = useAppConfigContext();

  const fetchEventData = useCallback(async () => {
    const eventService = new EventService(firebaseConfig);
    const sessionService = new SessionService(firebaseConfig);
    const transcriptService = new TranscriptService(firebaseConfig);
    const eventMinutesItemService = new EventMinutesItemService(firebaseConfig);
    const eventMinutesItemFileService = new EventMinutesItemFileService(firebaseConfig);
    const voteService = new VoteService(firebaseConfig);
    const transcriptJsonService = new TranscriptJsonService(firebaseConfig);
    // Get data from the event id
    const eventPromise = eventService.getEventById(id);
    const sessionsPromise = sessionService.getSessionsByEventId(id);
    const eventMinutesItemsPromise = eventMinutesItemService.getEventMinutesItemsByEventId(id);
    const votesPromise = voteService.getVotesByEventId(id);
    const [event, sessions, eventMinutesItems, votes] = await Promise.all([
      eventPromise,
      sessionsPromise,
      eventMinutesItemsPromise,
      votesPromise,
    ]);

    // Get the event minutes items files from event minutes items
    const eventMinutesItemsFilesPromise = Promise.all(
      eventMinutesItems.map(({ id }) =>
        eventMinutesItemFileService.getEventMinutesItemFilesByEventMinutesItemId(id as string)
      )
    );
    // Get the transcripts from the sessions
    const transcriptsPromise = Promise.all(
      sessions.map(({ id }) => transcriptService.getTranscriptBySessionId(id as string))
    );
    const [eventMinutesItemsFiles, transcripts] = await Promise.all([
      eventMinutesItemsFilesPromise,
      transcriptsPromise,
    ]);

    // Create transcript items from the transcripts
    const transcriptJsons = await Promise.all(
      transcripts.map((transcript) => {
        return transcriptJsonService.download(transcript[0].file?.uri as string);
      })
    );
    // Unpack sentences from all transcripts
    const sentences: SentenceWithSessionIndex[] = [];
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
        } as SentenceWithSessionIndex);
      });
    });

    // Create votes list for each event minutes item
    const votesByEventMinutesItemDict = votes.reduce((dict, vote) => {
      if (!Object.keys(dict).includes(vote.event_minutes_item_ref as string)) {
        dict[vote.event_minutes_item_ref as string] = [];
      }
      dict[vote.event_minutes_item_ref as string].push(vote);
      return dict;
    }, {} as Record<string, Vote[]>);
    const votesByEventMinutesItem = eventMinutesItems.map((eventMinutesItem) => {
      return votesByEventMinutesItemDict[eventMinutesItem.id as string] || [];
    });

    return Promise.resolve({
      event,
      sessions,
      sentences,
      eventMinutesItems,
      eventMinutesItemsFiles,
      votes: votesByEventMinutesItem,
    });
  }, [firebaseConfig, id]);

  const { state: eventDataState } = useFetchData<EventData>(
    {
      isLoading: false,
      error: null,
      hasFetchRequest: true,
    },
    fetchEventData
  );

  return (
    <FetchDataContainer isLoading={eventDataState.isLoading} error={eventDataState.error}>
      {eventDataState.data && <EventContainer {...eventDataState.data} />}
    </FetchDataContainer>
  );
};

export default EventPage;
