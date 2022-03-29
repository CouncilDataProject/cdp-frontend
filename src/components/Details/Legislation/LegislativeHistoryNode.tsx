import React, { FC, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useAppConfigContext, useLanguageConfigContext } from "../../../app";

import VoteService from "../../../networking/VoteService";
import EventMinutesItemFileService from "../../../networking/EventMinutesItemFileService";

import Vote from "../../../models/Vote";
import EventMinutesItem from "../../../models/EventMinutesItem";
import { VoteDistributionGraphic } from "./VoteDistributionGraphic";
import { Dot, DOT_SIZE } from "../../Shared/Dot";
import DocumentsList from "../MinutesItemsList/DocumentsList";
import { Document } from "../MinutesItemsList/types";

import useFetchData, {
  initialFetchDataState,
} from "../../../containers/FetchDataContainer/useFetchData";
import LazyFetchDataContainer from "../../../containers/FetchDataContainer/LazyFetchDataContainer";

import styled from "@emotion/styled";
import Details from "../../Shared/Details";
import { strings } from "../../../assets/LocalizedStrings";
import { screenWidths } from "../../../styles/mediaBreakpoints";
import { DecisionResult } from "../../Shared";
export interface LegislativeHistoryNodeProps {
  /** event in the matter's timeline */
  eventMinutesItem: EventMinutesItem;
  /** this node is the last index on the timeline */
  isLastIndex: boolean;
}

interface LegislativeHistoryNodeData {
  votes?: Vote[];
  files?: Document[];
}

const LegislativeHistoryNode: FC<LegislativeHistoryNodeProps> = ({
  eventMinutesItem,
  isLastIndex,
}: LegislativeHistoryNodeProps) => {
  const { municipality } = useAppConfigContext();

  const isMobile = useMediaQuery({ query: `(max-width: ${screenWidths.tablet})` });
  const MARGIN = isMobile ? 4 : 12;

  const ReferenceFrame = styled.div({ position: "relative" });
  const ExpandingContainer = styled.div({
    margin: MARGIN,
    display: "flex",
    flexDirection: "row",
    gap: MARGIN * 3,
  });
  const TextContainer = styled.div({ flex: 1 });
  const SummaryInfo = styled.div({ display: "flex", flexDirection: "row" });
  const VotingGraphicContainer = styled.div(() => ({
    flex: 1,
    marginTop: MARGIN,
    marginLeft: isMobile ? 0 : MARGIN * 2,
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
  const localizedDateString = eventMinutesItem.event?.event_datetime.toLocaleDateString(language, {
    timeZone: municipality.timeZone,
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const fetchDataForNode = useCallback(async () => {
    const data: LegislativeHistoryNodeData = {
      votes: [],
      files: [],
    };
    const eventMinutesItemFileService = new EventMinutesItemFileService(firebaseConfig);
    const minutesItemFiles =
      await eventMinutesItemFileService.getEventMinutesItemFilesByEventMinutesItemId(
        eventMinutesItem.id
      );
    data.files = minutesItemFiles.map(({ name, uri }) => {
      return {
        label: name,
        url: uri,
      };
    });
    if (eventMinutesItem.decision) {
      const votesService = new VoteService(firebaseConfig);
      data.votes = await votesService.getVotesByEventMinutesItemId(eventMinutesItem.id);
    }

    return Promise.resolve(data);
  }, [eventMinutesItem.id, eventMinutesItem.decision, firebaseConfig]);

  const { state: votesDataState } = useFetchData<LegislativeHistoryNodeData>(
    { ...initialFetchDataState },
    fetchDataForNode
  );

  return (
    <ReferenceFrame>
      <ExpandingContainer>
        <Dot className={"cdp-bg-neutral-grey"} />
        <TextContainer>
          <SummaryInfo>
            <Link to={`/events/${eventMinutesItem.event?.id}`}>{localizedDateString}</Link>
            {eventMinutesItem.decision && (
              <DecisionResult
                result={eventMinutesItem.decision}
                style={{
                  marginLeft: MARGIN,
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                }}
              />
            )}
          </SummaryInfo>
          <LazyFetchDataContainer
            data="votes and documents associated with this event"
            isLoading={votesDataState.isLoading}
            error={votesDataState.error}
            notFound={!votesDataState.data}
          >
            {votesDataState.data?.votes && votesDataState.data?.votes.length > 0 && (
              <Details
                summaryContent={strings.votes}
                hiddenContent={
                  <VotingGraphicContainer>
                    <VoteDistributionGraphic votes={votesDataState.data?.votes} />
                  </VotingGraphicContainer>
                }
                defaultOpen={false}
                hasBorderBottom={false}
              />
            )}
            {votesDataState.data?.files && votesDataState.data?.files.length > 0 && (
              <DocumentsList documents={votesDataState.data?.files} />
            )}
          </LazyFetchDataContainer>
        </TextContainer>
      </ExpandingContainer>
      {!isLastIndex && <ConnectBar />}
    </ReferenceFrame>
  );
};

export { LegislativeHistoryNode };
