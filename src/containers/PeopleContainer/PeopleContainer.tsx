import React from "react";

import Seat from "../../models/Seat";
import Role from "../../models/Role";

import H2 from "../../components/Shared/H2";
import { PersonCard } from "../../components/Cards/PersonCard";

import styled from "@emotion/styled";
import { useMediaQuery } from "react-responsive";
import { screenWidths } from "../../styles/mediaBreakpoints";

export interface PeopleContainerProps {
  /** Any extra info */
  searchQuery?: string;
  /** all current councilor roles (with Person populated) */
  roles: Role[];
  /** the seats associated with the above councilmembers (ordered) */
  seats: Seat[];
}

const PersonContainer = ({ roles, seats }: PeopleContainerProps) => {
  const isMobile = useMediaQuery({ query: `(max-width: ${screenWidths.tablet})` });

  const CardRow = styled.div({
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: 8,
    flex: 1,
  });

  const CardCell = styled.div({
    flex: 1,
    maxWidth: "50%",
  });

  return (
    <div>
      <H2>Current Councilmembers</H2>
      {roles.map((role, index) => {
        if (index % 2 === 0) {
          const role2 = roles[index + 1];
          if (role.person) {
            return (
              <CardRow>
                <CardCell>
                  <PersonCard
                    key={`person-card-${role.person?.name}`}
                    person={role.person}
                    seat={seats[index]}
                  />
                </CardCell>
                {role2 && role2.person && (
                  <CardCell>
                    <PersonCard
                      key={`person-card-${role2.person.name}`}
                      person={role2.person}
                      seat={seats[index + 1]}
                    />
                  </CardCell>
                )}
              </CardRow>
            );
          }
        }
      })}
    </div>
  );
};

export default PersonContainer;
