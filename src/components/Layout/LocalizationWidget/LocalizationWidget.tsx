import React, { ChangeEventHandler } from "react";
import { useLanguageConfigContext } from "../../../app/LanguageConfigContext";
import { strings } from "../../../assets/LocalizedStrings";
import { SUPPORTED_LANGUAGES } from "../../../constants/ProjectConstants";

function DropdownExampleSearchDropdown() {
  const { language, setLanguage } = useLanguageConfigContext();
  const onSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
    console.log(`Language changed to ${e.target.value}`);
    strings.setLanguage(e.target.value);
    setLanguage(e.target.value);
  };

  return (
    <>
      <label htmlFor="language">{strings.select_language}</label>
      <select id="language" name="language" value={language} onChange={onSelect}>
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
