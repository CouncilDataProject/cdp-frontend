import React, { FormEvent, FunctionComponent } from "react";

import { CheckboxProps, Form } from "semantic-ui-react";

import { ORDER_OPERATORS } from "../../api/database";
import { sortBy, SortByOption, sortOrder, SortOrderOption } from "./getSortingText";
import { FilterState } from "../reducer";

export interface SelectSortingProps {
  /**The list of sort by options.
   * `name` means sort by Council Commitee names. `date` means sort by event's datetime. `value` means sort by search result's relevance.
   * */
  sortByOptions: SortByOption[];
  /**The sorting state. */
  state: FilterState<string>;
  /**Callback to update the sorting state. */
  update(keyName: string, dataValue: string): void;
}

/**A list of radio checkboxes to allow for selecting sorting options. */
const SelectSorting: FunctionComponent<SelectSortingProps> = ({
  sortByOptions,
  state,
  update,
}: SelectSortingProps) => {
  const onChange = (e: FormEvent<HTMLInputElement>, data: CheckboxProps) => {
    update(data.name as string, data.value as string);
  };

  const sortOrderOptions: SortOrderOption[] = [ORDER_OPERATORS.asc, ORDER_OPERATORS.desc];

  return (
    <Form>
      <Form.Field>Sort By</Form.Field>
      {sortByOptions.map((byOption) => (
        <Form.Checkbox
          key={byOption}
          radio
          label={sortBy[byOption as SortByOption]}
          name="by"
          value={byOption}
          checked={state.by === byOption}
          onChange={onChange}
        />
      ))}
      <Form.Field>Sort Order</Form.Field>
      {sortOrderOptions.map((orderOption) => (
        <Form.Checkbox
          key={orderOption}
          radio
          disabled={!(state.by in sortBy)}
          label={sortOrder[orderOption as SortOrderOption]}
          name="order"
          value={orderOption}
          checked={state.order === orderOption}
          onChange={onChange}
        />
      ))}
    </Form>
  );
};

export default SelectSorting;
