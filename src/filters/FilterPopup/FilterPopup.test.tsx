import React from "react";

import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";

import FilterPopup, { FilterPopupProps } from "./FilterPopup";

describe("FilterPopup", () => {
  const clearMock = jest.fn();
  const getTextRepMock = jest.fn();
  const isActiveMock = jest.fn();
  const header = "test";
  const popupIsOpen = false;
  const setPopupIsOpenMock = jest.fn();
  const handlePopupCloseMock = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Calls setPopupisOpen callback to open popup", () => {
    const filterPopupMount: ReactWrapper<FilterPopupProps> = mount(
      <FilterPopup
        clear={clearMock}
        getTextRep={getTextRepMock}
        isActive={isActiveMock}
        header={header}
        popupIsOpen={popupIsOpen}
        setPopupIsOpen={setPopupIsOpenMock}
        handlePopupClose={handlePopupCloseMock}
      >
        Test
      </FilterPopup>
    );
    expect(setPopupIsOpenMock).toHaveBeenCalledTimes(0);
    filterPopupMount.find("Button").simulate("click");
    expect(setPopupIsOpenMock).toHaveBeenCalledTimes(1);
  });

  describe("FilterPopup shallow render", () => {
    let filterPopup: ShallowWrapper<FilterPopupProps>;

    beforeEach(() => {
      filterPopup = shallow(
        <FilterPopup
          clear={clearMock}
          getTextRep={getTextRepMock}
          isActive={isActiveMock}
          header={header}
          popupIsOpen={popupIsOpen}
          setPopupIsOpen={setPopupIsOpenMock}
          handlePopupClose={handlePopupCloseMock}
        >
          Test
        </FilterPopup>
      );
    });

    test("Calls clear filter callback", () => {
      expect(clearMock).toHaveBeenCalledTimes(0);
      filterPopup.find("Button[size='mini']").at(0).simulate("click");
      expect(clearMock).toHaveBeenCalledTimes(1);
    });

    test("Calls handPopupClose callback", () => {
      expect(setPopupIsOpenMock).toHaveBeenCalledTimes(0);
      expect(handlePopupCloseMock).toHaveBeenCalledTimes(0);
      filterPopup.find("Button[size='mini']").at(1).simulate("click");
      expect(setPopupIsOpenMock).toHaveBeenCalledTimes(1);
      expect(handlePopupCloseMock).toHaveBeenCalledTimes(1);
    });
  });
});
