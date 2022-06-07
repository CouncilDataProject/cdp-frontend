/**
 * Extract the month, date, and year from a Date into a new Date with a different timeZone
 * Ex: 1/1/2022, 12:00:00 AM UTC -> 1/1/2022, 12:00:00 AM PST
 * @param date
 * @param timeZone
 * @returns The date in the specificed timeZone
 */
export default function getTimeZoneDate(date: Date, timeZone: string) {
  if (isNaN(date.getTime())) {
    return undefined;
  }

  // calculate the date in the given timeZone
  // ex: 1/1/2022, 12:00:00 AM PST
  const dateWithTimeZone = date.toLocaleString("en-US", {
    timeZone,
    timeZoneName: "short",
  });
  // get the timeZoneName for the given timeZone
  // ex: PST
  const timeZoneName = dateWithTimeZone.split(" ").pop();

  // get the UTC string of the date
  // ex: 1/1/2022, 12:00:00 AM UTC
  const dateWithUtc = date
    .toLocaleString("en-US", { timeZone: "UTC", timeZoneName: "short" })
    .split(" ");
  // remove "UTC" from the string
  dateWithUtc.pop();
  // replace "UTC" with `timeZoneName` in the date
  return new Date(`${dateWithUtc.join(" ")} ${timeZoneName}`);
}
