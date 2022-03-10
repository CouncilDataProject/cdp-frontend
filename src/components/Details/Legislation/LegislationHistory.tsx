import React, { FC } from "react";

import EventMinutesItem from "../../../models/EventMinutesItem";
import H2 from "../../Shared/H2";
import Details from "../../Shared/Details";
import { LegislativeHistoryNode } from "./LegislativeHistoryNode";
import { strings } from "../../../assets/LocalizedStrings";

export interface LegislationHistoryProps {
  /** the timeline of a matter as represented by an ordered series of EventMinutesItem  */
  eventMinutesItems: EventMinutesItem[];
}

const LegislationHistory: FC<LegislationHistoryProps> = ({
  eventMinutesItems,
}: LegislationHistoryProps) => {
  return (
    <div style={{ marginTop: 16 }}>
      <Details
        hasBorderBottom={true}
        defaultOpen={false}
        summaryContent={
          <H2 className="mzp-u-title-xs" isInline={true}>
            History
          </H2>
        }
        hiddenContent={
          <div style={{ display: "flex", flexDirection: "column" }}>
            {eventMinutesItems.map((eventMinutesItem, index) => {
              if (index === eventMinutesItems.length - 1) {
                return (
                  <LegislativeHistoryNode
                    isLastIndex={true}
                    key={`leg_hist_node_${eventMinutesItem.id}_${index}`}
                    eventMinutesItem={eventMinutesItem}
                  />
                );
              } else {
                return (
                  <LegislativeHistoryNode
                    isLastIndex={false}
                    key={`leg_hist_node_${eventMinutesItem.id}_${index}`}
                    eventMinutesItem={eventMinutesItem}
                  />
                );
              }
            })}
          </div>
        }
      />
    </div>
  );
};

export { LegislationHistory };
