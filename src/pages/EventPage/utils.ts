import videojs from "video.js";

import esJson from "video.js/dist/lang/es.json";
import deJson from "video.js/dist/lang/de.json";

export const initVideoJsLanguages = () => {
  videojs.addLanguage("es", esJson);
  videojs.addLanguage("de", deJson);
};
