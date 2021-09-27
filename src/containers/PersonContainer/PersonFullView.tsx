import React, { FC } from "react";
import styled from "@emotion/styled";
import Person from "../../models/Person";
import DefaultAvatar from "../../components/Shared/DefaultAvatar";
import { strings } from "../../assets/LocalizedStrings";
import "@mozilla-protocol/core/protocol/css/protocol.css";

const PersonStatus = styled.div({
  float: "right",
  marginRight: 8,
  marginBottom: 8,
  borderRadius: "10%",
  padding: "0 4px",
});

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

const PersonFullView: FC<PersonFullViewProps> = ({ person }: PersonFullViewProps) => {
  const personName = person.name ? person.name : "No Name Provided";
  const introText = `<PERSON TITLE> <PERSON NAME> is the <PERSON TITLE> of <CITY NAME>'s <SEAT NAME>(<SEAT ELECTORAL AREA>).`;
  const bioText = `${personName} is serving their <ORDINAL_SUFFIX_OF_TERM_NUMBER> term. They currently hold the following chairs: <CHAIRS_JOIN>. They have sponsored <NUMBER_OF_BILLS_SPONSORED> and attended <NUMBER OF MEETINGS ATTENDED> city council meetings.`;
  const contactText = `Contact ${personName}`;
  const linkText = `Visit ${personName}'s website >`;
  return (
    <div>
      <h3>{personName}</h3>
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
