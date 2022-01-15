import React, { FC } from "react";
import Person from "../../models/Person";
import Role from "../../models/Role";
import MatterSponsor from "../../models/MatterSponsor";
import { useAppConfigContext } from "../../app/AppConfigContext";
import { writeBiography } from "./WriteBiography";

interface BiographyProps {
  /** The person being displayed */
  person: Person;
  /** The person's councilmember roles */
  councilMemberRoles: Role[];
  /** The person's roles */
  roles: Role[];
  /** The legislation or matters sponsored by this person */
  mattersSponsored: MatterSponsor[];
}

const Biography: FC<BiographyProps> = ({
  person,
  councilMemberRoles,
  roles,
  mattersSponsored,
}: BiographyProps) => {
  const { municipality } = useAppConfigContext();
  const { bioText, memberships } = writeBiography(
    person,
    councilMemberRoles,
    roles,
    municipality.name,
    mattersSponsored
  );
  const linkText = `Visit ${person.name}'s website`;

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingTop: 120, paddingLeft: 100 }}>
      <p className="mzp-c-card-desc">{bioText}</p>
      {memberships && memberships.length > 0 && (
        <div>
          <p className="mzp-c-card-desc">They are currently part of the following bodies:</p>
          <ul className="mzp-u-list-styled">
            {memberships.map((membershipSentence: string, index: number) => {
              return <li key={`${index}-membership-in-body`}>{membershipSentence}</li>;
            })}
          </ul>
        </div>
      )}
      {person.website && (
        <a target="_blank" rel="noopener noreferrer" href={person.website}>
          {linkText}
        </a>
      )}
    </div>
  );
};

export { Biography, BiographyProps };
