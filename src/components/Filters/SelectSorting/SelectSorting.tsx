import React, { FormEvent, FunctionComponent } from "react";
import { FilterState } from "../reducer";
import { SortOption } from "./getSortingText";
import Form from "../Shared/Form";

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
  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const [by, order] = (e.currentTarget.value as string).split("#");
    update("by", by);
    update("order", order);
    if (e.currentTarget.parentNode) {
      const radioLabel = e.currentTarget.parentNode.textContent;
      if (radioLabel) {
        update("label", radioLabel);
      }
    }
    onPopupClose();
  };

  return (
    <Form className="mzp-c-form">
      <fieldset className="mzp-c-field-set">
        <div className="mzp-c-choices">
          {sortOptions.map((sortOption) => (
            <div key={sortOption.label} className="mzp-c-choice">
              <input
                className="mzp-c-choice-control"
                type="radio"
                id={`form-checkbox-control-${sortOption.label}`}
                value={`${sortOption.by}#${sortOption.order}`}
                checked={state.label === sortOption.label}
                onChange={onChange}
              />
              <label
                className="mzp-c-choice-label"
                htmlFor={`form-checkbox-control-${sortOption.label}`}
              >
                {sortOption.label}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </Form>
  );
};

export default SelectSorting;
