import React from "react";

import { mount, ReactWrapper, shallow, ShallowWrapper } from "enzyme";

import FilterPopup, { FilterPopupProps } from "./FilterPopup";

describe("FilterPopup", () => {
  const clearMock = jest.fn();
  const getTextRepMock = jest.fn();
  const isActiveMock = jest.fn();
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
        popupIsOpen={popupIsOpen}
        setPopupIsOpen={setPopupIsOpenMock}
        handlePopupClose={handlePopupCloseMock}
        closeOnChange={false}
      >
        Test
      </FilterPopup>
    );
    expect(setPopupIsOpenMock).toHaveBeenCalledTimes(0);
    filterPopupMount.find("TriggerButton").simulate("click");
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
          popupIsOpen={popupIsOpen}
          setPopupIsOpen={setPopupIsOpenMock}
          handlePopupClose={handlePopupCloseMock}
          closeOnChange={false}
        >
          Test
        </FilterPopup>
      );
    });

    test("Calls onClearFilter callback", () => {
      expect(clearMock).toHaveBeenCalledTimes(0);
      filterPopup.find(".mzp-t-md.mzp-t-neutral").simulate("click");
      expect(clearMock).toHaveBeenCalledTimes(1);
    });

    test("Calls handlePopupClose callback", () => {
      expect(setPopupIsOpenMock).toHaveBeenCalledTimes(0);
      expect(handlePopupCloseMock).toHaveBeenCalledTimes(0);
      filterPopup.find(".mzp-t-md.mzp-t-product").simulate("click");
      expect(setPopupIsOpenMock).toHaveBeenCalledTimes(1);
      expect(handlePopupCloseMock).toHaveBeenCalledTimes(1);
    });
  });
});
