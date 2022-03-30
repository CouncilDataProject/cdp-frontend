import React, { useMemo, useCallback, useState } from "react";
import styled from "@emotion/styled";
import Highlighter from "react-highlight-words";
import { removeStopwords } from "stopword";

import { useAppConfigContext, useLanguageConfigContext } from "../../../app";

import FileService from "../../../networking/FileService";

import Event from "../../../models/Event";

import useFetchData from "../../../containers/FetchDataContainer/useFetchData";
import AbsoluteBox from "../../Shared/AbsoluteBox";
import PlaceholderWrapper from "../../Shared/PlaceHolder";

import { strings } from "../../../assets/LocalizedStrings";
import { TAG_CONNECTOR } from "../../../constants/StyleConstants";
import cleanText from "../../../utils/cleanText";

export interface MeetingCardProps {
  /** The event for the meeting */
  event: Event;
  /** Tags for the event */
  tags: string[];
  /** A context span if the event was found through searching */
  excerpt?: string;
  /** The highest value gram of the context span */
  gram?: string;
  /** The query used to find this meeting */
  query?: string;
}

const Meeting = styled.section({
  marginBottom: 0,
});

// first img is static, second img is animated
const Images = styled.div({
  position: "relative",
  "& > img": {
    position: "absolute",
    inset: 0,
  },
  "& > img:first-of-type": {
    zIndex: 1,
  },
  "& > img:last-of-type": {
    // overlay animated img over static img
    zIndex: 2,
    // initially, animated img is invisible
    opacity: 0,
  },
  "& > img:last-of-type:hover": {
    // on hover, animated img is visible
    opacity: 1,
  },
});

const MeetingCard = ({ event, tags, excerpt, gram, query }: MeetingCardProps) => {
  const { language } = useLanguageConfigContext();
  const { firebaseConfig, municipality } = useAppConfigContext();

  const [staticThumbNailIsLoading, setStaticThumbNailIsLoading] = useState(true);

  const fetchEventThumbNails = useCallback(async () => {
    const fileService = new FileService(firebaseConfig);
    const { networkService } = fileService;
    const thumbNailPromises: Promise<string | undefined>[] = [
      Promise.resolve(undefined),
      Promise.resolve(undefined),
    ];
    if (event.static_thumbnail_ref) {
      thumbNailPromises[0] = fileService
        .getFileById(event.static_thumbnail_ref)
        .then((file) => networkService.getDownloadUrl(file.uri))
        .catch(() => Promise.resolve(undefined));
    }
    if (event.hover_thumbnail_ref) {
      thumbNailPromises[1] = fileService
        .getFileById(event.hover_thumbnail_ref)
        .then((file) => networkService.getDownloadUrl(file.uri))
        .catch(() => Promise.resolve(undefined));
    }
    const [staticThumbNailUrl, hoverThumbNailUrl] = await Promise.all(thumbNailPromises);
    return Promise.resolve({
      staticThumbNailUrl,
      hoverThumbNailUrl,
    });
  }, [firebaseConfig, event.static_thumbnail_ref, event.hover_thumbnail_ref]);

  const { state: eventThumbNailsState } = useFetchData(
    {
      isLoading: false,
      error: null,
      hasFetchRequest: true,
    },
    fetchEventThumbNails
  );

  const meetingDate = event.event_datetime?.toLocaleDateString(language, {
    timeZone: municipality.timeZone,
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const committee = event.body?.name;
  const searchWords = useMemo(() => {
    const cleanedQuery = cleanText(query || "");
    // Phrases that should be highlighted in the excerpt
    const phrases = removeStopwords(cleanedQuery.split(" "));
    if (gram && gram.length > 0) {
      phrases.push(gram);
    }
    if (phrases.length === 0) {
      return [];
    }
    return [new RegExp(`\\b(${phrases.join("|")})`, "g")];
  }, [query, gram]);
  const imgAlt = `${event.body?.name} - ${meetingDate}`;
  const tagString = tags.map((tag) => tag.toLowerCase()).join(TAG_CONNECTOR);

  return (
    <Meeting className="mzp-c-card mzp-c-card-medium mzp-has-aspect-16-9">
      <div className="mzp-c-card-block-link">
        <div className="mzp-c-card-media-wrapper">
          <AbsoluteBox>
            <PlaceholderWrapper contentIsLoading={staticThumbNailIsLoading}>
              <Images>
                <img
                  className="mzp-c-card-image"
                  src={eventThumbNailsState.data?.staticThumbNailUrl}
                  alt={imgAlt}
                  onLoad={() => setStaticThumbNailIsLoading(false)}
                />
                <img
                  className="mzp-c-card-image"
                  src={eventThumbNailsState.data?.hoverThumbNailUrl}
                  alt={imgAlt}
                />
              </Images>
            </PlaceholderWrapper>
          </AbsoluteBox>
        </div>
        <div className="mzp-c-card-content">
          <div className="mzp-c-card-tag">{strings.committee}</div>
          <h2 className="mzp-c-card-title">{meetingDate}</h2>
          <p className="mzp-c-card-desc">{committee}</p>
          {excerpt && (
            <p
              className="mzp-c-card-desc"
              style={{
                fontStyle: "italic",
                marginTop: "1rem",
              }}
            >
              <Highlighter
                caseSensitive={false}
                searchWords={searchWords}
                textToHighlight={`"${excerpt}"`}
              />
            </p>
          )}
          {tags.length > 0 && (
            <>
              <p className="mzp-c-card-meta">{strings.keywords}</p>
              <p className="mzp-c-card-desc">{tagString}</p>
            </>
          )}
        </div>
      </div>
    </Meeting>
  );
};

export default MeetingCard;
