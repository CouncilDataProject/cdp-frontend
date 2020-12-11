import moment from "moment";

import { FilterState } from "../reducer";

/**
 * Generate the text representation of a date range.
 * @param {Object} dateRange The start and end dates object.
 * @param {string} dateRange.start
 * @param {string} dateRange.end
 * @param {string} defaultText The default text representation, when no dates have been entered.
 * @return {string} The text representation.
 */
const getDateText = (dateRange: FilterState<string>, defaultText: string): string => {
  const start = moment.utc(dateRange.start, "YYYY-MM-DD");
  const end = moment.utc(dateRange.end, "YYYY-MM-DD");
  const startString = start.format("MMM D, YYYY");
  const endString = end.format("MMM D, YYYY");
  let textRep;
  if (dateRange.start && dateRange.end) {
    if (start.year() === end.year() && start.month() === end.month()) {
      textRep = `${startString.split(",")[0]} - ${end.date()}, ${end.year()}`;
    } else if (start.year() === end.year()) {
      textRep = `${startString.split(",")[0]} - ${endString.split(",")[0]}, ${end.year()}`;
    } else {
      textRep = `${startString} - ${endString}`;
    }
  } else if (dateRange.start) {
    textRep = `${startString} -`;
  } else if (dateRange.end) {
    textRep = `- ${endString}`;
  } else {
    textRep = defaultText;
  }
  return textRep;
};

export default getDateText;
