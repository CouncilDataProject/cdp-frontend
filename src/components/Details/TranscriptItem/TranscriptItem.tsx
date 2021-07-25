import React, { FC, RefObject, RefAttributes, useRef, useImperativeHandle } from "react";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import { Popup } from "semantic-ui-react";
import styled from "@emotion/styled";

import DefaultAvatar from "../../Shared/DefaultAvatar";
import DocumentTextIcon from "../../Shared/DocumentTextIcon";
import PlayIcon from "../../Shared/PlayIcon";

import { fontSizes } from "../../../styles/fonts";

import "@mozilla-protocol/core/protocol/css/protocol.css";

const Item = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr",
  rowGap: 8,
  padding: 8,
  backgroundColor: "white",
});

const Text = styled.div({
  fontSize: fontSizes.font_size_5,
});

interface ContainerProps {
  hasMultipleActions: boolean;
}
const Container = styled.div<ContainerProps>((props) => ({
  display: "grid",
  columnGap: 4,
  gridTemplateColumns: props.hasMultipleActions ? "1fr auto auto" : "1fr auto",
  justifyContent: "start",
  alignItems: "center",
}));

const Speaker = styled.div({
  display: "grid",
  columnGap: 1,
  gridTemplateColumns: "auto auto",
  justifyContent: "start",
  alignItems: "center",
  fontSize: fontSizes.font_size_2,
  overflowWrap: "anywhere",
});

const AVATAR_SIZE = 24;
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

const Button = styled.button({
  padding: "2px 8px !important",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

/**Public API of transcript item exposing scrollIntoView method */
export interface TranscriptItemRef {
  scrollIntoView(): void;
}

interface TranscriptItemProps extends RefAttributes<HTMLDivElement> {
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
  /**Transcript item React reference */
  componentRef?: RefObject<TranscriptItemRef>;
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
  componentRef,
}: TranscriptItemProps) => {
  const transcriptItemRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(componentRef, () => ({
    /**Implements componentRef.scrollIntoView by using the inner ref transcriptItemRef */
    scrollIntoView: () => {
      transcriptItemRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    },
  }));

  const name = speakerId ? (
    <Link to={`/people/${speakerId}`}>{speakerName}</Link>
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
    <div ref={transcriptItemRef}>
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
          <div>
            <Popup
              position="top right"
              content="Jump to sentence in video"
              size="mini"
              trigger={
                <Button
                  aria-label="Jump to sentence in video"
                  className="mzp-c-button mzp-t-neutral"
                  onClick={handleVideoClick}
                >
                  <PlayIcon />
                </Button>
              }
            />
          </div>
          {handleTranscriptClick && (
            <div>
              <Popup
                position="top right"
                content="Jump to sentence in transcript"
                size="mini"
                trigger={
                  <Button
                    aria-label="Jump to sentence in transcript"
                    className="mzp-c-button mzp-t-neutral"
                    onClick={handleTranscriptClick}
                  >
                    <DocumentTextIcon />
                  </Button>
                }
              />
            </div>
          )}
        </Container>
      </Item>
    </div>
  );
};

export default TranscriptItem;
