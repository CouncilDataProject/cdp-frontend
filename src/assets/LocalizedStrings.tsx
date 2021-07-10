import { enStrings } from "./strings/en";
import { deStrings } from "./strings/de";
import LocalizedStrings, { LocalizedStringsMethods } from "react-localization";
/** When adding strings: */
/** all keys should be snake case (like_this) */
/** please do not forget to add strings for each locale */
export interface LocaleStrings extends LocalizedStringsMethods {
  tags: string;
  key2: string;
}

export const strings: LocaleStrings = new LocalizedStrings({
  en: enStrings,
  de: deStrings,
});
