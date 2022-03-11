import React, { FC, useCallback, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAppConfigContext, useLanguageConfigContext } from "../../../app";

import VoteService from "../../../networking/VoteService";

import Vote from "../../../models/Vote";
import EventMinutesItem from "../../../models/EventMinutesItem";
import { EVENT_MINUTES_ITEM_DECISION } from "../../../models/constants";
import { VoteDistributionGraphic } from "./VoteDistributionGraphic";
import { Dot, DOT_SIZE } from "../../Shared/Dot";

import useFetchData, {
  initialFetchDataState,
} from "../../../containers/FetchDataContainer/useFetchData";
import { FetchDataContainer } from "../../../containers/FetchDataContainer";

import styled from "@emotion/styled";
import Details from "../../Shared/Details";
import { strings } from "../../../assets/LocalizedStrings";
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
const MARGIN = 12;

const ReferenceFrame = styled.div({ position: "relative" });
const ExpandingContainer = styled.div({
  margin: MARGIN,
  display: "flex",
  flexDirection: "row",
  gap: 32,
});
const TextContainer = styled.div({ flex: 1 });
const VotingGraphicContainer = styled.div({ flex: 1, marginTop: MARGIN, marginLeft: MARGIN * 2 });
const TitleBox = styled.div({ display: "flex", flexDirection: "row", cursor: "pointer" });

const ConnectBar = styled.div({
  position: "absolute",
  top: MARGIN + DOT_SIZE,
  left: DOT_SIZE / 2 + MARGIN,
  height: "100%",
  width: 2,
  zIndex: 0,
  backgroundColor: "grey",
});

const LegislativeHistoryNode: FC<LegislativeHistoryNodeProps> = ({
  eventMinutesItem,
  isLastIndex,
}: LegislativeHistoryNodeProps) => {
  const { firebaseConfig } = useAppConfigContext();
  const { language } = useLanguageConfigContext();
  const [expanded, setExpanded] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);
  const dotColor = eventMinutesItem.decision
    ? EVENT_MINUTES_ITEM_DECISION_COLOR[eventMinutesItem.decision]
    : "cdp-bg-neutral-grey";
  const localizedDateString = eventMinutesItem.event?.event_datetime.toLocaleDateString(language, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const fetchVotesForEvent = useCallback(async () => {
    if (eventMinutesItem.decision) {
      const votesService = new VoteService(firebaseConfig);
      const votes = await votesService.getVotesByEventMinutesItemId(eventMinutesItem.id);
      return Promise.resolve(votes);
    } else {
      return Promise.resolve([]);
    }
  }, [eventMinutesItem.id, eventMinutesItem.decision, firebaseConfig]);

  const { state: votesDataState } = useFetchData<Vote[]>(
    { ...initialFetchDataState },
    fetchVotesForEvent
  );

  return (
    <ReferenceFrame>
      <ExpandingContainer>
        <Dot className={dotColor} />
        <TextContainer>
          <Link to={`/events/${eventMinutesItem.event?.id}`}>{localizedDateString}</Link>
          {votesDataState.data && votesDataState.data.length > 0 && (
            <Details
              summaryContent={strings.votes}
              hiddenContent={
                <FetchDataContainer
                  isLoading={votesDataState.isLoading}
                  error={votesDataState.error}
                >
                  {votesDataState.data && votesDataState.data.length > 0 && (
                    <VotingGraphicContainer>
                      <VoteDistributionGraphic votes={votesDataState.data} />
                    </VotingGraphicContainer>
                  )}
                </FetchDataContainer>
              }
              defaultOpen={false}
              hasBorderBottom={false}
            />
          )}
        </TextContainer>
      </ExpandingContainer>
      {!isLastIndex && <ConnectBar />}
    </ReferenceFrame>
  );
};

export { LegislativeHistoryNode };
