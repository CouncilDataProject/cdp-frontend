import React, { FC } from "react";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  ListRowRenderer,
} from "react-virtualized";

import { TranscriptItem } from "../TranscriptItem";

import hhmmss from "../../../utils/hhmmss";
import { Sentence } from "../../Shared/Types/Transcript";

interface TranscriptItemsProps {
  searchQuery: string;
  sentences: Sentence[];
  jumpToVideoClip(startTime: number): void;
  jumpToTranscript(index: number): void;
}

const TranscriptItems: FC<TranscriptItemsProps> = ({
  searchQuery,
  sentences,
  jumpToVideoClip,
  jumpToTranscript,
}) => {
  const onVideoClip = (startTime: number) => () => jumpToVideoClip(startTime);
  const onTranscript = (index: number, startTime: number) => () => {
    jumpToVideoClip(startTime);
    jumpToTranscript(index);
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

  const Row: ListRowRenderer = ({ index, parent, key, style }) => (
    // Row is responsible for rendering a transcript item
    // CellMeasurer will dynamically determine the height of a transcript item,
    // or use the cache to determine the height
    <CellMeasurer key={key} cache={cache} parent={parent} columnIndex={0} rowIndex={index}>
      <div style={style} role="row">
        <div style={{ margin: "0 0 16px 0" }} role="cell">
          <TranscriptItem
            speakerName={sentences[index].speaker.name}
            text={sentences[index].text}
            startTime={hhmmss(sentences[index].start_time)}
            handleVideoClick={onVideoClip(sentences[index].start_time)}
            searchQuery={searchQuery}
            speakerId={sentences[index].speaker.id}
            speakerPictureSrc={sentences[index].speaker.pictureSrc}
            handleTranscriptClick={onTranscript(index, sentences[index].start_time)}
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
