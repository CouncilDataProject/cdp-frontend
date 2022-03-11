import React, { FC, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
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
import LazyFetchDataContainer from "../../../containers/FetchDataContainer/LazyFetchDataContainer";

import styled from "@emotion/styled";
import Details from "../../Shared/Details";
import { strings } from "../../../assets/LocalizedStrings";
import { screenWidths } from "../../../styles/mediaBreakpoints";
export interface LegislativeHistoryNodeProps {
  /** event in the matter's timeline */
  eventMinutesItem: EventMinutesItem;
  /** this node is the last index on the timeline */
  isLastIndex: boolean;
}

const LegislativeHistoryNode: FC<LegislativeHistoryNodeProps> = ({
  eventMinutesItem,
  isLastIndex,
}: LegislativeHistoryNodeProps) => {
  const isMobile = useMediaQuery({ query: `(max-width: ${screenWidths.tablet})` });

  const EVENT_MINUTES_ITEM_DECISION_COLOR = {
    [EVENT_MINUTES_ITEM_DECISION.PASSED]: "cdp-bg-acceptance-green",
    [EVENT_MINUTES_ITEM_DECISION.FAILED]: "cdp-bg-rejected-red",
  };
  const MARGIN = isMobile ? 4 : 12;

  const ReferenceFrame = styled.div({ position: "relative" });
  const ExpandingContainer = styled.div({
    margin: MARGIN,
    display: "flex",
    flexDirection: "row",
    gap: MARGIN * 3,
  });
  const TextContainer = styled.div({ flex: 1 });
  const VotingGraphicContainer = styled.div<{ marginLeft: number }>((props) => ({
    flex: 1,
    marginTop: MARGIN,
    marginLeft: props.marginLeft,
  }));

  const ConnectBar = styled.div({
    position: "absolute",
    top: MARGIN + DOT_SIZE,
    left: DOT_SIZE / 2 + MARGIN,
    height: "100%",
    width: 2,
    zIndex: 0,
    backgroundColor: "grey",
  });

  const { firebaseConfig } = useAppConfigContext();
  const { language } = useLanguageConfigContext();
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
                <LazyFetchDataContainer
                  data="votesDataState"
                  isLoading={votesDataState.isLoading}
                  error={votesDataState.error}
                  notFound={!votesDataState.data || votesDataState.data.length === 0}
                >
                  {votesDataState.data && votesDataState.data.length > 0 && (
                    <VotingGraphicContainer marginLeft={isMobile ? 0 : MARGIN * 2}>
                      <VoteDistributionGraphic votes={votesDataState.data} />
                    </VotingGraphicContainer>
                  )}
                </LazyFetchDataContainer>
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
