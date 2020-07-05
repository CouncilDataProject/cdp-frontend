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

const StyledLabel = styled.span`
  font-weight: "bold";
`;

export const MeetingCard = (props: MeetingCardProps) => {
  return (
    <Card imgSrc={props.imgSrc} imgOverlayText={props.imgOverlayText}>
      <h3>COMMITTEE</h3>
      <div>{props.committee}</div>
      <div>
        <StyledLabel style={{ fontWeight: "bold" }}>ACTIONS </StyledLabel>
        {props.actions}
      </div>
      <div>
        <StyledLabel style={{ fontWeight: "bold" }}>TAGS </StyledLabel>
        {props.tags}
      </div>
    </Card>
  );
};
