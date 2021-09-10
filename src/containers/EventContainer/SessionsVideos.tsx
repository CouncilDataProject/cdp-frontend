import React, { FC, RefObject, Dispatch, SetStateAction, useRef } from "react";

import { TabProps } from "semantic-ui-react";

import Session from "../../models/Session";

import EventVideo, { EventVideoRef } from "../../components/Details/EventVideo/EventVideo";
import ResponsiveTab from "../../components/Shared/ResponsiveTab";

import { screenWidths } from "../../styles/mediaBreakpoints";

interface SessionVideosProps {
  eventVideoRefs: RefObject<EventVideoRef>[];
  sessions: Session[];
  currentSession: number;
  setCurrentSession: Dispatch<SetStateAction<number>>;
}

const SessionVideos: FC<SessionVideosProps> = ({
  eventVideoRefs,
  sessions,
  currentSession,
  setCurrentSession,
}: SessionVideosProps) => {
  const onSessionChange = (_: any, data: TabProps) =>
    setCurrentSession((prevSessionIndex) => {
      // Pause the prev session video player
      eventVideoRefs[prevSessionIndex].current?.pause();
      return data.activeIndex as number;
    });
  const panes = useRef(
    sessions.map((session, i) => {
      return {
        menuItem: session.session_datetime?.toLocaleTimeString("en-US"),
        pane: {
          key: `session_index_${session.session_index}`,
          content: (
            <EventVideo uri={session.video_uri as string} componentRef={eventVideoRefs[i]} />
          ),
        },
      };
    })
  );

  let breakpoint = undefined;
  if (sessions.length > 3) {
    breakpoint = screenWidths.largeMobile;
  } else if (sessions.length > 2) {
    breakpoint = screenWidths.smallMobile;
  }

  return (
    <ResponsiveTab
      padding="0px"
      breakpoint={breakpoint}
      menu={{ secondary: true, pointing: true }}
      panes={panes.current}
      renderActiveOnly={false}
      activeIndex={currentSession}
      onTabChange={onSessionChange}
    />
  );
};

export default React.memo(SessionVideos);
