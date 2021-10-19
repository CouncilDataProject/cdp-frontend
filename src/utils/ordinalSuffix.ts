/**
 *
 * @param i any real number
 * @returns the string suffix appropriate for that number to make it an ordinal (e.g. for 1, return 'st' to make "1st")
 */
function ordinalSuffix(i: number) {
  const j = i % 10;
  const k = i % 100;
  if (j == 1 && k != 11) {
    return i + "st";
  }
  if (j == 2 && k != 12) {
    return i + "nd";
  }
  if (j == 3 && k != 13) {
    return i + "rd";
  }
  return i + "th";
}

export default ordinalSuffix;
