import React, { FC, Dispatch, SetStateAction, RefObject } from "react";

import styled from "@emotion/styled";

import { Tab, TabProps } from "semantic-ui-react";

import { TranscriptFull } from "../../components/Details/TranscriptFull";

import { TranscriptItemRef } from "../../components/Details/TranscriptItem/TranscriptItem";
import { MinutesItemsList } from "../../components/Details/MinutesItemsList";
import { MeetingVotesTable } from "../../components/Tables/MeetingVotesTable";

import { ExtentededEventMinutesItem, SentenceWithSessionIndex } from "./types";
import { screenWidths } from "../../styles/mediaBreakpoints";

const ResponsiveTab = styled(Tab)({
  // Tab menu items on mobile
  [`@media (max-width:${screenWidths.largeMobile})`]: {
    "& > .ui.secondary.pointing.menu": {
      // Vertical tab menu instead of horizontal tab menu
      flexDirection: "column",
    },
    "& > .ui.secondary.pointing.menu > a.item": {
      // Align menu items at start, instead of end
      alignSelf: "flex-start",
      // Remove border-bottom style
      borderBottomStyle: "none",
    },
    "& > .ui.secondary.pointing.menu > a.active.item": {
      // Add border-left when menu item is active
      borderLeft: "2px solid",
    },
  },
});

interface EventInfoTabsProps {
  currentInfoTab: number;
  setCurrentInfoTab: Dispatch<SetStateAction<number>>;
  eventMinutesItems: ExtentededEventMinutesItem[];
  sentences: SentenceWithSessionIndex[];
  transcriptItemsRefs: RefObject<TranscriptItemRef>[];
  jumpToVideoClip(sessionIndex: number, startTime: number): void;
}

const EventInfoTabs: FC<EventInfoTabsProps> = ({
  currentInfoTab,
  setCurrentInfoTab,
  eventMinutesItems,
  sentences,
  transcriptItemsRefs,
  jumpToVideoClip,
}: EventInfoTabsProps) => {
  const onInfoTabChange = (_: any, data: TabProps) => setCurrentInfoTab(data.activeIndex as number);

  const minutesItems = eventMinutesItems.map(({ minutes_item, files }) => {
    return {
      item: minutes_item?.name as string,
      docs: files
        ? files.map(({ name, uri }) => {
            return {
              label: name as string,
              url: uri as string,
            };
          })
        : undefined,
    };
  });

  const votesPage: object[] = [];
  eventMinutesItems.forEach(({ votes, minutes_item, decision }) => {
    if (votes) {
      votesPage.push({
        matter: {
          name: minutes_item?.name,
          description: minutes_item?.description,
          id: minutes_item?.matter?.id,
        },
        council_decision: decision,
        votes: votes.map(({ person, decision, id }) => {
          return {
            personId: person?.id,
            name: person?.name,
            decision: decision,
            id: id,
          };
        }),
      });
    }
  });

  const infoTabPanes = [
    {
      menuItem: "Minutes and Documents",
      pane: {
        key: "minutes-and-documents",
        content: <MinutesItemsList minutesItems={minutesItems} />,
      },
    },
    {
      menuItem: "Full Transcript",
      pane: {
        key: "full-transcript",
        content: (
          <TranscriptFull
            sentences={sentences}
            transcriptItemsRefs={transcriptItemsRefs}
            jumpToVideoClip={jumpToVideoClip}
          />
        ),
      },
    },
    {
      menuItem: "Votes",
      pane: { key: "votes", content: <MeetingVotesTable votesPage={votesPage} /> },
    },
  ];

  return (
    <ResponsiveTab
      menu={{ secondary: true, pointing: true }}
      panes={infoTabPanes}
      activeIndex={currentInfoTab}
      onTabChange={onInfoTabChange}
      renderActiveOnly={false}
    />
  );
};

export default React.memo(EventInfoTabs);
