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
  /** The src of the avatar of the person being displayed */
  personPictureSrc?: string;
  /** The name of the person being displayed (for alt) */
  personName: string;
}

const AvatarImage: FC<AvatarImageProps> = ({ personPictureSrc, personName }: AvatarImageProps) => {
  if (personPictureSrc) {
    return (
      <img
        style={avatarGeneralStyle}
        className="mzp-c-card-image"
        src={personPictureSrc}
        alt={`Picture of ${personName}`}
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
