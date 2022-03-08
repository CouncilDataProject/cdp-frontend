import React, { createContext, ReactNode, FC, useContext } from "react";

export interface LanguageConfig {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

const LanguageConfigContext = createContext<LanguageConfig>({
  language: "en",
  setLanguage: () => undefined,
});

interface LanguageConfigProviderProps {
  languageConfig: LanguageConfig;
  children: ReactNode;
}

export const LanguageConfigProvider: FC<LanguageConfigProviderProps> = ({
  languageConfig,
  children,
}: LanguageConfigProviderProps) => {
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
