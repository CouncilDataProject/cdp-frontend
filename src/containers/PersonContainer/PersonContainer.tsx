import React from "react";
import styled from "@emotion/styled";

import useDocumentTitle from "../../hooks/useDocumentTitle";

import ContactPerson from "./ContactPerson";
import { CoverImage } from "./CoverImage";
import MattersSponsored from "./MattersSponsored";
import PersonRoles from "./PersonRoles";
import PersonVotes from "./PersonVotes";
import { PersonPageData } from "./types";

import { fontSizes } from "../../styles/fonts";
import { screenWidths } from "../../styles/mediaBreakpoints";
import { strings } from "../../assets/LocalizedStrings";

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
  "& > span:not(:first-of-type)": {
    fontSize: fontSizes.font_size_7,
  },
  "& > span:nth-of-type(2)": {
    marginLeft: 16,
    padding: "0px 8px",
    borderRadius: 4,
    fontWeight: 300,
  },
  "& > span:nth-of-type(3)": {
    marginTop: 16,
    display: "block",
    fontWeight: 400,
  },
});

const ContactAndRoles = styled.div<{ isVisible: boolean }>((props) => ({
  display: props.isVisible ? "grid" : "none",
  rowGap: 64,
  gridTemplateColumns: "1fr",
  [`@media (min-width:${screenWidths.tablet})`]: {
    gridTemplateColumns: "auto 1fr",
    columnGap: 128,
  },
}));

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
  const mostRecentCouncilMemberRole =
    councilMemberRoles.length > 0 ? councilMemberRoles[0] : undefined;
  const personIsActive =
    !mostRecentCouncilMemberRole?.end_datetime ||
    mostRecentCouncilMemberRole?.end_datetime > new Date();
  const hasContact = person.phone || person.email || person.website ? true : false;
  const hasRoles = roles.length > 0;

  useDocumentTitle(person.name);

  return (
    <Person>
      <CoverImage
        personName={person.name}
        personPictureSrc={personPictureSrc}
        seatPictureSrc={seatPictureSrc}
        electoralArea={mostRecentCouncilMemberRole?.seat?.electoral_area}
      />
      <PageTitle className="mzp-u-title-sm">
        <span>{person.name}</span>
        {mostRecentCouncilMemberRole && (
          <span className={personIsActive ? "cdp-bg-neon-green" : "cdp-bg-dark-grey"}>
            {personIsActive ? strings.active : strings.inactive}
          </span>
        )}
        {mostRecentCouncilMemberRole?.seat && (
          <span>{`${mostRecentCouncilMemberRole?.seat.name} // ${mostRecentCouncilMemberRole.seat.electoral_area}`}</span>
        )}
      </PageTitle>
      <ContactAndRoles isVisible={hasContact || hasRoles}>
        <ContactPerson person={person} />
        <PersonRoles councilMemberRoles={councilMemberRoles} allRoles={roles} />
      </ContactAndRoles>
      <MattersSponsored mattersSponsored={mattersSponsored} />
      <div>
        <PersonVotes personName={person.name} votes={votes} />
      </div>
    </Person>
  );
};

export default PersonContainer;
