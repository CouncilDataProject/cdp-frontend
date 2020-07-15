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

export const MeetingCard = (props: MeetingCardProps) => {
  const tagString = props.tags.join(` • `);

  return (
    <Card
      imgSrc={props.imgSrc}
      imageOverlayContent={
        <span
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            margin: "1rem",
            color: "white",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          {props.imgOverlayText}
        </span>
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
