import React, { FC } from "react";
import DefaultAvatar from "../../components/Shared/DefaultAvatar";
import styled from "@emotion/styled";

const AvatarImg = styled.img(() => ({
  objectFit: "cover",
  position: "absolute",
  width: 200,
  height: 200,
  top: "220px",
  left: "20px",
  borderRadius: 100,
  border: "1px black solid",
}));

interface AvatarImageProps {
  /** The uri of the avatar of the person being displayed */
  personImageUri?: string;
}

const AvatarImage: FC<AvatarImageProps> = ({ personImageUri }: AvatarImageProps) => {
  if (personImageUri) {
    return (
      <AvatarImg className="mzp-c-card-image" src={personImageUri} alt={"Picture of this Person"} />
    );
  } else {
    return (
      <div
        style={{
          objectFit: "cover",
          position: "absolute",
          width: 200,
          height: 200,
          top: "220px",
          left: "30px",
          borderRadius: 100,
          backgroundColor: "white",
          border: "1px black solid",
        }}
      >
        <DefaultAvatar />
      </div>
    );
  }
};

export { AvatarImage };
