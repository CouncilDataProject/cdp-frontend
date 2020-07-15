import React from "react";
import styled from "@emotion/styled";
import { Card } from "./";

type MeetingCardProps = {
  imgSrc: string;
  imgOverlayText: string;
  committee: string;
  tags: [string];
  actions: string;
};

const HeadingSection = styled.div`
  margin: 0 0 2rem 0;
`;

// TODO: centralize color values
const SectionTitle = styled.div`
  padding-bottom: 0.4rem;
  font-size: 1.2rem;
  color: grey;
`;

const HeadingContent = styled.div`
  font-size: 1.6rem;
  display: block;
  font-weight: bold;
`;

const BodySection = styled.div`
  margin: 0 0 1rem 0;
`;

const SectionContent = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
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
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        {props.text}
      </span>
    </div>
  );
};

export const MeetingCard = (props: MeetingCardProps) => {
  const tagString = props.tags.join(` • `);

  return (
    <Card
      image={
        <>
          <CardImageOverlayText text={props.imgOverlayText} />
          <img src={props.imgSrc} style={{ borderRadius: "0.3rem", width: "100%" }} />
        </>
      }
      content={
        <>
          <HeadingSection>
            <SectionTitle>Committee</SectionTitle>
            <HeadingContent>{props.committee}</HeadingContent>
          </HeadingSection>
          <BodySection>
            <SectionTitle>Tags</SectionTitle>
            <SectionContent>{tagString}</SectionContent>
          </BodySection>
        </>
      }
    />
  );
};
