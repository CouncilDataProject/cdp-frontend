import React, { ChangeEvent, FunctionComponent } from "react";

import { Form, Input, InputOnChangeData } from "semantic-ui-react";

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
  const onChange = (e: ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    update(data.name as string, data.value);
  };

  return (
    <Form>
      <Form.Field
        control={Input}
        fluid
        id="form-input-control-start-date"
        label="From"
        name="start"
        type="date"
        onChange={onChange}
        value={state.start}
      />
      <Form.Field
        control={Input}
        fluid
        id="form-input-control-end-date"
        label="To"
        name="end"
        type="date"
        onChange={onChange}
        value={state.end}
      />
    </Form>
  );
};

export default SelectDateRange;
