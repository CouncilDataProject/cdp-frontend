import React, { FC } from "react";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";
import styled from "@emotion/styled";

import DefaultAvatar from "../../Shared/DefaultAvatar";

import { fontSizes } from "../../../styles/fonts";

import "@mozilla-protocol/core/protocol/css/protocol.css";

const Item = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr",
  rowGap: 8,
  padding: 8,
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
  gridTemplateColumns: props.hasMultipleActions ? "1fr 1fr auto" : "1fr auto",
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

const Action = styled.button({
  justifySelf: "end",
  fontSize: fontSizes.font_size_2,
  padding: "4px 8px !important",
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
        <Action className="mzp-c-button mzp-t-neutral" onClick={handleVideoClick}>
          Video clip &#9205;
        </Action>
        {handleTranscriptClick && (
          <Action className="mzp-c-button mzp-t-neutral" onClick={handleTranscriptClick}>
            Transcript &#9205;
          </Action>
        )}
      </Container>
    </Item>
  );
};

export default TranscriptItem;
