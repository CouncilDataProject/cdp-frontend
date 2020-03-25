import { FilterState } from "../reducer";

/**The list of sort by options and their corresponding labels. */
export const sortBy = {
  name: "Committee Name",
  date: "Event Date",
  value: "Search Relevance",
} as const;

/**The type of a sort by option. */
export type SortByOption = keyof typeof sortBy;

/**The list of sort order options and their corresponding labels. */
export const sortOrder = {
  asc: "Ascending",
  desc: "Descending",
} as const;

/**The type of a sort order option. */
export type SortOrderOption = keyof typeof sortOrder;

/**
 * Generate the text representation of a sort object.
 * @param {Object} sort The sort by and sort order options.
 * @param {string} sort.by
 * @param {string} sort.order
 * @param {string} defaultText The default text representation,
 * when no sort options are selected.
 * @return {string} The text representation.
 */
const getSortingText = (sort: FilterState<string>, defaultText: string): string => {
  let by;
  let order;
  if (sort.by && sort.by in sortBy) {
    by = sortBy[sort.by as SortByOption];
  }
  if (sort.order && sort.order in sortOrder) {
    order = sortOrder[sort.order as SortOrderOption];
  }
  let textRep = defaultText;
  if (by && order) {
    textRep += ` by ${by}: ${order}`;
  } else if (by) {
    textRep += ` by ${by}`;
  } else if (order) {
    textRep += ` ${order}`;
  } else {
    textRep += " By";
  }
  return textRep;
};

export default getSortingText;
