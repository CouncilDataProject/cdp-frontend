import React, { FC } from "react";
import styled from "@emotion/styled";

import useDocumentTitle from "../../hooks/useDocumentTitle";

import { HomeSearchBar } from "../../components/Layout/HomeSearchBar";

import { strings } from "../../assets/LocalizedStrings";
import { screenWidths } from "../../styles/mediaBreakpoints";

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  "& > *": {
    width: "100%",
  },
  [`@media (min-width:${screenWidths.tablet})`]: {
    "& > *": {
      width: "75%",
    },
  },
});

const HomePage: FC = () => {
  useDocumentTitle(strings.council_data_project);

  return (
    <Container>
      <h1 className="mzp-u-title-xs">{strings.search_city_council}</h1>
      <HomeSearchBar />
    </Container>
  );
};

export default HomePage;
