import React, { FC } from "react";
import DefaultAvatar from "../../components/Shared/DefaultAvatar";

const avatarGeneralStyle: React.CSSProperties = {
  objectFit: "cover",
  position: "absolute",
  width: 200,
  height: 200,
  top: "400px",
  left: "190px",
  borderRadius: 100,
  backgroundColor: "white",
  border: "1px black solid",
};
interface AvatarImageProps {
  /** The uri of the avatar of the person being displayed */
  personImageUri?: string;
  /** The name of the person being displayed (for alt) */
  personName?: string;
}

const AvatarImage: FC<AvatarImageProps> = ({ personImageUri, personName }: AvatarImageProps) => {
  if (personImageUri) {
    return (
      <img
        style={avatarGeneralStyle}
        className="mzp-c-card-image"
        src={personImageUri}
        alt={`person of ${personName}`}
      />
    );
  } else {
    return (
      <div style={avatarGeneralStyle}>
        <DefaultAvatar />
      </div>
    );
  }
};

export { AvatarImage };
