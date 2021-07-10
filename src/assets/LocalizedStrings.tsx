import * as Languages from "./strings";
import LocalizedStrings, { GlobalStrings } from "react-localization";
/**
 * When adding strings:
 * all keys should be snake case:  like_this
 * add strings to MasterStringsList as a <your_string_name>: string
 * all the language files will then require it.
 **/

export interface MasterStringsList extends GlobalStrings<string> {
  tags: string;
  same: string;
}

export const strings: MasterStringsList = new LocalizedStrings({
  en: Languages.en,
  de: Languages.de,
});
