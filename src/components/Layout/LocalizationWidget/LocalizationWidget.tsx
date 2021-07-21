import React, { useReducer } from "react";
import { strings } from "../../../assets/LocalizedStrings";
import { Dropdown, Button } from "semantic-ui-react";
import { SUPPORTED_LANGUAGES } from "../../../constants/ProjectConstants";

function DropdownExampleSearchDropdown() {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const languageOptions = SUPPORTED_LANGUAGES.map((supportedLanguage) => {
    return {
      key: supportedLanguage,
      text: supportedLanguage,
      value: supportedLanguage,
      content: (
        <Button
          content={`${supportedLanguage}`}
          subheader={`${supportedLanguage}`}
          onClick={() => {
            console.log(`Language changed to ${supportedLanguage}`);
            strings.setLanguage(supportedLanguage);
            forceUpdate();
          }}
        />
      ),
    };
  });

  return (
    <Dropdown
      button
      className="icon"
      floating
      labeled
      icon="world"
      options={languageOptions}
      text={strings.select_language}
    />
  );
}

export default DropdownExampleSearchDropdown;
