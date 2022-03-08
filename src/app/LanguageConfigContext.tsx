import React, { createContext, ReactNode, FC, useContext, SetStateAction, Dispatch } from "react";

export interface LanguageConfig {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
}

const LanguageConfigContext = createContext<LanguageConfig>({
  language: "en",
  setLanguage: () => undefined,
});

interface AppConfigProviderProps {
  languageConfig: LanguageConfig;
  children: ReactNode;
}

export const LanguageConfigProvider: FC<AppConfigProviderProps> = ({
  languageConfig,
  children,
}: AppConfigProviderProps) => {
  return (
    <LanguageConfigContext.Provider value={languageConfig}>
      {children}
    </LanguageConfigContext.Provider>
  );
};

export const useLanguageConfigContext = () => {
  const context = useContext(LanguageConfigContext);

  if (context === undefined) {
    throw new Error("useLanguageConfigContext must be used within a LanguageConfigProvider");
  }

  return context;
};
