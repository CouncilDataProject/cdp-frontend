import * as Languages from "./strings";
import { SUPPORTED_LANGUAGES } from "../constants/ProjectConstants";
import LocalizedStrings, { GlobalStrings, LocalizedStringsMethods } from "react-localization";
/**
 * When adding strings:
 * all keys should be snake case: like_this
 * add strings to MasterStringsList as a <your_string_name>: string
 * all the language files will then require it.
 *
 * When adding a new language:
 * add a file with the appropriate name to ./strings
 * add that file to the index in ./strings
 * add the languageCode to SUPPORTED_LANGUAGES in ../constants/ProjectConstants
 *
 * Be aware that you must `npm run build` before `npm run localize` will work if you have made changes
 **/

export interface MasterStringsList extends LocalizedStringsMethods {
  tags: string;
  select_language: string;
  same: string;
}

export const strings: MasterStringsList = new LocalizedStrings({
  en: Languages.en,
  de: Languages.de,
});
