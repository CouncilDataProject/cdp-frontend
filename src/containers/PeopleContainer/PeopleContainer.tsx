import React from "react";

import Seat from "../../models/Seat";
import Role from "../../models/Role";

import { PersonCard } from "../../components/Cards/PersonCard";
import { CardsContainer } from "../CardsContainer";
import { Card } from "../CardsContainer/types";

export interface PeopleContainerProps {
  /** Any extra info */
  searchQuery?: string;
  /** all current councilor roles (with Person populated) */
  roles: Role[];
  /** the seats associated with the above councilmembers (ordered) */
  seats: Seat[];
}

const PersonContainer = ({ roles, seats }: PeopleContainerProps) => {
  const cards = roles.reduce((filtered, optionalPersonRole, index) => {
    if (optionalPersonRole.person) {
      filtered.push({
        link: `/people/${optionalPersonRole.person.id}`,
        jsx: (
          <PersonCard
            key={`person-card-${optionalPersonRole.person.name}`}
            person={optionalPersonRole.person}
            seat={seats[index]}
          />
        ),
      });
    }
    return filtered;
  }, [] as Card[]);

  return (
    <div>
      <h1 className="mzp-u-title-sm">Current Councilmembers</h1>
      <CardsContainer cards={cards} />
    </div>
  );
};

export default PersonContainer;
