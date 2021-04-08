import React from "react";
import { Footer } from "./index";
import "@mozilla-protocol/core/protocol/css/protocol.css";

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
        <h1 style={{ fontSize: "25px", margin: 0 }}>Council Data Project</h1>
        <section>
          <a href="#" style={{ padding: "1rem" }}>
            Events
          </a>
          <a href="#" style={{ padding: "1rem" }}>
            People
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
        <h1 style={{ fontSize: "30px", marginBottom: "2rem" }}>Search City Council Transcripts</h1>
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
            Search
          </button>
        </section>
      </main>
      <footer>
        <Footer
          footerLinksSections={[
            {
              footerLinksSectionName: "Seattle",
              links: [
                { label: "City Of Seattle", url: "#" },
                { label: "Seattle Open Data", url: "#" },
                { label: "Seattle Channel", url: "#" },
              ],
            },
            {
              footerLinksSectionName: "Developers",
              links: [
                { label: "Seattle Specific", url: "#" },
                { label: "Transcription Runner", url: "#" },
              ],
            },
          ]}
        />
      </footer>
    </>
  );
}

export default App;
