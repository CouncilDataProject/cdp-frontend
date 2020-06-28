import React, { ReactNode } from "react";
import { Card as SemanticUICard, Image as SemanticUIImage } from "semantic-ui-react";

type CardProps = {
  imgSrc?: string;
};

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

const CardImageOverlayText = (props: { text: string }) => {
  return (
    <div
      style={{
        position: "absolute",
        background: "linear-gradient(transparent 50%, #333)",
        zIndex: 1000,
        width: "100%",
        height: "100%",
      }}
    >
      <span
        style={{
          position: "absolute",
          bottom: "0px",
          left: "0px",
          margin: "1rem",
          color: "white",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        {props.text}
      </span>
    </div>
  );
};

export const Card = (props: CardProps) => {
  return (
    <SemanticUICard>
      <CardImageContainer>
        <CardImageOverlayText text="06-09-2020" />
        <SemanticUIImage src="https://i.ibb.co/99QPHpG/council-mtng.png"></SemanticUIImage>
      </CardImageContainer>
      <SemanticUICard.Content>
        <SemanticUICard.Header>This is a subhead</SemanticUICard.Header>
        <SemanticUICard.Description>This is the card body.</SemanticUICard.Description>
      </SemanticUICard.Content>
    </SemanticUICard>
  );
};
