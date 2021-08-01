import React, { ChangeEventHandler, useState } from "react";
import { strings } from "../../../assets/LocalizedStrings";
import { SUPPORTED_LANGUAGES } from "../../../constants/ProjectConstants";

function DropdownExampleSearchDropdown() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(SUPPORTED_LANGUAGES[0]);
  const onSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    console.log(`Language changed to ${e.target.value}`);
    strings.setLanguage(e.target.value);
    setSelectedLanguage(e.target.value);
  };

  return (
    <>
      <label htmlFor="language">{strings.select_language}</label>
      <select id="language" name="language" value={selectedLanguage} onChange={onSelect}>
        {SUPPORTED_LANGUAGES.map((supportedLanguage) => (
          <option key={supportedLanguage} value={supportedLanguage}>
            {strings[supportedLanguage]}
          </option>
        ))}
      </select>
    </>
  );
}

export default DropdownExampleSearchDropdown;
