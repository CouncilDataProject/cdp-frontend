import React, { ChangeEventHandler, FC, useState, useMemo, FormEventHandler } from "react";
import styled from "@emotion/styled";
import { stem } from "stemr";
import { removeStopwords } from "stopword";

import LazyFetchDataContainer from "../../../containers/FetchDataContainer/LazyFetchDataContainer";
import { FetchDataState } from "../../../containers/FetchDataContainer/useFetchData";
import TranscriptItems from "./TranscriptItems";
import { ECSentence } from "../../../containers/EventContainer/types";

import { strings } from "../../../assets/LocalizedStrings";
import { fontSizes } from "../../../styles/fonts";
import { screenWidths } from "../../../styles/mediaBreakpoints";
import cleanText from "../../../utils/cleanText";
import { varietyRoles } from "../../../stories/model-mocks/role";

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

const TitleContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  marginBottom: "16px",
  "div:first-of-type": {
    fontSize: fontSizes.font_size_7,
    fontWeight: 600,
  },
  [`@media (min-width:${screenWidths.tablet})`]: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

interface TranscriptContainerProps {
  hasSearchResults: boolean;
}
const TranscriptContainer = styled.div<TranscriptContainerProps>((props) => ({
  minHeight: props.hasSearchResults ? "80vh" : 0,
  [`@media (min-width:${screenWidths.tablet})`]: {
    minHeight: props.hasSearchResults ? "50vh" : 0,
  },
  [`@media (min-aspect-ratio:5/4), (min-width:${screenWidths.desktop})`]: {
    flex: "1 1 auto",
    minHeight: 0,
  },
}));

export interface TranscriptSearchProps {
  /**The search query */
  searchQuery: string;
  /**The sentences of the transcript */
  sentences: FetchDataState<ECSentence[]>;
  /**Callback to play video clip */
  jumpToVideoClip(sessionIndex: number, startTime: number): void;
  /**Callback to jump to sentence in the full transcript component */
  jumpToTranscript(sentenceIndex: number): void;
}

/**Transcript search. Note: On deskop, the parent of this component should have enough height
 * to accomodatea a window view of the list of sentences.
 */
const TranscriptSearch: FC<TranscriptSearchProps> = ({
  searchQuery,
  sentences,
  jumpToVideoClip,
  jumpToTranscript,
}: TranscriptSearchProps) => {
  // Update the query in the search bar as the user types
  const [searchTerm, setSearchTerm] = useState<string>(searchQuery);
  const onSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchTerm(event.target.value);
  };

  // The query after a search form submit
  const [searchedTerm, setSearchedTerm] = useState(searchQuery);
  const onSearch: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setSearchedTerm(searchTerm);
  };

  const stemmedSentences = useMemo(() => {
    if (sentences.data) {
      return sentences.data.map(({ text }) => {
        const cleanedText = cleanText(text);
        const tokens = removeStopwords(cleanedText.split(" "));
        const stems = tokens.map((token) => stem(token.toLowerCase()));
        return new Set(stems);
      });
    }
    return [];
  }, [sentences.data]);

  //Update the visible sentences as the searched query changes
  const visibleSentences = useMemo(() => {
    if (sentences.data) {
      if (!searchedTerm.trim()) {
        return sentences.data;
      }

      let newTerm = searchedTerm;

      // get beginning restricter
      let beginIndStart = newTerm.indexOf('^"');
      let beginRestriction = "";
      if (beginIndStart !== -1) {
        let beginIndFinal = newTerm.substring(beginIndStart + 2).indexOf('"') + beginIndStart + 2;
        beginRestriction = newTerm.substring(beginIndStart + 2, beginIndFinal);
        newTerm = newTerm.substring(0, beginIndStart) + newTerm.substring(beginIndFinal + 1);
      }

      // get ending restricter
      let endIndStart = newTerm.indexOf('$"');
      let endRestriction = "";
      if (endIndStart !== -1) {
        let endIndFinal = newTerm.substring(endIndStart + 2).indexOf('"') + endIndStart + 2;
        endRestriction = newTerm.substring(endIndStart + 2, endIndFinal);
        newTerm = newTerm.substring(0, endIndStart) + newTerm.substring(endIndFinal + 1);
      }

      // get all indices of double quotes
      let regex = /"/gi,
        result,
        indices = [],
        required = [],
        banned = [];
      while ((result = regex.exec(newTerm))) {
        indices.push(result.index);
      }

      // find everything inside these double quotes and remove them
      for (let i = Math.floor(indices.length / 2) - 1; i >= 0; i--) {
        if (newTerm.substring(indices[i * 2] - 1, indices[i * 2]) === "!") {
          banned.push(newTerm.substring(indices[i * 2] + 1, indices[i * 2 + 1]));
        } else {
          required.push(newTerm.substring(indices[i * 2] + 1, indices[i * 2 + 1]));
        }
        newTerm =
          newTerm.substring(0, indices[i * 2]) +
          newTerm.substring(indices[i * 2 + 1] + 1, newTerm.length);
      }

      let ans = [];
      console.log("1");
      let cleanedQuery = cleanText(newTerm);
      console.log("2");
      let tokenizedQuery = removeStopwords(cleanedQuery.split(" "));
      console.log("3");
      if (!cleanedQuery || tokenizedQuery.length === 0) {
        // empty query or no valid tokens to search
        ans = [...sentences.data];
        console.log("4");
      } else {
        let stemmedQuery = tokenizedQuery.map((token) => stem(token.toLowerCase()));
        // the list before filtering out entries according to double quote rules
        ans = sentences.data.filter((_, i) => stemmedQuery.some((q) => stemmedSentences[i].has(q)));
        console.log("5");
      }
      console.log("6");
      // filter out everything in prevAns that doesn't follow the double quote rules
      for (let i = ans.length - 1; i >= 0; i--) {
        console.log("7");
        if (
          beginRestriction !== "" &&
          ans[i].text.substring(0, beginRestriction.length) !== beginRestriction
        ) {
          ans.splice(i, 1);
          continue;
        }
        if (
          endRestriction !== "" &&
          ans[i].text.substring(ans[i].text.length - endRestriction.length) !== endRestriction
        ) {
          ans.splice(i, 1);
          continue;
        }
        for (let j = 0; j < required.length; j++) {
          if (!ans[i].text.includes(required[j])) {
            ans.splice(i, 1);
            continue;
          }
        }
        for (let j = 0; j < banned.length; j++) {
          if (ans[i].text.includes(banned[j])) {
            ans.splice(i, 1);
            continue;
          }
        }
      }
      return ans;
    }
    return [];
  }, [sentences.data, stemmedSentences, searchedTerm]);

  return (
    <Container>
      <TitleContainer>
        <div>{strings.search_transcript}</div>
        <div>
          {sentences.data &&
            strings.number_of_results.replace("{number}", `${visibleSentences.length}`)}
        </div>
      </TitleContainer>
      <form className="mzp-c-form" role="search" onSubmit={onSearch}>
        <input
          style={{ width: "100%" }}
          type="search"
          placeholder={strings.search_transcript_placeholder}
          value={searchTerm}
          onChange={onSearchChange}
        />
      </form>
      <LazyFetchDataContainer
        data="transcript"
        isLoading={sentences.isLoading}
        error={sentences.error}
        notFound={!sentences.data || sentences.data.length === 0}
      >
        {sentences.data && (
          <TranscriptContainer hasSearchResults={visibleSentences.length !== 0}>
            <TranscriptItems
              searchQuery={searchedTerm}
              sentences={visibleSentences}
              jumpToVideoClip={jumpToVideoClip}
              jumpToTranscript={jumpToTranscript}
            />
          </TranscriptContainer>
        )}
      </LazyFetchDataContainer>
    </Container>
  );
};

export default TranscriptSearch;
