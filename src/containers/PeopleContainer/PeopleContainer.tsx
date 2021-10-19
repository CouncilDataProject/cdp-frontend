import React from "react";
import { PeoplePageData } from "./types";
import "@mozilla-protocol/core/protocol/css/protocol.css";
import Person from "../../models/Person";
import { Link } from "react-router-dom";
export interface PeopleContainerProps extends PeoplePageData {
  /** Any extra info */
  searchQuery?: string;
}

function renderLinkCard(person: Person) {
  if (person.id) {
    return (
      <div>
        <Link to={`/people/${person.id}`}>{person.name}</Link>
      </div>
    );
  } else {
    return null;
  }
}

const PersonContainer = ({ currentPeople, allPeople }: PeopleContainerProps) => {
  return (
    <div>
      <h3>Currently Elected</h3>
      {currentPeople &&
        currentPeople.map((role) => {
          if (role.person) {
            return renderLinkCard(role.person);
          }
        })}
      <h3>All</h3>
      {allPeople &&
        allPeople.map((person) => {
          return renderLinkCard(person);
        })}
    </div>
  );
};

export default PersonContainer;
