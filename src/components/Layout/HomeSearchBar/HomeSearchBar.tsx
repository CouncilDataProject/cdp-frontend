import React, { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";

import { SEARCH_TYPE, SearchState } from "../../../pages/SearchPage/types";

import { FilterPopup } from "../../Filters/FilterPopup";
import useFilter from "../../Filters/useFilter";
import { FilterState } from "../../Filters/reducer";
import { SelectTextFilterOptions } from "../../Filters/SelectTextFilterOptions";
import { screenWidths } from "../../../styles/mediaBreakpoints";
import { strings } from "../../../assets/LocalizedStrings";

import "@councildataproject/cdp-design/dist/colors.css";
import "@mozilla-protocol/core/protocol/css/protocol.css";
import "@mozilla-protocol/core/protocol/css/protocol-components.css";

const EXAMPLE_TOPICS = [
  "minimum wage",
  "police budget",
  "rent control",
  "municipal broadband",
  "police accountability",
  "homelessness response",
  "municipal broadband, digital equity",
  "sodo stadium",
  "35 ave bike lane",
  "capitol hill megablock",
];

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
  @media (min-width: ${screenWidths.tablet}) {
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
  @media (min-width: ${screenWidths.tablet}) {
    /**Make the example topic appear after the search button*/
    order: 1;
  }
`;

const FiltersContainer = styled.div`
  ${gridContainer}
  @media (min-width: ${screenWidths.tablet}) {
    /**Three columns template, with the last column taking up any free space*/
    grid-template-columns: auto 1fr;
  }
`;

const AdvancedOptionsBtn = styled.button`
  @media (min-width: ${screenWidths.tablet}) {
    /**Make the advanced options button appear last*/
    order: 1;
    /**Float the button to the right*/
    justify-self: end;
  }
`;

const searchTypeOptions = [
  {
    name: SEARCH_TYPE.EVENT,
    label: "Events",
    disabled: false,
  },
  {
    name: SEARCH_TYPE.LEGISLATION,
    label: "Legislations",
    disabled: false,
  },
];

const intialSearchTyperFilterState = {
  [SEARCH_TYPE.EVENT]: true,
  [SEARCH_TYPE.LEGISLATION]: true,
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

const exampleSearchQuery = EXAMPLE_TOPICS[Math.floor(Math.random() * EXAMPLE_TOPICS.length)];

export interface HomeSearchBarProps {
  /**The inital search query */
  query?: string;
  /**The initial search types - which search types are selected? */
  searchTypes?: Record<SEARCH_TYPE, boolean>;
}

const HomeSearchBar: FC<HomeSearchBarProps> = ({ query, searchTypes }: HomeSearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>(query || "");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const history = useHistory<SearchState>();
  const searchTypeFilter = useFilter<boolean>({
    name: "Search Type",
    initialState: searchTypes || intialSearchTyperFilterState,
    defaultDataValue: false,
    textRepFunction: getSearchTypeText,
    isRequired: true,
  });

  const onSearch: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const queryParams = `?q=${searchQuery.trim().replace(/\s+/g, "+")}`;
    history.push({
      pathname: "/search",
      search: queryParams,
      state: {
        query: searchQuery.trim(),
        searchTypes: searchTypeFilter.state as Record<SEARCH_TYPE, boolean>,
      },
    });
  };

  const onSearchChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setSearchQuery(event.target.value);

  const onClickFilters = () => setShowFilters((showFilters) => !showFilters);

  return (
    <div>
      <form className="mzp-c-form" role="search" onSubmit={onSearch}>
        <SearchContainer>
          <SearchInput
            type="search"
            placeholder={strings.search_topic_placeholder}
            required
            aria-required
            disabled={!searchTypeFilter.isActive()}
            value={searchQuery}
            onChange={onSearchChange}
          />
          <SearchExampleTopic className="mzp-c-field-info">
            {strings.example_prefix}
            {exampleSearchQuery}
          </SearchExampleTopic>
          <button
            className="mzp-c-button mzp-t-product"
            type="submit"
            disabled={!searchTypeFilter.isActive()}
          >
            {strings.search}
          </button>
        </SearchContainer>
      </form>

      <FiltersContainer>
        <AdvancedOptionsBtn
          className="mzp-c-button mzp-t-secondary"
          onClick={onClickFilters}
          disabled={!searchTypeFilter.isActive()}
        >
          {strings.advanced_options}
        </AdvancedOptionsBtn>
        <div>
          {showFilters && (
            <FilterPopup
              name={searchTypeFilter.name}
              clear={searchTypeFilter.clear}
              getTextRep={searchTypeFilter.getTextRep}
              isActive={searchTypeFilter.isActive}
              popupIsOpen={searchTypeFilter.popupIsOpen}
              setPopupIsOpen={searchTypeFilter.setPopupIsOpen}
              closeOnChange={false}
              hasRequiredError={searchTypeFilter.hasRequiredError()}
            >
              <SelectTextFilterOptions
                name={searchTypeFilter.name}
                state={searchTypeFilter.state}
                update={searchTypeFilter.update}
                options={searchTypeOptions}
              />
            </FilterPopup>
          )}
        </div>
      </FiltersContainer>
    </div>
  );
};

export default HomeSearchBar;
