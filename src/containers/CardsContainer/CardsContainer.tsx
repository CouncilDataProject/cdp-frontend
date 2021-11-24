import React, { FC, ReactNode } from "react";
import styled from "@emotion/styled";

import { screenWidths } from "../../styles/mediaBreakpoints";

const Container = styled.div({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  rowGap: 64,
  "& > div": {
    width: "100%",
  },
  [`@media (min-width:${screenWidths.tablet})`]: {
    justifyContent: "space-between",
    "& > div": {
      width: "35%",
    },
  },
});

export interface CardsContainerProps {
  cards: ReactNode;
}

const CardsContainer: FC<CardsContainerProps> = ({ cards }: CardsContainerProps) => {
  return <Container>{cards}</Container>;
};

export default CardsContainer;
