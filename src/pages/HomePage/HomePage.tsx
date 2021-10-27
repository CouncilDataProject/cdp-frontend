import React, { FC } from "react";
import styled from "@emotion/styled";

import { HomeSearchBar } from "../../components/Layout/HomeSearchBar";

import useDocumentTitle from "../../hooks/useDocumentTitle";
import { strings } from "../../assets/LocalizedStrings";

const Container = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr",
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
