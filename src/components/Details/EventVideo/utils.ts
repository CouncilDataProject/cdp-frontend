import videojs from "video.js";

import { SUPPORTED_LANGUAGES } from "../../../constants/ProjectConstants";

export const initVideoJsLanguages = () => {
  SUPPORTED_LANGUAGES.map((lang) => {
    try {
      const langJson = require(`video.js/dist/lang/${lang}.json`);
      //Include the language file to video.js
      videojs.addLanguage(lang, langJson);
    } catch (e) {
      console.error(e, `Language ${lang} wasn't add to video.js`);
    }
  });
};
