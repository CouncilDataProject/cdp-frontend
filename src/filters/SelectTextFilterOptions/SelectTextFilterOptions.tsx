import React, { ChangeEvent, Dispatch, FormEvent, FunctionComponent } from "react";

import styled from "@emotion/styled";
import { Checkbox, CheckboxProps, Form, Input, InputOnChangeData } from "semantic-ui-react";

import { FilterState } from "../reducer";
import isSubstring from "../../utils/isSubstring";

const OptionQueryInput = styled(Form.Field)({
  paddingRight: ".8em",
});
OptionQueryInput.displayName = "OptionQueryInput";

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
  optionQuery: string;
  /**React Dispatch callback to update the search string state. */
  setOptionQuery: Dispatch<string>;
}

const SelectTextFilterOptions: FunctionComponent<SelectTextFilterOptionsProps> = ({
  name,
  state,
  update,
  options,
  optionQuery,
  setOptionQuery,
}: SelectTextFilterOptionsProps) => {
  const onChange = (e: FormEvent<HTMLInputElement>, data: CheckboxProps) => {
    update(data.name as string, data.checked as boolean);
  };

  const onOptionQueryChange = (e: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    setOptionQuery(data.value);
  };

  let optionsInOrder = [...options];
  if (options.length > 5) {
    for (const option of options) {
      option.disabled = !isSubstring(option.label, optionQuery);
    }

    optionsInOrder = [
      ...options.filter((option) => !option.disabled),
      ...options.filter((option) => option.disabled),
    ];
  }

  return (
    <Form>
      {options.length > 5 && (
        <OptionQueryInput
          control={Input}
          id="form-input-control-search-filter"
          label={`Search ${name} Options`}
          onChange={onOptionQueryChange}
          value={optionQuery}
        />
      )}
      {optionsInOrder.map((option) => (
        <Form.Field
          checked={state[option.name]}
          control={Checkbox}
          disabled={option.disabled}
          id={`form-checkbox-control-${option.label}`}
          key={option.name}
          label={option.label}
          name={option.name}
          onChange={onChange}
        />
      ))}
    </Form>
  );
};

export default SelectTextFilterOptions;
