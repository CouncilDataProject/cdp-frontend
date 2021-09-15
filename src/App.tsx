import React from "react";
import { Footer } from "./index";
import "@mozilla-protocol/core/protocol/css/protocol.css";
import { strings } from "./assets/LocalizedStrings";

function App() {
  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          borderBottom: "solid 1px rgba(0,0,0,0.2)",
        }}
      >
        <h1 style={{ fontSize: "25px", margin: 0 }}>{strings.council_data_project}</h1>
        <section>
          <a href="#/events" style={{ padding: "1rem" }}>
            {strings.events}
          </a>
          <a href="#/people" style={{ padding: "1rem" }}>
            {strings.people}
          </a>
        </section>
      </header>
      <main
        style={{
          display: "flex",
          flexFlow: "column wrap",
          justifyContent: "center",
          alignItems: "center",
          height: "85vh",
        }}
      >
        <h1 style={{ fontSize: "30px", marginBottom: "2rem" }}>
          {strings.search_city_council_transcripts}
        </h1>
        <section>
          <input type="text" style={{ marginRight: "1rem", width: "30vw" }}></input>
          <button
            style={{
              border: "2px solid transparent",
              color: "#ffffff",
              fontSize: "1rem",
              fontWeight: "bold",
              background: "#0060df",
              padding: "8px 24px",
              borderRadius: "4px",
            }}
          >
            {strings.search}
          </button>
        </section>
      </main>
      <Footer
        footerLinksSections={[
          {
            footerLinksSectionName: strings.links,
            links: [
              { label: "Lorem", url: "#" },
              { label: "Ipsum", url: "#" },
            ],
          },
        ]}
      />
    </>
  );
}

export default App;
