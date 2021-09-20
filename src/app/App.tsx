import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import styled from "@emotion/styled";

import { Header } from "../components/Layout/Header";
import { Footer } from "../components/Layout/Footer";
import { HomePage } from "../pages/HomePage";
import { SearchPage } from "../pages/SearchPage";
import { EventPage } from "../pages/EventPage";
import { EventsPage } from "../pages/EventsPage";
import { PersonPage } from "../pages/PersonPage";
import { PeoplePage } from "../pages/PeoplePage";

import "@mozilla-protocol/core/protocol/css/protocol.css";

const FlexContainer = styled.div({
  // The App takes up at least 100% of the view height
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  "& > main": {
    // The main component takes up all of the remaining height of the flex container
    flex: 1,
  },
});

function App() {
  return (
    <>
      <Router basename="/">
        <FlexContainer>
          <Header />
          <main>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/search">
                <SearchPage />
              </Route>
              <Route exact path="/events">
                <EventsPage />
              </Route>
              <Route exact path="/events/:id">
                <EventPage />
              </Route>
              <Route exact path="/people">
                <PeoplePage />
              </Route>
              <Route exact path="/people/:id">
                <PersonPage />
              </Route>
            </Switch>
          </main>
          <Footer footerLinksSections={[]} />
        </FlexContainer>
      </Router>
    </>
  );
}

export default App;
