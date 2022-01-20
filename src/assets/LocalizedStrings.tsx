import * as Languages from "./strings";
import LocalizedStrings, { LocalizedStringsMethods } from "react-localization";
/**
 * When adding strings:
 * all keys should be snake case: like_this
 * add strings to MasterStringsList as a <your_string_name>: string
 * then add the same key (and a localized value!) to each language file in ./strings
 *
 * When adding a new language:
 * add a file with the appropriate name to ./strings
 * add that file to the index in ./strings
 * add the languageCode to SUPPORTED_LANGUAGES in ../constants/ProjectConstants
 *
 * Be aware that you must `npm run build` before `npm run localize` will work if you have made changes
 **/
export interface MasterStringsList extends LocalizedStringsMethods {
  [propName: string]: any;
  keywords: string;
  same: string;
  select_language: string;
  committee: string;
  chair: string;
  tenure: string;
  bills_sponsored: string;
  see_documents: string;
  jump_to_sentence_video: string;
  jump_to_sentence_transcript: string;
  search_transcript: string;
  search_transcript_placeholder: string;
  number_of_results: string;
  clear: string;
  save: string;
  about: string;
  search: string;
  copyright_notice: string;
  content_license_prefix: string;
  content_license_link: string;
  content_license_link_text: string;
  tools_license_prefix: string;
  styled_using_prefix: string;
  artwork_provided_by_prefix: string;
  passed: string;
  failed: string;
  approve: string;
  reject: string;
  abstain_approve: string;
  abstain_non_voting: string;
  abstain_reject: string;
  absent_approve: string;
  absent_non_voting: string;
  absent_reject: string;
  rejected: string;
  adopted: string;
  in_progress: string;
  example_prefix: string;
  search_topic_placeholder: string;
  links: string;
  events: string;
  people: string;
  council_data_project: string;
  search_municipality_name: string;
  number_approved: string;
  number_rejected: string;
  number_non_voting: string;
  legislation: string;
  council_decision: string;
  votes: string;
  meeting: string;
  persons_vote: string;
  meeting_votes_caption: string;
  en: string;
  de: string;
  es: string;
}

export const strings: MasterStringsList = new LocalizedStrings({
  en: Languages.en,
  de: Languages.de,
  es: Languages.es,
});
