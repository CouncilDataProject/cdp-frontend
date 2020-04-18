import React, { FormEvent, FunctionComponent } from "react";

import { CheckboxProps, Form } from "semantic-ui-react";

import { FilterState } from "../reducer";
import { sortBy, SortByOption } from "./getSortingText";

export interface SelectSortingProps {
  /**The list of sort by options.
   * `date` means sort by date in descending order. `value` means sort by search results' relevancy in descending order.
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

  return (
    <Form>
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
    </Form>
  );
};

export default SelectSorting;
