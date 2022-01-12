import React, { FC } from "react";
import Person from "../../models/Person";
import Role from "../../models/Role";
import MatterSponsor from "../../models/MatterSponsor";
import { CoverImage } from "./CoverImage";
import { Biography } from "./Biography";

interface PersonFullViewProps {
  /** The person being displayed */
  person: Person;
  councilMemberRoles: Role[];
  roles: Role[];
  mattersSponsored: MatterSponsor[];
  personPictureSrc?: string;
  seatPictureSrc?: string;
}

const PersonFullView: FC<PersonFullViewProps> = ({
  person,
  councilMemberRoles,
  roles,
  mattersSponsored,
  personPictureSrc,
  seatPictureSrc,
}: PersonFullViewProps) => {
  const contactText = `Contact ${person.name}`;
  const mostRecentCouncilMemberRole = councilMemberRoles[0];
  return (
    <div>
      <h3>{person.name}</h3>
      {mostRecentCouncilMemberRole.seat?.name && <h4>{mostRecentCouncilMemberRole.seat?.name}</h4>}
      <CoverImage
        personName={person.name}
        personPictureSrc={personPictureSrc}
        seatPictureSrc={seatPictureSrc}
        electoralArea={mostRecentCouncilMemberRole.seat?.electoral_area}
      />
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
        <Biography
          person={person}
          councilMemberRoles={councilMemberRoles}
          roles={roles}
          mattersSponsored={mattersSponsored}
        />
      </div>
    </div>
  );
};

export default PersonFullView;
