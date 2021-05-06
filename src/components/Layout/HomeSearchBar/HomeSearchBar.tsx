import React, { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";

import "@councildataproject/cdp-design/dist/colors.css";
import "@mozilla-protocol/core/protocol/css/protocol.css";
import "@mozilla-protocol/core/protocol/css/protocol-components.css";

const SearchContainer = styled.div({
  width: "50%",
  margin: "0 auto",
  display: "flex",
});

const SearchInput = styled.input({
  backgroundImage: "none !important",
  padding: "8px !important",
  flex: 1,
});

const SearchSubmit = styled.button({
  marginBottom: 24,
});

interface HomeSearchBarProps {
  /**The municipal of the CDP instance.*/
  municipal: string;
}

const HomeSearchBar: FC<HomeSearchBarProps> = ({ municipal }: HomeSearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const history = useHistory();

  const onSearch: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    history.push({
      pathname: "/search",
      search: `?q=${searchQuery.trim().replace(/\s+/g, "+")}`,
      state: { query: searchQuery },
    });
  };

  const onSearchChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setSearchQuery(event.target.value);

  return (
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
            placeholder="Enter a keyword to search meeting transcripts"
            required
            aria-required
            aria-label={`Search meeting transcripts`}
            value={searchQuery}
            onChange={onSearchChange}
          />
          <SearchSubmit className="mzp-c-button mzp-t-product mzp-t-lg" type="submit">
            Search
          </SearchSubmit>
        </SearchContainer>
      </fieldset>
    </form>
  );
};

export default HomeSearchBar;
