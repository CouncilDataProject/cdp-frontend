import React, { FC } from "react";
import Person from "../../models/Person";
import { useAppConfigContext } from "../../app/AppConfigContext";
import { strings } from "../../assets/LocalizedStrings";
import "@mozilla-protocol/core/protocol/css/protocol.css";
import Role from "../../models/Role";
import { filterRolesByTitle, ROLE_TITLE, getMostRecentRole } from "../../models/util/RoleUtilities";
import MatterSponsor from "../../models/MatterSponsor";
import ordinalSuffix from "../../utils/ordinalSuffix";
import { CoverImage } from "./CoverImage";
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
  const { municipality } = useAppConfigContext();
  const currentRole = getMostRecentRole(roles);
  const chairBodyNames = filterRolesByTitle(roles, ROLE_TITLE.CHAIR)
    .filter((role) => {
      return !role.end_datetime;
    })
    .map((role) => {
      return role.name;
    });
  const viceChairBodyNames = filterRolesByTitle(roles, ROLE_TITLE.VICE_CHAIR)
    .filter((role) => {
      return !role.end_datetime;
    })
    .map((role) => {
      return role.name;
    });
  const memberBodyNames = filterRolesByTitle(roles, ROLE_TITLE.VICE_CHAIR)
    .filter((role) => {
      return !role.end_datetime;
    })
    .map((role) => {
      return role.name;
    });
  let rolesAsCurrentRole = 1;
  if (currentRole.title) {
    rolesAsCurrentRole = filterRolesByTitle(roles, currentRole.title).length;
  }
  const introText = `${currentRole.title} ${person.name} is the ${currentRole.title} of ${municipality.name}'s ${currentRole.seat?.name}(${currentRole.seat?.electoral_area}).`;
  const termsSentence = `${person.name} is serving their ${ordinalSuffix(
    rolesAsCurrentRole
  )} term.`;
  const chairsSentence =
    chairBodyNames.length > 0
      ? `They currently serve as Chair of the following bodies: ${chairBodyNames.join(", ")}.`
      : "They currently hold no Chairs.";
  const viceChairSentence =
    viceChairBodyNames.length > 0
      ? `They currently serve as Vice-Chair of the following bodies: ${viceChairBodyNames.join(
          ", "
        )}.`
      : "";
  const membershipSentence =
    memberBodyNames.length > 0
      ? `They currently serve as a member on the following bodies: ${memberBodyNames.join(", ")}.`
      : "";

  const sponsoredSentence = `They have sponsored ${mattersSponsored.length} pieces of legislation.`;
  const bioText: string = [
    termsSentence,
    chairsSentence,
    viceChairSentence,
    membershipSentence,
    sponsoredSentence,
  ].join(` `);
  const contactText = `Contact ${person.name}`;
  const linkText = `Visit ${person.name}'s website >`;
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
        <div
          style={{ display: "flex", flexDirection: "column", paddingTop: 120, paddingLeft: 100 }}
        >
          <p className="mzp-c-card-desc">{introText}</p>
          <p className="mzp-c-card-desc">{bioText}</p>
          {person.website && (
            <a target="_blank" href={person.website}>
              {linkText}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonFullView;
