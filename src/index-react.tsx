import React from "react";
import ReactDOM from "react-dom";
import { App, AppConfigProvider } from "./app";

ReactDOM.render(
  <React.StrictMode>
    <AppConfigProvider
      appConfig={{
        firebaseConfig: {
          options: {
            projectId: "cdp-seattle-staging-dbengvtn",
          },
          settings: {},
        },
        municipality: {
          name: "Seattle Test",
          footerLinksSections: [],
        },
      }}
    >
      <App />
    </AppConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
