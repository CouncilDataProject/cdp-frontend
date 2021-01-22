import React, { ChangeEvent, FunctionComponent } from "react";
import "@mozilla-protocol/core/protocol/css/protocol.css";
import { FilterState } from "../reducer";

export interface SelectDateRangeProps {
  /**The date range state. */
  state: FilterState<string>;
  /**Callback to update the date range state. */
  update(keyName: string, dataValue: string): void;
}

/**Two input fields to select start and end dates.  */
const SelectDateRange: FunctionComponent<SelectDateRangeProps> = ({
  state,
  update,
}: SelectDateRangeProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const dateInputName = e.currentTarget.name;
    const dateInputValue = e.currentTarget.value;
    update(dateInputName, dateInputValue);
  };

  return (
    <form className="mzp-c-form">
      <div className="mzp-c-field">
        <label className="mzp-c-field-label" htmlFor="date">
          From
        </label>
        <input
          className="mzp-c-field-control"
          type="date"
          name="start"
          id="form-input-control-start-date"
          value={state.start}
          onChange={onChange}
        ></input>
      </div>
      <div className="mzp-c-field">
        <label className="mzp-c-field-label" htmlFor="date">
          To
        </label>
        <input
          className="mzp-c-field-control"
          type="date"
          name="end"
          id="form-input-control-end-date"
          value={state.end}
          onChange={onChange}
        ></input>
      </div>
    </form>
  );
};

export default SelectDateRange;
