import React, { FC } from "react";
import styled from "@emotion/styled";

import { useAppConfigContext } from "../..";

import { HomeSearchBar } from "../../components/Layout/HomeSearchBar";

const Container = styled.div({
  display: "grid",
  gridTemplateColumns: "1fr",
});

const HomePage: FC = () => {
  const { municipality } = useAppConfigContext();

  return (
    <Container>
      <h1 className="mzp-u-title-xs">{`Discover ${municipality.name} city council meetings, legislations, and members`}</h1>
      <HomeSearchBar />
    </Container>
  );
};

export default HomePage;
