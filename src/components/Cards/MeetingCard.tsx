import React from "react";
import styled from "@emotion/styled";
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

export const MeetingCard = (props: MeetingCardProps) => {
  return (
    <Card imgSrc={props.imgSrc} imgOverlayText={props.imgOverlayText}>
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
    </Card>
  );
};
