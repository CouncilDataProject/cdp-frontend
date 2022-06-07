import React, { FC } from "react";
import MatterStatus from "../../../models/MatterStatus";
import IndexedMatterGram from "../../../models/IndexedMatterGram";
import { DecisionResult } from "../../Shared";

export interface LegislationIntroductionProps {
  matterStatus: MatterStatus;
  indexedMatterGrams: IndexedMatterGram[];
}

const LegislationIntroduction: FC<LegislationIntroductionProps> = ({
  matterStatus,
  indexedMatterGrams,
}: LegislationIntroductionProps) => {
  return (
    <div>
      <h1 className="mzp-u-title-sm">{matterStatus.matter?.name}</h1>
      <b>{matterStatus.matter?.title}</b>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          marginTop: 12,
          marginBottom: 12,
        }}
      >
        <DecisionResult
          result={matterStatus.status}
          style={{ display: "flex", alignItems: "center", flex: 0, whiteSpace: "nowrap" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "left",
            alignItems: "center",
            flex: 1,
          }}
        >
          {indexedMatterGrams &&
            indexedMatterGrams.map((indexedMatterGram) => (
              <div key={indexedMatterGram.id}>
                <p style={{ display: "inline", paddingLeft: 11, paddingRight: 11 }}>•</p>
                <p style={{ display: "inline" }}>{indexedMatterGram.unstemmed_gram}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LegislationIntroduction;
