import React, { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";

import { FilterPopup } from "../../Filters/FilterPopup";
import useFilter from "../../Filters/useFilter";
import { FilterState } from "../../Filters/reducer";
import { getDateText, SelectDateRange } from "../../Filters/SelectDateRange";
import { getSelectedOptions, SelectTextFilterOptions } from "../../Filters/SelectTextFilterOptions";
import { SEARCH_TYPE } from "../../../constants/ProjectConstants";
import { default as exampleTopics } from "../../../assets/example-topics.json";

import "@councildataproject/cdp-design/dist/colors.css";
import "@mozilla-protocol/core/protocol/css/protocol.css";
import "@mozilla-protocol/core/protocol/css/protocol-components.css";

const gridContainer = `
  display: grid;
  column-gap: 8px;
  row-gap: 4px;
  /**One column template*/
  grid-template-columns: 1fr;
  justify-content: start;
`;

const SearchContainer = styled.div`
  ${gridContainer}
  @media (min-width: 544px) {
    /**Two columns template, with the first column taking up any free space*/
    grid-template-columns: 1fr auto;
  }
`;

const SearchInput = styled.input`
  margin-bottom: 0px !important;
`;

const SearchExampleTopic = styled.p`
  padding-top: 0px !important;
  font-size: 0.775rem !important;
  @media (min-width: 544px) {
    /**Make the example topic appear after the search button*/
    order: 1;
  }
`;

const FiltersContainer = styled.div`
  ${gridContainer}
  @media (min-width: 544px) {
    /**Three columns template, with the last column taking up any free space*/
    grid-template-columns: auto auto 1fr;
  }
`;

const AdvancedOptionsBtn = styled.button`
  @media (min-width: 544px) {
    /**Make the advanced options button appear last*/
    order: 1;
    /**Float the button to the right*/
    justify-self: end;
  }
`;

const searchTypeOptions = [
  {
    name: SEARCH_TYPE.MEETING,
    label: "Meetings",
    disabled: false,
  },
  {
    name: SEARCH_TYPE.LEGISLATION,
    label: "Legislation",
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
  [SEARCH_TYPE.LEGISLATION]: true,
  [SEARCH_TYPE.COUNCIL_MEMBER]: true,
};

const getSearchTypeText = (checkboxes: FilterState<boolean>, defaultText: string) => {
  const selectedCheckboxes = Object.keys(checkboxes).filter((key) => checkboxes[key]);
  let textRep = defaultText;
  if (selectedCheckboxes.length === Object.keys(checkboxes).length) {
    textRep += "(s): All";
  } else if (selectedCheckboxes.length > 0) {
    const selectedLabels = selectedCheckboxes.map((name) => {
      const option = searchTypeOptions.find((option) => option.name === name);
      return option?.label ?? "";
    });
    textRep += `(s): ${selectedLabels.join(", ")}`;
  }
  return textRep;
};

const exampleSearchQuery = exampleTopics[Math.floor(Math.random() * exampleTopics.length)];

const HomeSearchBar: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const history = useHistory();
  const dateRangeFilter = useFilter<string>("Date", { start: "", end: "" }, "", getDateText);
  const searchTypeFilter = useFilter<boolean>(
    "Search Type",
    intialSearchTyperFilterState,
    false,
    getSearchTypeText
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

  const onClickFilters = () => setShowFilters((showFilters) => !showFilters);

  return (
    <>
      <form className="mzp-c-form" role="search" onSubmit={onSearch}>
        <SearchContainer>
          <SearchInput
            type="search"
            placeholder="Search for a topic..."
            required
            aria-required
            disabled={!searchTypeFilter.isActive()}
            value={searchQuery}
            onChange={onSearchChange}
          />
          <SearchExampleTopic className="mzp-c-field-info">{`Example: ${exampleSearchQuery}`}</SearchExampleTopic>
          <button
            className="mzp-c-button mzp-t-product"
            type="submit"
            disabled={!searchTypeFilter.isActive()}
          >
            Search
          </button>
        </SearchContainer>
      </form>

      <FiltersContainer>
        <AdvancedOptionsBtn
          className="mzp-c-button mzp-t-secondary"
          onClick={onClickFilters}
          disabled={!searchTypeFilter.isActive()}
        >
          Advanced Options
        </AdvancedOptionsBtn>
        <div>
          {showFilters && (
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
                isRequired={true}
                isActive={searchTypeFilter.isActive()}
              />
            </FilterPopup>
          )}
        </div>
        <div>
          {showFilters && (
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
          )}
        </div>
      </FiltersContainer>
    </>
  );
};

export default HomeSearchBar;
