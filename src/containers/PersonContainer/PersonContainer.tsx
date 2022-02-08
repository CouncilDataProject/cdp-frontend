import React, { useMemo } from "react";
import styled from "@emotion/styled";

import useDocumentTitle from "../../hooks/useDocumentTitle";

import { getUniqueTermRoles, partitionNonTermRoles } from "../../models/util/RoleUtilities";

import { VotingTable } from "../../components/Tables/VotingTable";
import { Biography } from "./Biography";
import { CoverImage } from "./CoverImage";
import MattersSponsored from "./MattersSponsored";
import { PersonPageData } from "./types";

import { fontSizes } from "../../styles/fonts";

const Person = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr",
  rowGap: 64,
});

const PageTitle = styled.h1({
  margin: 0,
  "& > span:first-of-type": {
    fontSize: "inherit",
    fontWeight: "inherit",
  },
  "& > span:nth-of-type(2)": {
    marginLeft: 16,
    padding: "0px 8px",
    borderRadius: 4,
    fontSize: fontSizes.font_size_7,
    fontWeight: 300,
  },
  "& > p": {
    fontSize: fontSizes.font_size_7,
    fontWeight: 400,
  },
});

export interface PersonContainerProps extends PersonPageData {
  /** Any extra info */
  searchQuery?: string;
}

const PersonContainer = ({
  person,
  votes,
  roles,
  councilMemberRoles,
  mattersSponsored,
  personPictureSrc,
  seatPictureSrc,
}: PersonContainerProps) => {
  const mostRecentCouncilMemberRole = councilMemberRoles[0];
  const personIsActive =
    !mostRecentCouncilMemberRole.end_datetime ||
    mostRecentCouncilMemberRole.end_datetime > new Date();

  const [termRoles, nonTermRoles] = useMemo(() => {
    const termRoles = getUniqueTermRoles(councilMemberRoles);
    const nonTermRoles = partitionNonTermRoles(roles, termRoles);
    return [termRoles, nonTermRoles];
  }, [roles, councilMemberRoles]);

  useDocumentTitle(person.name);

  return (
    <Person>
      <CoverImage
        personName={person.name}
        personPictureSrc={personPictureSrc}
        seatPictureSrc={seatPictureSrc}
        electoralArea={mostRecentCouncilMemberRole.seat?.electoral_area}
      />
      <PageTitle className="mzp-u-title-sm">
        <span>{person.name}</span>
        <span className={personIsActive ? "cdp-bg-neon-green" : "cdp-bg-dark-grey"}>
          {personIsActive ? "active" : "inactive"}
        </span>
        {mostRecentCouncilMemberRole.seat && (
          <p>{`${mostRecentCouncilMemberRole.seat.name} // ${mostRecentCouncilMemberRole.seat.electoral_area}`}</p>
        )}
      </PageTitle>
      <Biography
        person={person}
        councilMemberRoles={termRoles}
        nonCouncilMemberRoles={nonTermRoles}
        mattersSponsored={mattersSponsored}
      />
      <MattersSponsored mattersSponsored={mattersSponsored} />
      <div>
        <VotingTable name={person.name} votesPage={votes} />
      </div>
    </Person>
  );
};

export default PersonContainer;
