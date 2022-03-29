import { FilterState } from "../reducer";

import getTimeZoneDate from "../../../utils/getTimeZoneName";

const getDateText =
  (language: string, timeZone: string) =>
  (dateRange: FilterState<string>, defaultText: string): string => {
    const timeZoneStartDate = getTimeZoneDate(new Date(dateRange.start), timeZone);
    const timeZoneEndDate = getTimeZoneDate(new Date(dateRange.end), timeZone);
    const startString = timeZoneStartDate?.toLocaleDateString(language, {
      timeZone,
      month: "short",
      day: "numeric",
      year:
        timeZoneStartDate.getUTCFullYear() === timeZoneEndDate?.getUTCFullYear()
          ? undefined
          : "numeric",
    });
    const endString = timeZoneEndDate?.toLocaleDateString(language, {
      timeZone,
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    let textRep;
    if (timeZoneStartDate && timeZoneEndDate) {
      textRep = `${startString} - ${endString}`;
    } else if (timeZoneStartDate) {
      textRep = `${startString} -`;
    } else if (timeZoneEndDate) {
      textRep = `- ${endString}`;
    } else {
      textRep = defaultText;
    }
    return textRep;
  };

export default getDateText;
