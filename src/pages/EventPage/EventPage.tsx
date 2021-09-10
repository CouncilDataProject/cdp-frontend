import React, { FC, useEffect } from "react";

import { useParams } from "react-router-dom";

import EventService from "../../networking/EventService";
import SessionService from "../../networking/SessionService";
import TranscriptService from "../../networking/TranscriptService";
import EventMinutesItemService from "../../networking/EventMinutesItemService";
import EventMinutesItemFileService from "../../networking/EventMinutesItemFileService";
import VoteService from "../../networking/VoteService";
import TranscriptJsonService from "../../networking/TranscriptJsonService";
import useFetchData, {
  FetchDataActionType,
} from "../../containers/FetchDataContainer/useFetchData";

import Vote from "../../models/Vote";

import { EventContainer } from "../../containers/EventContainer";
import FetchDataContainer from "../../containers/FetchDataContainer/FetchDataContainer";
import { SentenceWithSessionIndex, EventData } from "../../containers/EventContainer/types";
import { createError } from "../../utils/createError";
import { Sentence } from "../../models/TranscriptJson";

const EventPage: FC = () => {
  // Get the id the the event, provided the route is `events/:id`
  const { id } = useParams<{ id: string }>();

  const { state: eventDataState, dispatch: eventDataDispatch } = useFetchData<EventData>({
    isLoading: false,
  });

  useEffect(() => {
    const eventService = new EventService();
    const sessionService = new SessionService();
    const transcriptService = new TranscriptService();
    const eventMinutesItemService = new EventMinutesItemService();
    const eventMinutesItemFileService = new EventMinutesItemFileService();
    const voteService = new VoteService();
    const transcriptJsonService = new TranscriptJsonService();

    let didCancel = false;

    const fetchEventData = async () => {
      eventDataDispatch({ type: FetchDataActionType.FETCH_INIT });

      try {
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
        // 3d list.
        // The first dimension is the number of transcripts/or sessions
        // The second dimension is the number of speaker indices for a given transcript
        // The third dimension is the number of sentences for a given speaker index
        const transcriptSentencesBySpeakerIndex = transcriptJsons.map((transcriptJson) => {
          const sentencesBySpeakerIndex: Sentence[][] = [];
          let currentSpeakerIndex = 0;
          transcriptJson?.sentences?.forEach((sentence) => {
            const speakerIndex = sentence?.speaker_index;
            if (speakerIndex === currentSpeakerIndex) {
              sentencesBySpeakerIndex[currentSpeakerIndex].push(sentence);
            } else {
              currentSpeakerIndex = speakerIndex;
              sentencesBySpeakerIndex.push([sentence]);
            }
          });
          return sentencesBySpeakerIndex;
        });
        //Flatten 3d list into list of sentences
        const sentences: SentenceWithSessionIndex[] = [];
        transcriptSentencesBySpeakerIndex.forEach((sentencesBySpeakerIndex, sessionIndex) => {
          const combinedSentences: SentenceWithSessionIndex[] = [];
          sentencesBySpeakerIndex.forEach((speakerSentences, speakerIndex) => {
            //Combine sentences for a speaker index into one `Sentence`
            const speakerSentencesText = speakerSentences.map((sentence) => sentence.text);
            combinedSentences.push({
              session_index: sessionIndex,
              index: speakerIndex,
              start_time: speakerSentences[0].start_time as number,
              end_time: speakerSentences[speakerSentences.length - 1].end_time,
              text: speakerSentencesText.join(" "),
              speaker_name: speakerSentences[0].speaker_name as string,
              speaker_index: speakerIndex,
              speaker_id: speakerSentences[0].speaker_id,
              speaker_pictureSrc: speakerSentences[0].speaker_pictureSrc,
            } as SentenceWithSessionIndex);
          });
          sentences.push(...combinedSentences);
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

        if (!didCancel) {
          eventDataDispatch({
            type: FetchDataActionType.FETCH_SUCCESS,
            payload: {
              event,
              sessions,
              sentences,
              eventMinutesItems,
              eventMinutesItemsFiles,
              votes: votesByEventMinutesItem,
            },
          });
        }
      } catch (err) {
        if (!didCancel) {
          const error = createError(err);
          eventDataDispatch({ type: FetchDataActionType.FETCH_FAILTURE, payload: error });
        }
      }
    };

    fetchEventData();

    return () => {
      didCancel = true;
    };
  }, [id]);

  return (
    <FetchDataContainer isLoading={eventDataState.isLoading} error={eventDataState.error}>
      {eventDataState.data && <EventContainer {...eventDataState.data} />}
    </FetchDataContainer>
  );
};

export default EventPage;
