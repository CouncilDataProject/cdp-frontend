import React, { FC } from "react";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import styled from "@emotion/styled";

import DefaultAvatar from "../../Shared/DefaultAvatar";

import { fontSizes } from "../../../styles/fonts";
import { screenWidths } from "../../../styles/mediaBreakpoints";

import "@mozilla-protocol/core/protocol/css/protocol.css";

const Item = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr",
  rowGap: 8,
  padding: 16,
});

const Text = styled.div({
  fontSize: fontSizes.font_size_5,
});

interface ContainerProps {
  hasMultipleActions: boolean;
}
const Container = styled.div<ContainerProps>((props) => ({
  fontSize: fontSizes.font_size_4,
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  alignItems: "center",
  [`@media (min-width: ${screenWidths.tablet})`]: {
    gridTemplateColumns: `auto ${props.hasMultipleActions ? "50%" : "auto"}`,
    justifyContent: "space-between",
  },
  [`@media (min-width: ${screenWidths.desktop})`]: {
    gridTemplateColumns: `auto ${props.hasMultipleActions ? "20%" : "auto"}`,
  },
}));

const Speaker = styled.div({
  display: "grid",
  columnGap: 4,
  gridTemplateColumns: "auto auto",
  alignItems: "center",
});

const AVATAR_SIZE = 48;
const SpeakerPicture = styled.img({
  objectFit: "cover",
  objectPosition: "center",
  borderRadius: "50%",
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
});
const DefaultAvatarContainer = styled.div({
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
});

const Actions = styled.div({
  display: "grid",
  gridTemplateColumns: "auto",
  justifyContent: "end",
  [`@media (min-width: ${screenWidths.tablet})`]: {
    padding: "0 16px",
    gridTemplateColumns: "auto auto",
    justifyContent: "space-between",
  },
});

const Action = styled.div({
  cursor: "pointer",
});

interface TranscriptItemProps {
  /**The speaker's name */
  speakerName: string;
  /**The transcript item's text */
  text: string;
  /**The start time of transcript item  */
  startTime: string;
  /**Callback to handle user clicking `Video clip` */
  handleVideoClick(): void;
  /**The speaker's id */
  speakerId?: string;
  /**The speaker's picture src */
  speakerPictureSrc?: string;
  /**A search query */
  searchQuery?: string;
  /**Callback to handle user clicking `Transcript` */
  handleTranscriptClick?(): void;
}

const TranscriptItem: FC<TranscriptItemProps> = ({
  speakerName,
  text,
  startTime,
  speakerId,
  speakerPictureSrc,
  searchQuery,
  handleVideoClick,
  handleTranscriptClick,
}: TranscriptItemProps) => {
  const name = speakerId ? (
    <Link to={`people/${speakerId}`}>{speakerName}</Link>
  ) : (
    <div>{speakerName}</div>
  );

  const avatar = speakerPictureSrc ? (
    <SpeakerPicture src={speakerPictureSrc} alt={speakerName} />
  ) : (
    <DefaultAvatarContainer>
      <DefaultAvatar />
    </DefaultAvatarContainer>
  );

  return (
    <Item>
      <Text>
        <Highlighter
          searchWords={(searchQuery?.trim() || "").split(/\s+/g)}
          autoEscape={true}
          textToHighlight={text}
        />
      </Text>
      <Container hasMultipleActions={handleTranscriptClick !== undefined}>
        <Speaker>
          {avatar}
          <div>
            {name}
            <p>{startTime}</p>
          </div>
        </Speaker>
        <Actions>
          <button className="mzp-c-button mzp-t-neutral mzp-t-md" onClick={handleVideoClick}>
            Video clip
          </button>
          {handleTranscriptClick && (
            <button className="mzp-c-button mzp-t-neutral mzp-t-md" onClick={handleTranscriptClick}>
              Transcript
            </button>
          )}
        </Actions>
      </Container>
    </Item>
  );
};

export default TranscriptItem;
