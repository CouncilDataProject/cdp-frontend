import React, { FC } from "react";
import styled from "@emotion/styled";

import { useAppConfigContext } from "../..";

import { HomeSearchBar } from "../../components/Layout/HomeSearchBar";

const Container = styled.div({
  // Center the children horizontally and vertically
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const HomePage: FC = () => {
  const { municipality } = useAppConfigContext();

  return (
    <Container>
      <h1>{`Discover ${municipality.name} city council meetings, legislations, and members`}</h1>
      <HomeSearchBar />
    </Container>
  );
};

export default HomePage;
