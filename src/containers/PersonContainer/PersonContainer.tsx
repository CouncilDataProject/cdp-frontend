import React from "react";
import { PersonCard, VotingTable } from "../..";
import { PersonPageData } from "./types";
import { useMediaQuery } from "react-responsive";
import { screenWidths } from "../../styles/mediaBreakpoints";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import PersonFullView from "./PersonFullView";
import { getMostRecentRole, filterRolesByTitle } from "../../models/util/RoleUtilities";

export interface PersonContainerProps extends PersonPageData {
  /** Any extra info */
  searchQuery?: string;
}

const PersonContainer = ({ person, votes, roles, mattersSponsored }: PersonContainerProps) => {
  const isMobile = useMediaQuery({ query: `(max-width: ${screenWidths.largeMobile})` });
  const currentRole = getMostRecentRole(roles);
  let rolesAsCurrentRole = 1;
  if (currentRole.title) {
    rolesAsCurrentRole = filterRolesByTitle(roles, currentRole.title).length;
  }

  useDocumentTitle(person.name);

  return (
    <div key={person.id}>
      {isMobile && (
        <PersonCard
          personName={person.name!}
          personPictureSrc={""}
          personIsActive={person.is_active!}
          seatName={currentRole.seat?.name || "No name"}
          seatElectoralArea={currentRole.seat?.electoral_area || "No Electoral Area"}
          seatPictureSrc={currentRole.seat?.image?.uri}
          chairedBodyNames={currentRole.title || ""}
          tenureStatus={`${rolesAsCurrentRole}`}
          billsSponsored={0}
        />
      )}
      {!isMobile && (
        <PersonFullView person={person} roles={roles} mattersSponsored={mattersSponsored} />
      )}
      <br />
      {votes && <VotingTable name={person.name || "No Name Found"} votesPage={votes as any} />}
    </div>
  );
};

export default PersonContainer;
