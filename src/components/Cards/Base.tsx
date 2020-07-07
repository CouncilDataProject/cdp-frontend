import React, { ReactNode } from "react";
import { Card as SemanticUICard } from "semantic-ui-react";

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
    <SemanticUICard
      style={{
        // remove box shadow so we can set our own borders
        boxShadow: "none",
      }}
    >
      {props.image && <CardImageContainer>{props.image}</CardImageContainer>}
      <SemanticUICard.Content style={{ border: "2px solid #dcdcdc", borderTop: "none" }}>
        {props.content}
      </SemanticUICard.Content>
    </SemanticUICard>
  );
};
