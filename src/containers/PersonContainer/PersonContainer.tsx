import React, { useMemo } from "react";
import styled from "@emotion/styled";

import useDocumentTitle from "../../hooks/useDocumentTitle";

import { getUniqueTermRoles, partitionNonTermRoles } from "../../models/util/RoleUtilities";

import { VotingTable } from "../../components/Tables/VotingTable";
import { Biography } from "./Biography";
import { CoverImage } from "./CoverImage";
import { PersonPageData } from "./types";

import { fontSizes } from "../../styles/fonts";

const Person = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr",
  rowGap: 64,
});

const PageTitle = styled.div({
  marginBottom: 0,
  "& > h1": {
    display: "inline",
    marginBottom: 0,
  },
  "& > span": {
    marginLeft: 16,
    padding: "0px 8px",
    borderRadius: 4,
    fontSize: fontSizes.font_size_7,
  },
  "& > p": {
    fontSize: fontSizes.font_size_6,
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
      <PageTitle>
        <h1 className="mzp-u-title-sm">{person.name}</h1>
        <span className={personIsActive ? "cdp-bg-neon-green" : "cdp-bg-dark-grey"}>
          {personIsActive ? "active" : "inactive"}
        </span>
        {mostRecentCouncilMemberRole.seat && (
          <p className="mzp-c-card-desc">{`${mostRecentCouncilMemberRole.seat.name} // ${mostRecentCouncilMemberRole.seat.electoral_area}`}</p>
        )}
      </PageTitle>
      <Biography
        person={person}
        councilMemberRoles={termRoles}
        nonCouncilMemberRoles={nonTermRoles}
        mattersSponsored={mattersSponsored}
      />
      <div>
        <VotingTable name={person.name} votesPage={votes} />
      </div>
    </Person>
  );
};

export default PersonContainer;
