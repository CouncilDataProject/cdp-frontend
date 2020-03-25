import React from "react";

import { shallow, ShallowWrapper } from "enzyme";

import SelectFilterOptions, { SelectFilterOptionsProps } from "./SelectFilterOptions";

describe("SelectFilterOptions", () => {
  let selectFilterOptions: ShallowWrapper<SelectFilterOptionsProps>;
  const setOptionQueryMock = jest.fn();
  const updateMock = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("With the number of filter options > 5", () => {
    const options = [
      { name: "c1", text: "c1", disabled: false },
      { name: "c2", text: "c2", disabled: false },
      { name: "c3", text: "c3", disabled: false },
      { name: "c4", text: "c4", disabled: false },
      { name: "c5", text: "c5", disabled: false },
      { name: "d1", text: "d1", disabled: false },
    ];

    const optionQuery = "c";

    beforeEach(() => {
      selectFilterOptions = shallow(
        <SelectFilterOptions
          name={"test"}
          state={{}}
          update={updateMock}
          options={options}
          optionQuery={optionQuery}
          setOptionQuery={setOptionQueryMock}
        />
      );
    });

    test("Renders OptionQueryInput for optionQuery", () => {
      expect(selectFilterOptions.find("OptionQueryInput")).toHaveLength(1);
    });

    test(`Shows 5 Checkboxes matched by optionQuery: ${optionQuery}`, () => {
      expect(selectFilterOptions.find("FormCheckbox[disabled=false]")).toHaveLength(5);
    });

    test(`Disables the unmatched d1 Checkbox for optionQuery: ${optionQuery}`, () => {
      expect(selectFilterOptions.find("FormCheckbox[disabled=true][name='d1']")).toHaveLength(1);
    });

    test(`The unmatched d1 Checkbox is the last option for optionQuery: ${optionQuery}`, () => {
      expect(selectFilterOptions.find("FormCheckbox").at(5).prop("name")).toEqual("d1");
    });

    test("Calls setOptionQuery with correct arg", () => {
      selectFilterOptions.find("OptionQueryInput").at(0).simulate("change", "", { value: "c1" });
      expect(setOptionQueryMock).toHaveBeenCalledWith("c1");
    });
  });

  describe("With the number of filter options <= 5", () => {
    const options = [
      { name: "c1", text: "c1", disabled: false },
      { name: "c2", text: "c2", disabled: false },
      { name: "d1", text: "d1", disabled: false },
    ];

    beforeEach(() => {
      selectFilterOptions = shallow(
        <SelectFilterOptions
          name={"test"}
          state={{}}
          update={updateMock}
          options={options}
          optionQuery={""}
          setOptionQuery={setOptionQueryMock}
        />
      );
    });

    test("Does not render OptionQueryInput for optionQuery", () => {
      expect(selectFilterOptions.find("OptionQueryInput")).toHaveLength(0);
    });

    test("Renders 3 total Checkboxes", () => {
      expect(selectFilterOptions.find("FormCheckbox[disabled=false]").length).toEqual(
        selectFilterOptions.find("FormCheckbox").length
      );
    });

    test("Calls update filter with correct args", () => {
      for (let i = 0; i < options.length; i++) {
        selectFilterOptions
          .find("FormCheckbox")
          .at(i)
          .simulate("change", "", { name: options[i].name, checked: true });
        expect(updateMock).toHaveBeenCalledWith(options[i].name, true);
      }
      expect(updateMock).toHaveBeenCalledTimes(options.length);
    });
  });
});
