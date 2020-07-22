import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import colors from "../../styles/colors";

const CARD_MAX_WIDTH = "554px";
const CARD_BORDER_RADIUS = "0.3rem";
const CARD_BORDER_COLOR = colors.lightgrey;
const SMALL_SCREEN_BREAKPOINT = "768px";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${CARD_MAX_WIDTH};

  /* desktop styles */
  @media (min-width: ${SMALL_SCREEN_BREAKPOINT}) {
    flex-direction: row;
  }
`;

type CardImageContainerProps = {
  imgSrc: string;
};

const CardImageContainer = styled.div`
  position: relative;
  background-image: linear-gradient(
      transparent 50%,
      rgba(51, 51, 51, 0.1) 60%,
      rgba(51, 51, 51, 0.3) 70%,
      rgba(51, 51, 51, 0.5) 80%,
      rgba(51, 51, 51, 0.8) 100%
    ),
    url(${(props: CardImageContainerProps) => props.imgSrc});
  width: 100%;
  height: 100%;
  /* TODO: adjust min dimensions */
  min-height: 200px;
  max-width: 220px;
  object-fit: cover;
`;

const CardContentContainer = styled.div`
  border: 2px solid ${CARD_BORDER_COLOR};
  border-top: none;
  border-radius: 0 0 ${CARD_BORDER_RADIUS} ${CARD_BORDER_RADIUS};
  padding: 1rem;

  /* desktop styles */
  @media (min-width: ${SMALL_SCREEN_BREAKPOINT}) {
    border-left: none;
    border-top: 2px solid ${CARD_BORDER_COLOR};
    border-radius: 0 ${CARD_BORDER_RADIUS} ${CARD_BORDER_RADIUS} 0;
  }
`;

type CardProps = {
  imgSrc: string;
  imageOverlayContent: ReactNode;
  content: ReactNode;
};
export const Card = (props: CardProps) => {
  return (
    <CardContainer>
      <CardImageContainer imgSrc={props.imgSrc}>{props.imageOverlayContent}</CardImageContainer>
      <CardContentContainer>{props.content}</CardContentContainer>
    </CardContainer>
  );
};
