import React, { FC } from "react";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  ListRowProps,
  ListRowRenderer,
} from "react-virtualized";

import { TranscriptItem } from "../TranscriptItem";

import secondsToHHMMSS from "../../../utils/secondsToHHMMSS";
import { SentenceWithSessionIndex } from "../../../containers/EventContainer/types";

interface TranscriptItemsProps {
  searchQuery: string;
  sentences: SentenceWithSessionIndex[];
  jumpToVideoClip(sessionIndex: number, startTime: number): void;
  jumpToTranscript(sentenceIndex: number): void;
}

const TranscriptItems: FC<TranscriptItemsProps> = ({
  searchQuery,
  sentences,
  jumpToVideoClip,
  jumpToTranscript,
}: TranscriptItemsProps) => {
  /**Creates a function that handles jumping to video clip at startTime */
  const handleJumpToVideoClip = (sessionIndex: number, startTime: number) => () =>
    jumpToVideoClip(sessionIndex, startTime);
  /**Creates a function that handles jumping to video clip at startTime and jumping to index-th sentence in full transcript */
  const handleJumpToTranscript = (sentenceIndex: number) => () => {
    jumpToTranscript(sentenceIndex);
  };
  // Stores the CellMeasurer's measurements of all transcript items
  const cache = new CellMeasurerCache({
    // The width of transcript items are the same
    fixedWidth: true,
    // The height of transcript items are variable, with the default height being 100px
    defaultHeight: 100,
  });

  const onResize = () => {
    // Need to clear all transcript items' measurements on document resize
    cache.clearAll();
  };

  const Row: ListRowRenderer = ({ index, parent, key, style }: ListRowProps) => (
    // Row is responsible for rendering a transcript item
    // CellMeasurer will dynamically determine the height of a transcript item,
    // or use the cache to determine the height
    <CellMeasurer key={key} cache={cache} parent={parent} columnIndex={0} rowIndex={index}>
      <div style={style} role="row">
        <div style={{ margin: "0 0 16px 0" }} role="cell">
          <TranscriptItem
            sessionIndex={sentences[index].session_index}
            speakerName={sentences[index].speaker_name}
            text={sentences[index].text}
            startTime={secondsToHHMMSS(sentences[index].start_time)}
            handleJumpToVideoClip={handleJumpToVideoClip(
              sentences[index].session_index,
              sentences[index].start_time
            )}
            searchQuery={searchQuery}
            speakerId={sentences[index].speaker_id}
            speakerPictureSrc={sentences[index].speaker_pictureSrc}
            handleJumpToTranscript={handleJumpToTranscript(index)}
          />
        </div>
      </div>
    </CellMeasurer>
  );

  return (
    <AutoSizer onResize={onResize}>
      {({ width, height }) => (
        <List
          deferredMeasurementCache={cache}
          height={height}
          rowCount={sentences.length}
          rowHeight={cache.rowHeight}
          rowRenderer={Row}
          scrollToIndex={0}
          style={{ willChange: "" }}
          width={width}
        />
      )}
    </AutoSizer>
  );
};

export default TranscriptItems;
