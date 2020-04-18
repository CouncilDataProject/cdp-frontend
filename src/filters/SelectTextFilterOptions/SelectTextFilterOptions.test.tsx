import React from "react";

import { shallow, ShallowWrapper } from "enzyme";

import SelectTextFilterOptions, { SelectTextFilterOptionsProps } from "./SelectTextFilterOptions";

describe("SelectTextFilterOptions", () => {
  let selectTextFilterOptions: ShallowWrapper<SelectTextFilterOptionsProps>;
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
      selectTextFilterOptions = shallow(
        <SelectTextFilterOptions
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
      expect(selectTextFilterOptions.find("OptionQueryInput")).toHaveLength(1);
    });

    test(`Shows 5 Checkboxes matched by optionQuery: ${optionQuery}`, () => {
      expect(selectTextFilterOptions.find("FormCheckbox[disabled=false]")).toHaveLength(5);
    });

    test(`Disables the unmatched d1 Checkbox for optionQuery: ${optionQuery}`, () => {
      expect(selectTextFilterOptions.find("FormCheckbox[disabled=true][name='d1']")).toHaveLength(
        1
      );
    });

    test(`The unmatched d1 Checkbox is the last option for optionQuery: ${optionQuery}`, () => {
      expect(selectTextFilterOptions.find("FormCheckbox").at(5).prop("name")).toEqual("d1");
    });

    test("Calls setOptionQuery with correct arg", () => {
      selectTextFilterOptions
        .find("OptionQueryInput")
        .at(0)
        .simulate("change", "", { value: "c1" });
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
      selectTextFilterOptions = shallow(
        <SelectTextFilterOptions
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
      expect(selectTextFilterOptions.find("OptionQueryInput")).toHaveLength(0);
    });

    test("Renders 3 total Checkboxes", () => {
      expect(selectTextFilterOptions.find("FormCheckbox[disabled=false]").length).toEqual(
        options.length
      );
    });

    test("Calls update filter with correct args", () => {
      for (let i = 0; i < options.length; i++) {
        selectTextFilterOptions
          .find("FormCheckbox")
          .at(i)
          .simulate("change", "", { name: options[i].name, checked: true });
        expect(updateMock).toHaveBeenCalledWith(options[i].name, true);
      }
      expect(updateMock).toHaveBeenCalledTimes(options.length);
    });
  });
});
