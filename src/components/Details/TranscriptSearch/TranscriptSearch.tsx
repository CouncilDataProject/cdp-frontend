import React, { ChangeEventHandler, FC, useState } from "react";
import styled from "@emotion/styled";

import TranscriptItems from "./TranscriptItems";
import { Sentence } from "../../Shared/Types/Transcript";

import { fontSizes } from "../../../styles/fonts";
import { screenWidths } from "../../../styles/mediaBreakpoints";
import isSubstring from "../../../utils/isSubstring";

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

const TitleContainer = styled.div({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
  "div:first-of-type": {
    fontSize: fontSizes.font_size_7,
    fontWeight: 600,
  },
});

const TranscriptItemContainer = styled.div({
  minHeight: "50vh",
  [`@media (min-aspect-ratio:5/4), (min-width:${screenWidths.desktop})`]: {
    flex: "1 1 auto",
    minHeight: "0",
  },
});

interface TranscriptSearchProps {
  searchQuery: string;
  sentences: Sentence[];
  jumpToVideoClip(startTime: number): void;
  jumpToTranscript(index: number): void;
}

/**Transcript search. Note: On deskop, the parent of this component should have enough height
 * to accomodatea a window view of the list of sentences.
 */
const TranscriptSearch: FC<TranscriptSearchProps> = ({
  searchQuery,
  sentences,
  jumpToVideoClip,
  jumpToTranscript,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(searchQuery);
  const onSearchChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setSearchTerm(event.target.value);

  const visibleSentences = sentences.filter(({ text }) => isSubstring(text, searchTerm));

  return (
    <Container>
      <TitleContainer>
        <div>Transcript Search</div>
        {searchTerm && <div>{visibleSentences.length} mention(s)</div>}
      </TitleContainer>
      <form className="mzp-c-form" role="search">
        <input
          style={{ width: "100%" }}
          type="search"
          placeholder="Search transcript..."
          value={searchTerm}
          onChange={onSearchChange}
        />
      </form>
      <TranscriptItemContainer>
        <TranscriptItems
          searchQuery={searchTerm}
          sentences={visibleSentences}
          jumpToVideoClip={jumpToVideoClip}
          jumpToTranscript={jumpToTranscript}
        />
      </TranscriptItemContainer>
    </Container>
  );
};

export default TranscriptSearch;
