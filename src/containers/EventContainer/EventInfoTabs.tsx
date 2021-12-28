import React, { FC, Dispatch, SetStateAction, RefObject, useMemo } from "react";

import { TabProps } from "semantic-ui-react";

import Vote from "../../models/Vote";

import { TranscriptFull } from "../../components/Details/TranscriptFull";
import { TranscriptItemRef } from "../../components/Details/TranscriptItem/TranscriptItem";
import { MinutesItemsList } from "../../components/Details/MinutesItemsList";
import { MeetingVotesTable } from "../../components/Tables/MeetingVotesTable";
import ResponsiveTab from "../../components/Shared/ResponsiveTab";
import { EventMinutesItemWithFiles, SentenceWithSessionIndex } from "./types";

import { strings } from "../../assets/LocalizedStrings";

interface EventInfoTabsProps {
  currentInfoTab: number;
  setCurrentInfoTab: Dispatch<SetStateAction<number>>;
  sentences?: SentenceWithSessionIndex[];
  transcriptItemsRefs: RefObject<TranscriptItemRef>[];
  eventMinutesItems: EventMinutesItemWithFiles[];
  votes: Vote[];
  jumpToVideoClip(sessionIndex: number, startTime: number): void;
}

const EventInfoTabs: FC<EventInfoTabsProps> = ({
  currentInfoTab,
  setCurrentInfoTab,
  sentences,
  transcriptItemsRefs,
  eventMinutesItems,
  votes,
  jumpToVideoClip,
}: EventInfoTabsProps) => {
  const onInfoTabChange = (_: any, data: TabProps) => setCurrentInfoTab(data.activeIndex as number);

  const minutesItems = useMemo(() => {
    return eventMinutesItems.map(({ minutes_item, files }) => {
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
  }, [eventMinutesItems]);

  const votesByEventMinutesItemDict = useMemo(() => {
    return votes.reduce((dict, vote) => {
      if (!Object.keys(dict).includes(vote.event_minutes_item_ref as string)) {
        dict[vote.event_minutes_item_ref as string] = [];
      }
      dict[vote.event_minutes_item_ref as string].push(vote);
      return dict;
    }, {} as Record<string, Vote[]>);
  }, [votes]);

  const votesByEventMinutesItem = useMemo(() => {
    return eventMinutesItems.map((eventMinutesItem) => {
      return votesByEventMinutesItemDict[eventMinutesItem.id as string] || [];
    });
  }, [votesByEventMinutesItemDict, eventMinutesItems]);

  const votesPage = useMemo(() => {
    const votesPage: object[] = [];
    eventMinutesItems.forEach(({ minutes_item, decision }, i) => {
      const votesForEventMinutesItem = votesByEventMinutesItem[i];
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
    return votesPage;
  }, [eventMinutesItems, votesByEventMinutesItem]);

  const infoTabPanes = useMemo(() => {
    return [
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
          content: sentences ? (
            <TranscriptFull
              sentences={sentences}
              transcriptItemsRefs={transcriptItemsRefs}
              jumpToVideoClip={jumpToVideoClip}
            />
          ) : (
            <div>Fetching transcript...</div>
          ),
        },
      },
      {
        menuItem: strings.votes,
        pane: { key: "votes", content: <MeetingVotesTable votesPage={votesPage} /> },
      },
    ];
  }, [minutesItems, sentences, transcriptItemsRefs, jumpToVideoClip, votesPage]);

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
