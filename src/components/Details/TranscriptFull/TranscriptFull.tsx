import React, { FC, RefObject } from "react";

import TranscriptItem, { TranscriptItemRef } from "../TranscriptItem/TranscriptItem";

import { SentenceWithSessionIndex } from "../../../containers/EventContainer/types";
import secondsToHHMMSS from "../../../utils/secondsToHHMMSS";

export interface TranscriptFullProps {
  /**The sentences of the transcript */
  sentences: SentenceWithSessionIndex[];
  /**List of transcript item React references */
  transcriptItemsRefs: RefObject<TranscriptItemRef>[];
  /**Callback to play video clip */
  jumpToVideoClip(sessionIndex: number, startTime: number): void;
}

/**Full view of transcript */
const TranscriptFull: FC<TranscriptFullProps> = ({
  sentences,
  transcriptItemsRefs,
  jumpToVideoClip,
}: TranscriptFullProps) => {
  /**Creates a function that handles jumping to video clip at startTime */
  const handleJumpToVideoClip = (sessionIndex: number, startTime: number) => () =>
    jumpToVideoClip(sessionIndex, startTime);
  return (
    <div>
      {sentences.map((sentence, i) => (
        <TranscriptItem
          key={sentence.index}
          speakerName={sentence.speaker_name}
          text={sentence.text}
          startTime={secondsToHHMMSS(sentence.start_time)}
          handleJumpToVideoClip={handleJumpToVideoClip(sentence.session_index, sentence.start_time)}
          searchQuery=""
          speakerId={sentence.speaker_id}
          speakerPictureSrc={sentence.speaker_pictureSrc}
          componentRef={transcriptItemsRefs[i]}
        />
      ))}
    </div>
  );
};

export default TranscriptFull;
