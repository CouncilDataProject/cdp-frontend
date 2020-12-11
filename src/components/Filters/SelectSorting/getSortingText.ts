import { FilterState } from "../reducer";

export interface SortOption {
  /**The field to sort by */
  by: string;
  /**The order to sort by */
  order: string;
  /**The label of the sort option */
  label: string;
}

/**
 * Generate the text representation of a sort object.
 * @param {Object} sort The sort object.
 * @param {string} sort.by
 * @param {string} sort.order
 * @param {string} sort.label
 * @param {string} defaultText The default text representation,
 * when no sort options are selected.
 * @return {string} The text representation.
 */
const getSortingText = (sort: FilterState<string>, defaultText: string): string => {
  let textRep = defaultText;
  if (sort.by && sort.order && sort.label) {
    textRep = sort.label;
  }
  return textRep;
};

export default getSortingText;
