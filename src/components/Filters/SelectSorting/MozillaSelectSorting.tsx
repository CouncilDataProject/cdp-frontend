import React, { FormEvent, FunctionComponent } from "react";

import { Checkbox, CheckboxProps, Form } from "semantic-ui-react";
import "@mozilla-protocol/core/protocol/css/protocol.css";

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
const MozillaSelectSorting: FunctionComponent<SelectSortingProps> = ({
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

  const onChangeTest = (event: FormEvent<HTMLLabelElement>) => {
    console.log(event);
  };

  return (
    <form className="mzp-c-form">
      {sortOptions.map((sortOption) => (
        <label key={sortOption.label} onChange={onChangeTest}>
          <input
            type="radio"
            name="radios"
            id={`form-checkbox-control-${sortOption.label}`}
            value={`${sortOption.by}#${sortOption.order}`}
            // checked={state.label === sortOption.label}
          />{" "}
          {sortOption.label}
        </label>
      ))}
    </form>
  );
};

export default MozillaSelectSorting;
