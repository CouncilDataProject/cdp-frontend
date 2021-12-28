import React, { FC, useRef, useReducer, ChangeEvent, useCallback, KeyboardEvent } from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import { Modal } from "semantic-ui-react";

import { TimePointActionType, timePointReducer, initialTimePoint } from "./state";
import { timePointToSeconds } from "./utils";
import ShareIcon from "../../../Shared/ShareIcon";

import colors from "../../../../styles/colors";

const ShareBtn = styled.button({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 4,
  columnGap: 4,
  border: 0,
  padding: "8px 16px",
  fontWeight: 600,
  "& > svg": {
    width: "1rem",
    height: "1rem",
  },
});

const ShareLink = styled.div({
  border: `1px solid ${colors.lightgrey}`,
  borderRadius: 2,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  columnGap: 24,
  "& > input": {
    flex: 1,
    border: 0,
    marginLeft: 16,
  },
  "& > .mzp-c-button": {
    padding: "8px 16px",
    fontWeight: 600,
    border: 0,
  },
  "& > .mzp-c-button, & > .mzp-c-button:hover": {
    color: colors.dark_blue,
  },
});

const TimePoint = styled.div({
  display: "flex",
  alignItems: "center",
  columnGap: 8,
  "& > label": {
    padding: 0,
  },
});

const TimePointInput = styled.input<{ disabled: boolean }>((props) => ({
  border: 0,
  borderBottomColor: props.disabled ? "white" : "black",
  borderBottomStyle: "solid",
  borderBottomWidth: "1.5px",
  width: 64,
}));

const ShareVideoModal = styled(Modal)({
  "i.close.icon": {
    // move close icon inside modal
    top: 0,
    right: 0,
    color: "black",
  },
  "i.close::before": {
    // change icon to ✖
    content: '"\u2716"',
  },
});

interface ShareVideoProps {
  sessionNum: number;
  getCurrentTime(): number;
}

const ShareVideo: FC<ShareVideoProps> = ({ sessionNum, getCurrentTime }: ShareVideoProps) => {
  // A reference to the html element where the modal is mounted
  const mountNodeRef = useRef<HTMLDivElement>(null);
  // A reference to the share link url html element
  const shareLinkInputRef = useRef<HTMLInputElement>(null);
  // A reference to the time point input html element
  const timePointInputRef = useRef<HTMLInputElement>(null);
  // Get the location object that represents the current URL
  const location = useLocation();
  // timePointState is a React state. dispatch timePointDispatch is used to send an action to timePointReducer
  // to change the timePoint state
  const [timePointState, timePointDispatch] = useReducer(timePointReducer, initialTimePoint);

  // Callback to handle opening of modal
  const handleOpen = useCallback(() => {
    const currentTime = getCurrentTime();
    // initially, the time point value is the video's current time
    timePointDispatch({ type: TimePointActionType.OPEN, payload: currentTime });
  }, [getCurrentTime]);

  // Callback to handle closing of modal
  const handleClose = () => {
    timePointDispatch({ type: TimePointActionType.CLOSE });
  };

  // Callback to handle `Start at` checkbox changes
  const onShareWithTimePointChange = (e: ChangeEvent<HTMLInputElement>) => {
    timePointDispatch({
      type: TimePointActionType.VALIDATE_VALUE,
      payload: e.target.checked,
    });
  };

  // Callback to handle copy share link url button click
  const onCopyShareLink = async () => {
    // select the content of shareLinkInputRef, which is the share link url
    shareLinkInputRef.current?.select();
    if (navigator.clipboard) {
      // use clipboard api if it's available
      await navigator.clipboard.writeText(getShareLink());
    } else {
      // fall back to deprecated method
      // copy the content to the clipboard
      document.execCommand("copy");
    }
  };

  // Callback to handle time point value changes
  const onTimePointInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    timePointDispatch({ type: TimePointActionType.UPDATE_VALUE, payload: e.target.value });
  };

  // Callback to handle when the time point input html element becomes out of focus
  const onExitTimePointInput = () => {
    timePointDispatch({ type: TimePointActionType.VALIDATE_VALUE });
  };

  // Callback to handle when the user press enter while the time point input html element is in focus
  const onSubmitTimePointInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      timePointDispatch({ type: TimePointActionType.VALIDATE_VALUE });
    }
  };

  // Get the share link url
  const getShareLink = useCallback(() => {
    const totalSeconds = timePointToSeconds(timePointState.value);
    const shareLink = `${document.location.href.split("#")[0]}#${
      location.pathname
    }?s=${sessionNum}`;
    return timePointState.isActive && !isNaN(totalSeconds)
      ? `${shareLink}&t=${totalSeconds}`
      : `${shareLink}`;
  }, [timePointState.value, timePointState.isActive, sessionNum, location]);

  return (
    <>
      <ShareVideoModal
        closeIcon
        trigger={
          <ShareBtn className="mzp-c-button mzp-t-secondary" onClick={handleOpen}>
            <ShareIcon />
            SHARE
          </ShareBtn>
        }
        open={timePointState.isOpen}
        onClose={handleClose}
        mountNode={mountNodeRef.current}
        size="small"
      >
        <Modal.Header>Share</Modal.Header>
        <Modal.Content>
          <ShareLink>
            <input readOnly aria-readonly ref={shareLinkInputRef} value={getShareLink()} />
            <button className="mzp-c-button mzp-t-secondary" onClick={onCopyShareLink}>
              COPY
            </button>
          </ShareLink>
          <br />
          <TimePoint>
            <input
              id="share-with-time-point"
              type="checkbox"
              checked={timePointState.isActive}
              onChange={onShareWithTimePointChange}
            />
            <label htmlFor="share-with-time-point">Start at</label>
            <TimePointInput
              disabled={timePointState.isDisabled}
              value={timePointState.value}
              onChange={onTimePointInputChange}
              onBlur={onExitTimePointInput}
              onKeyUp={onSubmitTimePointInput}
              ref={timePointInputRef}
            />
          </TimePoint>
        </Modal.Content>
      </ShareVideoModal>
      <div ref={mountNodeRef} />
    </>
  );
};

export default ShareVideo;
