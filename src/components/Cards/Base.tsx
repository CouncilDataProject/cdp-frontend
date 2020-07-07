import React, { ReactNode } from "react";

const CARD_MAX_WIDTH = "300px";
const CARD_BORDER_RADIUS = "0.3rem";
const CARD_BORDER_COLOR = "#dcdcdc";

const CardImageContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {children}
    </div>
  );
};

type CardProps = {
  image: ReactNode;
  content: ReactNode;
};

export const Card = (props: CardProps) => {
  return (
    <div
      style={{
        width: CARD_MAX_WIDTH,
      }}
    >
      {props.image && <CardImageContainer>{props.image}</CardImageContainer>}
      <div
        style={{
          border: `2px solid ${CARD_BORDER_COLOR}`,
          borderTop: "none",
          borderRadius: `0 0 ${CARD_BORDER_RADIUS} ${CARD_BORDER_RADIUS}`,
          padding: "1rem",
        }}
      >
        {props.content}
      </div>
    </div>
  );
};
