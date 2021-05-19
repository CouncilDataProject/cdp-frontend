import React, { FC } from "react";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import styled from "@emotion/styled";

import { fontSizes } from "../../../styles/fonts";
import { screenWidths } from "../../../styles/mediaBreakpoints";

import "@councildataproject/cdp-design/dist/colors.css";
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
    gridTemplateColumns: `auto ${props.hasMultipleActions ? "35%" : "auto"}`,
    justifyContent: "space-between",
  },
  [`@media (min-width: ${screenWidths.desktop})`]: {
    gridTemplateColumns: `auto ${props.hasMultipleActions ? "15%" : "auto"}`,
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
const DEFAULT_AVATAR = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

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
    <DefaultAvatarContainer>{DEFAULT_AVATAR}</DefaultAvatarContainer>
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
          <Action className="cdp-dark-blue" onClick={handleVideoClick}>
            Video clip
          </Action>
          {handleTranscriptClick && (
            <Action className="cdp-dark-blue" onClick={handleTranscriptClick}>
              Transcript
            </Action>
          )}
        </Actions>
      </Container>
    </Item>
  );
};

export default TranscriptItem;
