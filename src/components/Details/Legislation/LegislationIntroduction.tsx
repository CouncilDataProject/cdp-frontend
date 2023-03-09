import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import { useMediaQuery } from "react-responsive";

import MatterStatus from "../../../models/MatterStatus";
import IndexedMatterGram from "../../../models/IndexedMatterGram";
import { DecisionResult } from "../../Shared";
import { screenWidths } from "../../../styles/mediaBreakpoints";
export interface LegislationIntroductionProps {
  matterStatus: MatterStatus;
  indexedMatterGrams: IndexedMatterGram[];
}

const Title = styled.b<{ minified: boolean; linesToShow: number }>((props) => ({
  overflow: "hidden",
  "text-overflow": "ellipsis",
  display: "-webkit-box",
  "-webkit-line-clamp": props.minified
    ? `${props.linesToShow}`
    : "none" /* number of lines to show, 'none' means no limit */,
  "line-clamp": props.minified ? `${props.linesToShow}` : "none",
  "-webkit-box-orient": "vertical",
}));

const LegislationIntroduction: FC<LegislationIntroductionProps> = ({
  matterStatus,
  indexedMatterGrams,
}: LegislationIntroductionProps) => {
  const [fullTitleVisible, setFullTitleVisible] = useState(true);

  const isMobile = useMediaQuery({ query: `(max-width: ${screenWidths.tablet})` });
  const linesToShow = isMobile ? 4 : 2;

  return (
    <div>
      <h1 className="mzp-u-title-sm">{matterStatus.matter?.name}</h1>
      <Title
        onClick={() => {
          setFullTitleVisible(!fullTitleVisible);
        }}
        minified={fullTitleVisible}
        linesToShow={linesToShow}
      >
        {matterStatus.matter?.title}
      </Title>
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
