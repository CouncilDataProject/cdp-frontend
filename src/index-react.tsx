import React from "react";
import ReactDOM from "react-dom";
import { App, AppConfigProvider } from "./app";

import "semantic-ui-css/semantic.min.css";

ReactDOM.render(
  <React.StrictMode>
    <AppConfigProvider
      appConfig={{
        firebaseConfig: {
          options: {
            projectId: "cdp-test-deployment-435b5309",
          },
          settings: {},
        },
        municipality: {
          name: "Test Deployment",
          footerLinksSections: [],
        },
      }}
    >
      <App />
    </AppConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
