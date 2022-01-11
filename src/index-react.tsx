import React from "react";
import ReactDOM from "react-dom";
import { App, AppConfigProvider } from "./app";

ReactDOM.render(
  <React.StrictMode>
    <AppConfigProvider
      appConfig={{
        firebaseConfig: {
          options: {
            projectId: "cdp-king-county-b656c71b",
          },
          settings: {},
        },
        municipality: {
          name: "King County",
          footerLinksSections: [],
        },
      }}
    >
      <App />
    </AppConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
