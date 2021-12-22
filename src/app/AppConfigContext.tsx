import React, { createContext, ReactNode, FC, useContext } from "react";
import { FirebaseOptions } from "@firebase/app";
import { FirestoreSettings } from "@firebase/firestore";

export interface FirebaseConfig {
  /** Firebase options to initialize firebase app */
  options: FirebaseOptions;
  /** Settings to intialize firestore */
  settings: FirestoreSettings;
}

export interface AppConfig {
  firebaseConfig: FirebaseConfig;
  municipality: {
    name: string;
    footerLinksSections: {
      footerLinksSectionName: string;
      links: {
        label: string;
        url: string;
      }[];
    }[];
  };
}

// Create a react context containing the firebase config (with initial values). When React renders a component that subscribes to this
// Context object it will read the current context value from the closest matching Provider above it in the tree.
const AppConfigContext = createContext<AppConfig>({
  firebaseConfig: {
    options: {
      projectId: "cdp-test-deployment-435b5309",
    },
    settings: {
      // merge bool Whether to merge the provided settings with the existing settings. If set to true, the settings are merged with existing settings. If set to false or left unset, the settings replace the existing settings.
      // ssl bool Whether to use SSL when connecting.
      // ignoreUndefinedProperties bool Whether to skip nested properties that are set to undefined during object serialization. If set to true, these properties are skipped and not written to Firestore. If set to false or omitted, the SDK throws an exception when it encounters properties of type undefined.
      // cacheSizeBytes bool An approximate cache size threshold for the on-disk data. If the cache grows beyond this size, Firestore will start removing data that hasn't been recently used. The size is not a guarantee that the cache will stay below that size, only that if the cache exceeds the given size, cleanup will be attempted.
      // The default value is 40 MB. The threshold must be set to at least 1 MB, and can be set to CACHE_SIZE_UNLIMITED to disable garbage collection.
    },
  },
  municipality: {
    name: "Test deployment",
    footerLinksSections: [],
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
