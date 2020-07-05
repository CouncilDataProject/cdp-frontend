import React, { ReactNode } from "react";
import { Card as SemanticUICard, Image as SemanticUIImage } from "semantic-ui-react";

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
        border: "none",
        background: `linear-gradient(
          transparent 50%,
          rgba(51, 51, 51, 0.1) 60%,
          rgba(51, 51, 51, 0.3) 70%,
          rgba(51, 51, 51, 0.5) 80%,
          rgba(51, 51, 51, 0.8) 100%
        )`,
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

type CardProps = {
  imgSrc?: string;
  imgOverlayText?: string;
  children: ReactNode;
};

export const Card = (props: CardProps) => {
  return (
    <SemanticUICard
      style={{
        // remove box shadow so we can set our own borders
        boxShadow: "none",
      }}
    >
      <CardImageContainer>
        {props.imgSrc && props.imgOverlayText && (
          <>
            <CardImageOverlayText text={props.imgOverlayText} />
            <SemanticUIImage
              src={props.imgSrc}
              /* this border radius is to match Semantic UI's bottom border radius for the content section */
              style={{ borderRadius: "0.2857rem" }}
            ></SemanticUIImage>
          </>
        )}
      </CardImageContainer>
      <SemanticUICard.Content style={{ border: "2px solid #dcdcdc", borderTop: "none" }}>
        {props.children}
      </SemanticUICard.Content>
    </SemanticUICard>
  );
};
