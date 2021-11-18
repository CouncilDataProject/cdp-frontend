import { FilterState } from "../reducer";

/**
 * @param {Object} checkboxes The object representation of a list of checkboxes,
 * where the keys are the different options, and each value is a boolean(whether the option is selected).
 * @return {string[]} The list of selected options.
 */
const getSelectedOptions = (checkboxes: FilterState<any>): string[] => {
  return Object.keys(checkboxes).filter((k) => checkboxes[k] === true);
};

export default getSelectedOptions;
