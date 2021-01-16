import React, { ReactNode } from "react";
import styled from "@emotion/styled";
import colors from "../../styles/colors";

const CARD_MAX_WIDTH = "544px";
const CARD_BORDER_RADIUS = "5px";
const CARD_BORDER_COLOR = colors.lightgrey;
const SMALL_SCREEN_BREAKPOINT = "576px";
const IMAGE_CONTAINER_MIN_HEIGHT = "135px";

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

const CardImageContainer = styled.div<CardImageContainerProps>`
  /* position relative so that the overlay text can be absolutely positioned */
  position: relative;
  /* set min-height for image to prevent div collapsing in small screens */
  min-height: ${IMAGE_CONTAINER_MIN_HEIGHT};
  border-radius: ${CARD_BORDER_RADIUS} ${CARD_BORDER_RADIUS} 0 0;
  background-image: linear-gradient(
      transparent 50%,
      rgba(51, 51, 51, 0.1) 60%,
      rgba(51, 51, 51, 0.3) 70%,
      rgba(51, 51, 51, 0.5) 80%,
      rgba(51, 51, 51, 0.8) 100%
    ),
    url(${(props: CardImageContainerProps) => props.imgSrc});
  background-size: cover;
  /* desktop styles */
  @media (min-width: ${SMALL_SCREEN_BREAKPOINT}) {
    width: 40%;
    border-radius: ${CARD_BORDER_RADIUS} 0 0 ${CARD_BORDER_RADIUS};
  }
`;

const CardContentContainer = styled.div`
  border: 1px solid ${CARD_BORDER_COLOR};
  border-top: none;
  border-radius: 0 0 ${CARD_BORDER_RADIUS} ${CARD_BORDER_RADIUS};
  padding: 1rem;

  /* desktop styles */
  @media (min-width: ${SMALL_SCREEN_BREAKPOINT}) {
    border-left: none;
    border-top: 1px solid ${CARD_BORDER_COLOR};
    border-radius: 0 ${CARD_BORDER_RADIUS} ${CARD_BORDER_RADIUS} 0;
    width: 60%;
  }
`;

type CardProps = {
  imgSrc: string;
  imageOverlayContent: ReactNode;
  content: ReactNode;
};

const Card = (props: CardProps) => {
  return (
    <CardContainer>
      <CardImageContainer imgSrc={props.imgSrc}>{props.imageOverlayContent}</CardImageContainer>
      <CardContentContainer>{props.content}</CardContentContainer>
    </CardContainer>
  );
};

export default Card;
