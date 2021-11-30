import React, { FC } from "react";
import Person from "../../models/Person";
import Role from "../../models/Role";
import MatterSponsor from "../../models/MatterSponsor";
import "@mozilla-protocol/core/protocol/css/protocol.css";
import { CoverImage } from "./CoverImage";
import { Biography } from "./Biography";
interface PersonFullViewProps {
  /** The person being displayed */
  person: Person;
  roles: Role[];
  mattersSponsored: MatterSponsor[];
}

const PersonFullView: FC<PersonFullViewProps> = ({
  person,
  roles,
  mattersSponsored,
}: PersonFullViewProps) => {
  const contactText = `Contact ${person.name}`;

  return (
    <div>
      <h3>{person.name}</h3>
      {person.seatName && <h4>{person.seatName}</h4>}
      <CoverImage person={person} />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: 300,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 120,
          }}
        >
          <p className="mzp-c-card-bold">{contactText}</p>
          {person.email && <p className="mzp-c-card-desc">{person.email}</p>}
          {person.phone && <p className="mzp-c-card-desc">{person.phone}</p>}
        </div>
        <Biography person={person} roles={roles} mattersSponsored={mattersSponsored} />
      </div>
    </div>
  );
};

export default PersonFullView;
