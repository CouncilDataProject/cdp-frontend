import React, { FC, useCallback, useState, useRef, useLayoutEffect } from "react";
import useFetchData, {
  initialFetchDataState,
} from "../../../containers/FetchDataContainer/useFetchData";
import { useAppConfigContext, useLanguageConfigContext } from "../../../app";

import VoteService from "../../../networking/VoteService";

import Vote from "../../../models/Vote";
import EventMinutesItem from "../../../models/EventMinutesItem";

import { FetchDataContainer } from "../../../containers/FetchDataContainer";
import { VoteDistributionGraphic } from "./VoteDistributionGraphic";
import { Dot, DOT_SIZE } from "../../Shared/Dot";

import styled from "@emotion/styled";

import { EVENT_MINUTES_ITEM_DECISION } from "../../../models/constants";

const MARGIN = 12;

export interface LegislativeHistoryNodeProps {
  /** event in the matter's timeline */
  eventMinutesItem: EventMinutesItem;
  /** this node is the last index on the timeline */
  isLastIndex: boolean;
}

const EVENT_MINUTES_ITEM_DECISION_COLOR = {
  [EVENT_MINUTES_ITEM_DECISION.PASSED]: "cdp-bg-acceptance-green",
  [EVENT_MINUTES_ITEM_DECISION.FAILED]: "cdp-bg-rejected-red",
};

const ConnectBar = styled.div<{ height: number; top: number; left: number }>((props) => ({
  position: "absolute",
  top: props.top + DOT_SIZE,
  left: props.left + DOT_SIZE / 2,
  height: props.height + MARGIN,
  width: 2,
  zIndex: 0,
  backgroundColor: "grey",
}));

const LegislativeHistoryNode: FC<LegislativeHistoryNodeProps> = ({
  eventMinutesItem,
  isLastIndex,
}: LegislativeHistoryNodeProps) => {
  const { firebaseConfig } = useAppConfigContext();
  const { language } = useLanguageConfigContext();
  const [expanded, setExpanded] = useState(false);
  const [connectionLineValues, setConnectionLineValues] = useState({
    top: 0,
    left: 0,
    height: 0,
  });

  const divRef = useRef<HTMLDivElement>(null);
  const dotColor = eventMinutesItem.decision
    ? EVENT_MINUTES_ITEM_DECISION_COLOR[eventMinutesItem.decision]
    : "cdp-bg-neutral-grey";

  const fetchVotesForEvent = useCallback(async () => {
    if (eventMinutesItem.decision) {
      const votesService = new VoteService(firebaseConfig);
      const votes = await votesService.getVotesByEventMinutesItemId(eventMinutesItem.id);
      return Promise.resolve(votes);
    } else {
      return Promise.resolve([]);
    }
  }, [eventMinutesItem.id, firebaseConfig]);

  const { state: votesDataState } = useFetchData<Vote[]>(
    { ...initialFetchDataState },
    fetchVotesForEvent
  );

  useLayoutEffect(() => {
    if (divRef.current?.getBoundingClientRect()) {
      setConnectionLineValues((prevValues) => {
        return {
          ...prevValues,
          ["top"]: divRef.current?.getBoundingClientRect().top || 0,
          ["height"]: divRef.current?.getBoundingClientRect().height || 0,
          ["left"]: divRef.current?.getBoundingClientRect().left || 0,
        };
      });
    }
  }, [expanded]);

  return (
    <div>
      <div
        ref={divRef}
        style={{ display: "flex", flexDirection: "row", margin: 12, cursor: "pointer" }}
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        <Dot className={dotColor} />
        <div style={{ marginLeft: 12 }}>
          {eventMinutesItem.event?.event_datetime.toLocaleDateString(language, {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        {expanded && (
          <FetchDataContainer isLoading={votesDataState.isLoading} error={votesDataState.error}>
            {votesDataState.data && votesDataState.data.length > 0 && (
              <div style={{ flex: 1, marginTop: 12 }}>
                <VoteDistributionGraphic votes={votesDataState.data} />
              </div>
            )}
          </FetchDataContainer>
        )}
      </div>
      {!isLastIndex && (
        <ConnectBar
          height={connectionLineValues.height}
          top={connectionLineValues.top}
          left={connectionLineValues.left}
        />
      )}
    </div>
  );
};

export { LegislativeHistoryNode };
