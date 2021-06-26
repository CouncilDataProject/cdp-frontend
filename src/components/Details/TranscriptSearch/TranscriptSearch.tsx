import React, { FC, useState } from "react";
import styled from "@emotion/styled";

import SearchBar from "./SearchBar";
import { TranscriptItem } from "../TranscriptItem";
import { Sentence } from "../../Shared/Types/Transcript";
import { fontSizes } from "../../../styles/fonts";
import hhmmss from "../../../utils/hhmmss";
import isSubstring from "../../../utils/isSubstring";

const Container = styled.div({
  padding: "24px",
  display: "flex",
  flexDirection: "column",
});

const TitleContainer = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
  "div:first-child": {
    fontSize: fontSizes.font_size_7,
    fontWeight: 600,
  },
});

const TranscriptItemContainer = styled.div({
  flex: "1 1 auto",
  overflowY: "scroll",
  display: "grid",
  gridTemplateColumns: "auto",
  gap: "24px",
});

interface TranscriptSearchProps {
  searchQuery: string;
  sentences: Sentence[];
  jumpToVideoClip(startTime: number): void;
  jumpToTranscript(index: number): void;
}

const fakeSentences = Array.from({ length: 200 }).map((_, i) => ({
  index: i,
  start_time: i,
  text: `This is a sentence${i}.`,
  speaker: {
    name: "Lisa Herbold",
    id: "lisa-herbold",
    pictureSrc: "https://www.seattle.gov/images/Council/Members/Herbold/Herbold_225x225.jpg",
  },
}));

const TranscriptSearch: FC<TranscriptSearchProps> = ({
  searchQuery,
  sentences,
  jumpToVideoClip,
  jumpToTranscript,
}) => {
  const [visibleSearchTerm, setVisibleSearchTerm] = useState<string>(searchQuery);
  const [visibleSentences, setVisibleSentences] = useState<Sentence[]>(
    fakeSentences.filter(({ text }) => isSubstring(text, searchQuery))
  );
  const handleSearch = (searchTerm: string) => {
    setVisibleSearchTerm(searchTerm);
    const newSentences = fakeSentences.filter(({ text }) => isSubstring(text, searchTerm));
    setVisibleSentences(newSentences);
  };

  const onVideoClip = (startTime: number) => () => jumpToVideoClip(startTime);
  const onTranscript = (index: number, startTime: number) => () => {
    jumpToVideoClip(startTime);
    jumpToTranscript(index);
  };

  return (
    <Container>
      <TitleContainer>
        <div>Transcript Search</div>
        {visibleSearchTerm && <div>{visibleSentences.length} mention(s)</div>}
      </TitleContainer>
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      <TranscriptItemContainer>
        {visibleSentences.map((sentence, i) => (
          <TranscriptItem
            key={i}
            speakerName={sentence.speaker.name}
            text={sentence.text}
            startTime={hhmmss(sentence.start_time)}
            handleVideoClick={onVideoClip(sentence.start_time)}
            searchQuery={visibleSearchTerm}
            speakerId={sentence.speaker.id}
            speakerPictureSrc={sentence.speaker.pictureSrc}
            handleTranscriptClick={onTranscript(i, sentence.start_time)}
          />
        ))}
      </TranscriptItemContainer>
    </Container>
  );
};

export default TranscriptSearch;
