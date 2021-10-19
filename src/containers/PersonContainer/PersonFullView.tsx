import React, { FC } from "react";
import styled from "@emotion/styled";
import Person from "../../models/Person";
import DefaultAvatar from "../../components/Shared/DefaultAvatar";
import { useAppConfigContext } from "../../app/AppConfigContext";
import { strings } from "../../assets/LocalizedStrings";
import "@mozilla-protocol/core/protocol/css/protocol.css";
import Role from "../../models/Role";
import { filterRolesByTitle, ROLE_TITLE, getMostRecentRole } from "../../models/util/RoleUtilities";
import MatterSponsor from "../../models/MatterSponsor";
import ordinalSuffix from "../../utils/ordinalSuffix";

const CoverImg = styled.img(() => ({
  objectFit: "cover",
  height: 250,
  maxHeight: "40%",
  width: "100%",
}));

const AvatarImg = styled.img(() => ({
  objectFit: "cover",
  position: "absolute",
  width: 200,
  height: 200,
  top: "220px",
  left: "30px",
  borderRadius: 100,
  border: "1px black solid",
}));

interface PersonFullViewProps {
  /** The person being displayed */
  person: Person;
  roles: Role[];
  mattersSponsored: MatterSponsor[];
}

function renderCoverImages(person: Person) {
  if (person.seatPictureUri) {
    return (
      <div>
        <CoverImg
          className="mzp-c-card-image"
          src={person.seatPictureUri}
          alt={`${person.seatName} - ${person.seatElectoralArea}`}
        />
        {renderAvatar(person.picture?.uri)}
      </div>
    );
  } else {
    return (
      <div>
        <CoverImg
          className="mzp-c-card-image"
          src={"https://via.placeholder.com/1600x900?text=Default+Splash+Person+Layout"}
          alt={`Default Cover Splash`}
        />
        {renderAvatar(person.picture?.uri)}
      </div>
    );
  }
}

function renderAvatar(personAvatarUri: string | undefined) {
  if (personAvatarUri) {
    return (
      <AvatarImg
        className="mzp-c-card-image"
        src={personAvatarUri}
        alt={"Picture of this Person"}
      />
    );
  } else {
    return (
      <div style={{ width: 120, height: 120 }}>
        <DefaultAvatar />
      </div>
    );
  }
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
  let rolesAsCurrentRole = 1;
  if (currentRole.title) {
    rolesAsCurrentRole = filterRolesByTitle(roles, currentRole.title).length;
  }
  const introText = `${currentRole.title} ${person.name} is the ${currentRole.title} of ${municipality.name}'s ${currentRole.seat?.name}(${currentRole.seat?.electoral_area}).`;
  const bioText = `${person.name} is serving their ${ordinalSuffix(
    rolesAsCurrentRole
  )} term. They currently hold the following chairs: ${chairBodyNames.join(
    ", "
  )}. They have sponsored ${mattersSponsored.length} pieces of legislation.`;
  const contactText = `Contact ${person.name}`;
  const linkText = `Visit ${person.name}'s website >`;
  return (
    <div>
      <h3>{person.name}</h3>
      {person.seatName && <h4>{person.seatName}</h4>}
      {renderCoverImages(person)}
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
