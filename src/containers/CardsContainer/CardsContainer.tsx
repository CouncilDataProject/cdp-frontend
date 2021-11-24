import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import { Card } from "./types";

import colors from "../../styles/colors";
import { fontSizes } from "../../styles/fonts";
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
  cards: Card[];
}

const CardsContainer: FC<CardsContainerProps> = ({ cards }: CardsContainerProps) => {
  return (
    <Container>
      {cards.map(({ link, jsx }) => {
        return (
          <div key={link}>
            <Link
              to={link}
              style={{
                textDecoration: "none",
                color: colors.black,
                fontSize: fontSizes.font_size_6,
              }}
            >
              {jsx}
            </Link>
          </div>
        );
      })}
    </Container>
  );
};

export default CardsContainer;
