import React from "react";
import { PersonCard, VotingTable } from "../..";
import { PersonPageData } from "./types";
import "@mozilla-protocol/core/protocol/css/protocol.css";

export interface PersonContainerProps extends PersonPageData {
  /** Any extra info */
  searchQuery?: string;
}

const PersonContainer = ({ person, votes }: PersonContainerProps) => {
  return (
    <div>
      <PersonCard
        personName={person.name!}
        personPictureSrc={""}
        personIsActive={person.is_active!}
        seatName={"unknown"}
        seatElectoralArea={"Unknown Area"}
        seatPictureSrc={undefined}
        chairedBodyNames={"strings"}
        tenureStatus={"Tenure Status"}
        billsSponsored={0}
      />
      <VotingTable name={person.name || "No Name Found"} votesPage={votes} />
    </div>
  );
};

export default PersonContainer;
