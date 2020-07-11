import React, { FormEvent, FunctionComponent } from "react";

import { Checkbox, CheckboxProps, Form } from "semantic-ui-react";

import { FilterState } from "../reducer";
import { SortOption } from "./getSortingText";

export interface SelectSortingProps {
  /**The list of sort options. */
  sortOptions: SortOption[];
  /**The sorting state. */
  state: FilterState<string>;
  /**Callback to update the sorting state. */
  update(keyName: string, dataValue: string): void;
  /**Callback to close popup.*/
  onPopupClose(): void;
}

/**A list of radio checkboxes to allow for selecting sorting options. */
const SelectSorting: FunctionComponent<SelectSortingProps> = ({
  sortOptions,
  state,
  update,
  onPopupClose,
}: SelectSortingProps) => {
  const onChange = (e: FormEvent<HTMLInputElement>, data: CheckboxProps) => {
    const [by, order] = (data.value as string).split("#");
    update("by", by);
    update("order", order);
    update("label", data.label as string);
    onPopupClose();
  };

  return (
    <Form>
      {sortOptions.map((sortOption) => (
        <Form.Field
          checked={state.label === sortOption.label}
          control={Checkbox}
          id={`form-checkbox-control-${sortOption.label}`}
          key={sortOption.label}
          label={sortOption.label}
          onChange={onChange}
          radio
          value={`${sortOption.by}#${sortOption.order}`}
        />
      ))}
    </Form>
  );
};

export default SelectSorting;
