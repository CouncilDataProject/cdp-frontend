import React, { FC } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import { Card } from "./types";

import colors from "../../styles/colors";
import { fontSizes } from "../../styles/fonts";
import { screenWidths } from "../../styles/mediaBreakpoints";

export enum CARDS_COLUMN_NUM {
  tablet = 2,
  desktop = 3,
}

const Container = styled.div({
  display: "grid",
  gap: 64,
  gridTemplateColumns: "1fr",
  [`@media (min-width:${screenWidths.tablet})`]: {
    justifyContent: "space-between",
    gridTemplateColumns: `repeat(${CARDS_COLUMN_NUM.tablet}, 1fr)`,
  },
  [`@media (min-width:${screenWidths.desktop})`]: {
    gridTemplateColumns: `repeat(${CARDS_COLUMN_NUM.desktop}, 1fr)`,
  },
});

export interface CardsContainerProps {
  cards: Card[];
}

const CardsContainer: FC<CardsContainerProps> = ({ cards }: CardsContainerProps) => {
  return (
    <Container>
      {cards.map(({ link, jsx, searchQuery }) => {
        return (
          <div key={link}>
            <Link
              to={{
                pathname: link,
                state: {
                  query: searchQuery || "",
                },
              }}
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
