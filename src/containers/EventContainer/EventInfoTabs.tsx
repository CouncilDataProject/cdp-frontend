import React, { FC, Dispatch, SetStateAction, RefObject } from "react";

import { TabProps } from "semantic-ui-react";

import EventMinutesItem from "../../models/EventMinutesItem";
import EventMinutesItemFile from "../../models/EventMinutesItemFile";
import Vote from "../../models/Vote";

import { TranscriptFull } from "../../components/Details/TranscriptFull";
import { TranscriptItemRef } from "../../components/Details/TranscriptItem/TranscriptItem";
import { MinutesItemsList } from "../../components/Details/MinutesItemsList";
import { MeetingVotesTable } from "../../components/Tables/MeetingVotesTable";
import ResponsiveTab from "../../components/Shared/ResponsiveTab";

import { SentenceWithSessionIndex } from "./types";
import { strings } from "../../assets/LocalizedStrings";

interface EventInfoTabsProps {
  currentInfoTab: number;
  setCurrentInfoTab: Dispatch<SetStateAction<number>>;
  sentences: SentenceWithSessionIndex[];
  transcriptItemsRefs: RefObject<TranscriptItemRef>[];
  eventMinutesItems: EventMinutesItem[];
  eventMinutesItemsFiles: EventMinutesItemFile[][];
  votes: Vote[][];
  jumpToVideoClip(sessionIndex: number, startTime: number): void;
}

const EventInfoTabs: FC<EventInfoTabsProps> = ({
  currentInfoTab,
  setCurrentInfoTab,
  sentences,
  transcriptItemsRefs,
  eventMinutesItems,
  eventMinutesItemsFiles,
  votes,
  jumpToVideoClip,
}: EventInfoTabsProps) => {
  const onInfoTabChange = (_: any, data: TabProps) => setCurrentInfoTab(data.activeIndex as number);

  const minutesItems = eventMinutesItems.map(({ minutes_item }, i) => {
    const files = eventMinutesItemsFiles[i];
    return {
      name: minutes_item?.name as string,
      description: minutes_item?.description,
      documents:
        files && files.length > 0
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
  eventMinutesItems.forEach(({ minutes_item, decision }, i) => {
    const votesForEventMinutesItem = votes[i];
    if (votesForEventMinutesItem && votesForEventMinutesItem.length > 0) {
      votesPage.push({
        matter: {
          name: minutes_item?.name,
          description: minutes_item?.description,
          id: minutes_item?.matter?.id,
        },
        council_decision: decision,
        votes: votesForEventMinutesItem.map(({ person, decision, id }) => {
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
      menuItem: strings.agenda,
      pane: {
        key: "agenda",
        content: <MinutesItemsList minutesItems={minutesItems} />,
      },
    },
    {
      menuItem: strings.transcript,
      pane: {
        key: "transcript",
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
      menuItem: strings.votes,
      pane: { key: "votes", content: <MeetingVotesTable votesPage={votesPage} /> },
    },
  ];

  return (
    <ResponsiveTab
      padding="16px"
      menu={{ secondary: true, pointing: true }}
      panes={infoTabPanes}
      activeIndex={currentInfoTab}
      onTabChange={onInfoTabChange}
      renderActiveOnly={false}
    />
  );
};

export default React.memo(EventInfoTabs);
