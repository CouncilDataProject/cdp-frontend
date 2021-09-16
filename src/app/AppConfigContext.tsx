import React, { createContext, ReactNode, FC, useContext } from "react";
import { FirebaseOptions } from "@firebase/app";
import { Settings } from "@firebase/firestore";

interface FirebaseConfig {
  /** Firebase options to initialize firebase app */
  options: FirebaseOptions;
  /** Settings to intialize firestore */
  settings: Settings;
}

export interface AppConfig {
  firebaseConfig: FirebaseConfig;
}

// Create a react context containing the firebase config (with initial values). When React renders a component that subscribes to this
// Context object it will read the current context value from the closest matching Provider above it in the tree.
const AppConfigContext = createContext<AppConfig>({
  firebaseConfig: {
    options: {
      projectId: "cdp-test-deployment-435b5309",
    },
    settings: {},
  },
});

interface AppConfigProviderProps {
  appConfig: AppConfig;
  children: ReactNode;
}

/**
 *
 * A Provider component that allows consuming components to subscribe to context changes.
 * @example
 * <AppConfigProvider appConfig={appConfig}>
 *  <App />
 * <AppConfigProvider />
 *
 */
export const AppConfigProvider: FC<AppConfigProviderProps> = ({
  appConfig,
  children,
}: AppConfigProviderProps) => {
  return <AppConfigContext.Provider value={appConfig}>{children}</AppConfigContext.Provider>;
};

/**
 *
 * React hook to get the current app config context. This hook can be used by only components that are children
 * of the AppConfigProvider component.
 */
export const useAppConfigContext = () => {
  const context = useContext(AppConfigContext);

  if (context === undefined) {
    throw new Error("useAppConfigContext must be used within a AppConfigProvider");
  }

  return context;
};
