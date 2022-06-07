import React from "react";
import styled from "@emotion/styled";

import MatterStatus from "../../models/MatterStatus";
import Event from "../../models/Event";
import Person from "../../models/Person";
import Vote from "../../models/Vote";
import IndexedMatterGram from "../../models/IndexedMatterGram";
import EventMinutesItem from "../../models/EventMinutesItem";

import LegislationIntroduction from "../../components/Details/Legislation/LegislationIntroduction";
import LegislationOverview from "../../components/Details/Legislation/LegislationOverview";
import { LegislationLatestVote } from "../../components/Details/Legislation/LegislationLatestVote";
import { LegislationHistory } from "../../components/Details/Legislation/LegislationHistory";

const Matter = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr",
  rowGap: 64,
});
interface MatterContainerProps {
  matterStatus: MatterStatus;
  indexedMatterGrams: IndexedMatterGram[];
  event?: Event;
  sponsors: Person[];
  votes?: Vote[];
  legislationHistory?: EventMinutesItem[];
}

const MatterContainer = ({
  matterStatus,
  indexedMatterGrams,
  event,
  sponsors,
  votes,
  legislationHistory,
}: MatterContainerProps) => {
  return (
    <Matter>
      <LegislationIntroduction
        matterStatus={matterStatus}
        indexedMatterGrams={indexedMatterGrams}
      />
      <LegislationOverview matterStatus={matterStatus} event={event} sponsors={sponsors} />
      {votes && <LegislationLatestVote votes={votes} />}
      {legislationHistory && <LegislationHistory eventMinutesItems={legislationHistory} />}
    </Matter>
  );
};

export default MatterContainer;
