import React, { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";

import { FilterPopup } from "../../Filters/FilterPopup";
import useFilter from "../../Filters/useFilter";
import { getDateText, SelectDateRange } from "../../Filters/SelectDateRange";
import {
  getCheckboxText,
  getSelectedOptions,
  SelectTextFilterOptions,
} from "../../Filters/SelectTextFilterOptions";
import { SEARCH_TYPE } from "../../../constants/ProjectConstants";

import "@councildataproject/cdp-design/dist/colors.css";
import "@mozilla-protocol/core/protocol/css/protocol.css";
import "@mozilla-protocol/core/protocol/css/protocol-components.css";

const SearchContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
});

const SearchInput = styled.input({
  backgroundImage: "none !important",
  padding: "8px !important",
  marginBottom: "4px !important",
  width: 500,
});

const SearchSubmit = styled.button({
  marginBottom: 4,
});

const searchTypeOptions = [
  {
    name: SEARCH_TYPE.MEETING,
    label: "Meetings",
    disabled: false,
  },
  {
    name: SEARCH_TYPE.LEGISLATION,
    label: "Legislations",
    disabled: false,
  },
  {
    name: SEARCH_TYPE.COUNCIL_MEMBER,
    label: "Council Members",
    disabled: false,
  },
];

const intialSearchTyperFilterState = {
  [SEARCH_TYPE.MEETING]: true,
  [SEARCH_TYPE.LEGISLATION]: false,
  [SEARCH_TYPE.COUNCIL_MEMBER]: false,
};

const FilterContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
});

interface HomeSearchBarProps {
  /**The municipal of the CDP instance.*/
  municipal: string;
}

const HomeSearchBar: FC<HomeSearchBarProps> = ({ municipal }: HomeSearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const history = useHistory();
  const dateRangeFilter = useFilter<string>("Date", { start: "", end: "" }, "", getDateText);
  const searchTypeFilter = useFilter<boolean>(
    "Search Type",
    intialSearchTyperFilterState,
    false,
    getCheckboxText
  );

  const onSearch: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    let queryParams = `?q=${searchQuery.trim().replace(/\s+/g, "+")}`;

    const selectedSearchTypes = getSelectedOptions(searchTypeFilter.state);
    if (selectedSearchTypes) {
      queryParams += `&type=${selectedSearchTypes.join(",")}`;
    }
    if (dateRangeFilter.state.start) {
      queryParams += `&start=${dateRangeFilter.state.start}`;
    }
    if (dateRangeFilter.state.end) {
      queryParams += `&end=${dateRangeFilter.state.end}`;
    }
    history.push({
      pathname: "/search",
      search: queryParams,
      state: { query: searchQuery, types: selectedSearchTypes, ...dateRangeFilter.state },
    });
  };

  const onSearchChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setSearchQuery(event.target.value);

  return (
    <>
      <form className="mzp-c-form" role="search" onSubmit={onSearch}>
        <div className="mzp-c-form-header">
          <h2 className="mzp-c-form-title" style={{ textAlign: "center" }}>
            Discover <span className="cdp-dark-blue">{municipal}</span> city council meetings,
            legislations, and members
          </h2>
        </div>
        <fieldset className="mzp-c-field-set">
          <SearchContainer>
            <SearchInput
              type="search"
              placeholder="Enter your keyword"
              required
              aria-required
              value={searchQuery}
              onChange={onSearchChange}
            />
            <SearchSubmit className="mzp-c-button mzp-t-product" type="submit">
              Search
            </SearchSubmit>
          </SearchContainer>
        </fieldset>
      </form>
      <FilterContainer>
        <FilterPopup
          clear={searchTypeFilter.clear}
          getTextRep={searchTypeFilter.getTextRep}
          isActive={searchTypeFilter.isActive}
          popupIsOpen={searchTypeFilter.popupIsOpen}
          setPopupIsOpen={searchTypeFilter.setPopupIsOpen}
          closeOnChange={false}
        >
          <SelectTextFilterOptions
            name={searchTypeFilter.name}
            state={searchTypeFilter.state}
            update={searchTypeFilter.update}
            options={searchTypeOptions}
          />
        </FilterPopup>
        <FilterPopup
          clear={dateRangeFilter.clear}
          getTextRep={dateRangeFilter.getTextRep}
          isActive={dateRangeFilter.isActive}
          popupIsOpen={dateRangeFilter.popupIsOpen}
          setPopupIsOpen={dateRangeFilter.setPopupIsOpen}
          closeOnChange={false}
        >
          <SelectDateRange state={dateRangeFilter.state} update={dateRangeFilter.update} />
        </FilterPopup>
      </FilterContainer>
    </>
  );
};

export default HomeSearchBar;
