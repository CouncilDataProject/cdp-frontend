import { FilterState } from "../reducer";

/**The list of sort by options and their corresponding labels. */
export const sortBy = {
  date: "Most recent",
  value: "Most relevant",
} as const;

/**The type of a sort by option. */
export type SortByOption = keyof typeof sortBy;

/**
 * Generate the text representation of a sort object.
 * @param {Object} sort The sort object.
 * @param {string} sort.by
 * @param {string} defaultText The default text representation,
 * when no sort options are selected.
 * @return {string} The text representation.
 */
const getSortingText = (sort: FilterState<string>, defaultText: string): string => {
  let textRep = defaultText;
  if (sort.by && sort.by in sortBy) {
    textRep = sortBy[sort.by as SortByOption];
  }
  return textRep;
};

export default getSortingText;
