import React from "react";
import { PersonCard, VotingTable } from "../..";
import { PersonPageData } from "./types";
import { useMediaQuery } from "react-responsive";
import { screenWidths } from "../../styles/mediaBreakpoints";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import "@mozilla-protocol/core/protocol/css/protocol.css";
import PersonFullView from "./PersonFullView";

export interface PersonContainerProps extends PersonPageData {
  /** Any extra info */
  searchQuery?: string;
}

const PersonContainer = ({ person, votes, roles, mattersSponsored }: PersonContainerProps) => {
  const isMobile = useMediaQuery({ query: `(max-width: ${screenWidths.largeMobile})` });
  useDocumentTitle(person.name);
  return (
    <div>
      {isMobile && (
        <PersonCard
          personName={person.name!}
          personPictureSrc={""}
          personIsActive={person.is_active!}
          seatName={"<NOT YET IN MODELS>"}
          seatElectoralArea={"<NOT YET IN MODELS>"}
          seatPictureSrc={undefined}
          chairedBodyNames={"<NOT YET IN MODELS>"}
          tenureStatus={"<NOT YET IN MODELS>"}
          billsSponsored={0}
        />
      )}
      {!isMobile && (
        <PersonFullView person={person} roles={roles} mattersSponsored={mattersSponsored} />
      )}
      <br />
      <VotingTable name={person.name || "No Name Found"} votesPage={votes as any} />
    </div>
  );
};

export default PersonContainer;
