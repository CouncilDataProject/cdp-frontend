import React, { FC, RefObject, Dispatch, SetStateAction, useRef } from "react";

import { TabProps } from "semantic-ui-react";

import Session from "../../models/Session";

import EventVideo, { EventVideoRef } from "../../components/Details/EventVideo/EventVideo";
import ResponsiveTab from "../../components/Shared/ResponsiveTab";

import { screenWidths } from "../../styles/mediaBreakpoints";
import { strings } from "../../assets/LocalizedStrings";

interface SessionVideosProps {
  eventVideoRefs: RefObject<EventVideoRef>[];
  sessions: Session[];
  currentSession: number;
  initialSeconds: number;
  setCurrentSession: Dispatch<SetStateAction<number>>;
}

const SessionVideos: FC<SessionVideosProps> = ({
  eventVideoRefs,
  sessions,
  currentSession,
  initialSeconds,
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
        menuItem: `${strings.session} ${i + 1}`,
        pane: {
          key: `session_index_${i + 1}`,
          content: (
            <EventVideo
              sessionIndex={i}
              initialSeconds={i === currentSession ? initialSeconds : 0}
              uri={session.video_uri as string}
              componentRef={eventVideoRefs[i]}
            />
          ),
        },
      };
    })
  );

  const breakpoint = sessions.length > 3 ? screenWidths.largeMobile : screenWidths.smallMobile;

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
