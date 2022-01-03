import React from "react";
import { PersonCard, VotingTable } from "../..";
import { PersonPageData } from "./types";
import { useMediaQuery } from "react-responsive";
import { screenWidths } from "../../styles/mediaBreakpoints";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import PersonFullView from "./PersonFullView";
import ordinalSuffix from "../../utils/ordinalSuffix";

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
  const isMobile = useMediaQuery({ query: `(max-width: ${screenWidths.largeMobile})` });
  const mostRecentCouncilMemberRole = councilMemberRoles[0];

  useDocumentTitle(person.name);

  return (
    <div>
      {isMobile ? (
        <PersonCard
          personName={person.name}
          personPictureSrc={personPictureSrc}
          personIsActive={
            mostRecentCouncilMemberRole.end_datetime
              ? mostRecentCouncilMemberRole.end_datetime > new Date()
              : true
          }
          seatName={mostRecentCouncilMemberRole.seat?.name || "No name"}
          seatElectoralArea={
            mostRecentCouncilMemberRole.seat?.electoral_area || "No Electoral Area"
          }
          seatPictureSrc={seatPictureSrc}
          /**TODO fix list of chaired bodies */
          chairedBodyNames={""}
          tenureStatus={`${ordinalSuffix(councilMemberRoles.length)} term`}
          billsSponsored={mattersSponsored.length}
        />
      ) : (
        <PersonFullView
          person={person}
          personPictureSrc={personPictureSrc}
          seatPictureSrc={seatPictureSrc}
          councilMemberRoles={councilMemberRoles}
          roles={roles}
          mattersSponsored={mattersSponsored}
        />
      )}
      <br />
      <VotingTable name={person.name} votesPage={votes as any} />
    </div>
  );
};

export default PersonContainer;
