import React from "react";
import styled from "@emotion/styled";
import { Image as SemanticUIImage } from "semantic-ui-react";
import { Card } from "./";

type MeetingCardProps = {
  imgSrc: string;
  imgOverlayText: string;
  committee: string;
  tags: string;
  actions: string;
};

const Label = styled.span`
  font-weight: bold;
  margin-right: 0.6rem;
`;

const HeadingSection = styled.div`
  margin: 0 0 2rem 0;
`;

const HeadingContent = styled.span`
  font-size: 1.2rem;
  display: block;
`;

const BodySection = styled.div`
  margin: 0 0 1rem 0;
`;

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

export const MeetingCard = (props: MeetingCardProps) => {
  return (
    <Card
      image={
        <>
          <CardImageOverlayText text={props.imgOverlayText} />
          <SemanticUIImage
            src={props.imgSrc}
            /* this border radius is to match Semantic UI's bottom border radius for the content section */
            style={{ borderRadius: "0.2857rem" }}
          />
        </>
      }
      content={
        <>
          <HeadingSection>
            <HeadingContent style={{ fontWeight: "bold" }}>COMMITTEE</HeadingContent>
            <HeadingContent>{props.committee}</HeadingContent>
          </HeadingSection>
          <BodySection>
            <Label>ACTIONS </Label>
            {props.actions}
          </BodySection>
          <BodySection>
            <Label>TAGS </Label>
            {props.tags}
          </BodySection>
        </>
      }
    />
  );
};
