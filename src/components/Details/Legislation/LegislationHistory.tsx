import React, { FC } from "react";

import EventMinutesItem from "../../../models/EventMinutesItem";
import H2 from "../../Shared/H2";
import Details from "../../Shared/Details";
import { LegislativeHistoryNode } from "./LegislativeHistoryNode";
import { strings } from "../../../assets/LocalizedStrings";

import styled from "@emotion/styled";

const SpacerContainer = styled.div({ marginTop: 16 });
const ColumnMakingContainer = styled.div({ display: "flex", flexDirection: "column" });

export interface LegislationHistoryProps {
  /** the timeline of a matter as represented by an ordered series of EventMinutesItem  */
  eventMinutesItems: EventMinutesItem[];
}

const LegislationHistory: FC<LegislationHistoryProps> = ({
  eventMinutesItems,
}: LegislationHistoryProps) => {
  return (
    <SpacerContainer>
      <Details
        hasBorderBottom={true}
        defaultOpen={false}
        summaryContent={
          <H2 className="mzp-u-title-xs" isInline={true}>
            {strings.history}
          </H2>
        }
        hiddenContent={
          <ColumnMakingContainer>
            {eventMinutesItems.map((eventMinutesItem, index) => {
              return (
                <LegislativeHistoryNode
                  isLastIndex={index === eventMinutesItems.length - 1}
                  key={`leg_hist_node_${eventMinutesItem.id}_${index}`}
                  eventMinutesItem={eventMinutesItem}
                />
              );
            })}
          </ColumnMakingContainer>
        }
      />
    </SpacerContainer>
  );
};

export { LegislationHistory };
