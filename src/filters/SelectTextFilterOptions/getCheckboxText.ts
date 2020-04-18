import { FilterState } from "../reducer";

/**
 * Generate the text representation of a list of checkboxes, by appending the number of selected checkboxes
 * to the defaultText.
 * @param {Object} checkboxes The object representation of the list of checkboxes,
 * where the keys are the different options, and each value is a boolean(whether the option is selected).
 * @param {string} defaultText The default text representation, when no checkboxes are selected.
 * @returns {string} The text representation.
 */
const getCheckboxText = (checkboxes: FilterState<boolean>, defaultText: string): string => {
  const numberOfSelectedCheckbox = Object.values(checkboxes).filter((dataValue) => dataValue)
    .length;
  const textRep = numberOfSelectedCheckbox
    ? `${defaultText} : ${numberOfSelectedCheckbox}`
    : defaultText;
  return textRep;
};

export default getCheckboxText;
