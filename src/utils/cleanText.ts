/**
 * cleanText function is almost a mirror of the `clean_text` function from
 * cdp-backend Python. Only major difference is there is no boolean parameter
 * for indicating if we want to clean stopwords, this function is only currently
 * used for searching and thus should always clean stopwords.
 *
 * Removes punctuation, line breaks, tabs, special character strings, stopwords,
 * and any extra spaces in string (2+ spaces become 1 space).
 *
 */
const cleanText = (text: string): string => {
  // Replace new line and tab characters with a space
  let cleanedText = text.replace(/[\t\n]+/g, " ");

  // Replace common strings used by documents on backend
  // Not _really_ needed here but a nice safety measure to match the alg
  cleanedText = cleanedText.replace(/[\-\-]/g, " ");

  // Same as Python standard punctuation string
  cleanedText = cleanedText.replace(/['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g, "");

  // Remove extra spaces
  cleanedText = cleanedText.replace(/\s{2,}/g, " ");

  // Remove leading and trailing spaces
  return cleanedText.trim();
};

export default cleanText;
