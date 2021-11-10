import React, { ChangeEvent, Dispatch, FunctionComponent, useMemo } from "react";
import { some } from "lodash";

import { FilterState } from "../reducer";

import isSubstring from "../../../utils/isSubstring";

import "@mozilla-protocol/core/protocol/css/protocol.css";
import "@mozilla-protocol/core/protocol/css/protocol-components.css";

/**The type of of a filter option. */
interface FilterOption {
  /**The name of the filter option. E.g. A Council Commitee's name is the id of the commitee. */
  name: string;
  /**The visible text of filter option. */
  label: string;
  /**Whether the filter option is disabled. */
  disabled: boolean;
}

export interface SelectTextFilterOptionsProps {
  /**The name of the filter state. E.g. `Committee` is the name of filtering by Council Committee names. */
  name: string;
  /**The filter state. The string `keyName` of filter state object is the filter option.
   * The boolean `dataValue` is whether the filter option is selected
   */
  state: FilterState<boolean>;
  /**Callback to update the filter state. */
  update(keyName: string, dataValue: boolean): void;
  /**The list of filter options. E.g. Filtering by Council Committee names has a list of committees. */
  options: FilterOption[];
  /**The search string state to narrow the list of filter options. */
  optionQuery?: string;
  /**React Dispatch callback to update the search string state. */
  setOptionQuery?: Dispatch<string>;
  /**At least one option is selected regarding the filter? */
  hasRequiredError?: boolean;
  /**The number of selected options exceeded the allowed limit of selected options? */
  hasLimitError?: boolean;
  /**The number of allowed selected options. */
  limit?: number;
}

const SelectTextFilterOptions: FunctionComponent<SelectTextFilterOptionsProps> = ({
  name,
  state,
  update,
  options,
  optionQuery,
  setOptionQuery,
  hasRequiredError,
  hasLimitError,
  limit,
}: SelectTextFilterOptionsProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const filterOptionName = e.currentTarget.name;
    const isFilterOptionChecked = e.currentTarget.checked;
    update(filterOptionName, isFilterOptionChecked);
  };

  const onOptionQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value;
    if (setOptionQuery) {
      setOptionQuery(currentValue);
    }
  };

  const optionsInOrder = useMemo(() => {
    let optionsInOrder = [...options];
    if (options.length > 5 && setOptionQuery) {
      for (const option of options) {
        option.disabled = !isSubstring(option.label, optionQuery || "");
      }

      optionsInOrder = [
        ...options.filter((option) => !option.disabled),
        ...options.filter((option) => option.disabled),
      ];
    }
    return optionsInOrder;
  }, [options, optionQuery, setOptionQuery]);

  const hasError = some([hasRequiredError, hasLimitError]);

  const errors = useMemo(() => {
    const errors: string[] = [];
    if (hasRequiredError) {
      errors.push(`Please select at least one ${name.toLowerCase()}.`);
    }
    if (hasLimitError) {
      errors.push(`Please select only ${limit} or fewer ${name.toLowerCase()}s.`);
    }
    return errors;
  }, [hasRequiredError, hasLimitError, name, limit]);

  return (
    <form className="mzp-c-form">
      {options.length > 5 && setOptionQuery && (
        <div className="mzp-c-field">
          <label className="mzp-c-field-label" htmlFor="form-input-control-search-filter">
            {`Search ${name} Options`}
          </label>
          <input
            className="mzp-c-field-control"
            type="text"
            id="form-input-control-search-filter"
            value={optionQuery}
            onChange={onOptionQueryChange}
          />
        </div>
      )}
      <fieldset className="mzp-c-field-set">
        <div className="mzp-c-choices">
          {optionsInOrder.map((option) => (
            <div key={option.name} className="mzp-c-choice">
              <input
                className="mzp-c-choice-control"
                type="checkbox"
                name={option.name}
                id={`form-checkbox-control-${option.name}`}
                checked={state[option.name]}
                disabled={option.disabled}
                onChange={onChange}
              />
              <label
                className="mzp-c-choice-label"
                htmlFor={`form-checkbox-control-${option.name}`}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
      {hasError && (
        <div className="mzp-c-form-errors">
          <ul className="mzp-u-list-styled">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default SelectTextFilterOptions;
