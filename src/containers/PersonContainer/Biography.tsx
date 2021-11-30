import React, { FC } from "react";
import Person from "../../models/Person";
import Role from "../../models/Role";
import MatterSponsor from "../../models/MatterSponsor";
import { useAppConfigContext } from "../../app/AppConfigContext";
import { WriteBiography } from "./WriteBiography";

interface BiographyProps {
  /** The person being displayed */
  person: Person;
  /** The person's roles */
  roles: Role[];
  /** The legislation or matters sponsored by this person */
  mattersSponsored: MatterSponsor[];
}

const Biography: FC<BiographyProps> = ({ person, roles, mattersSponsored }: BiographyProps) => {
  const { municipality } = useAppConfigContext();
  const { bioText, introText } = WriteBiography(person, roles, municipality, mattersSponsored);
  const linkText = `Visit ${person.name}'s website`;

  return (
    <div style={{ display: "flex", flexDirection: "column", paddingTop: 120, paddingLeft: 100 }}>
      <p className="mzp-c-card-desc">{introText}</p>
      <p className="mzp-c-card-desc">{bioText}</p>
      {person.website && (
        <a target="_blank" rel="noopener noreferrer" href={person.website}>
          {linkText}
        </a>
      )}
    </div>
  );
};

export { Biography, BiographyProps };
