import React, { FC, RefObject } from "react";

import { TranscriptItem, TranscriptItemRef } from "../TranscriptItem";

import { Sentence } from "../../Shared/Types/Transcript";
import hhmmss from "../../../utils/hhmmss";

export interface TranscriptFullProps {
  /**The sentences of the transcript */
  sentences: Sentence[];
  /**List of transcript item React references */
  transcriptItemsRefs: RefObject<TranscriptItemRef>[];
  /**Callback to play video clip */
  jumpToVideoClip(startTime: number): void;
}

/**Full view of transcript */
const TranscriptFull: FC<TranscriptFullProps> = ({
  sentences,
  transcriptItemsRefs,
  jumpToVideoClip,
}: TranscriptFullProps) => {
  const onVideoClip = (startTime: number) => () => jumpToVideoClip(startTime);
  return (
    <div>
      {sentences.map((sentence, i) => (
        <TranscriptItem
          key={sentence.index}
          speakerName={sentence.speaker.name}
          text={sentence.text}
          startTime={hhmmss(sentence.start_time)}
          handleVideoClick={onVideoClip(sentence.start_time)}
          searchQuery=""
          speakerId={sentence.speaker.id}
          speakerPictureSrc={sentence.speaker.pictureSrc}
          componentRef={transcriptItemsRefs[i]}
        />
      ))}
    </div>
  );
};

export default TranscriptFull;
