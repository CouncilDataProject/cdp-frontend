import React, { ChangeEventHandler, FC, FormEventHandler, useState } from "react";

interface SearchBarProps {
  searchQuery?: string;
  handleSearch(searchTerm: string): void;
}

const SearchBar: FC<SearchBarProps> = ({ handleSearch, searchQuery }) => {
  const [searchTerm, setSearchTerm] = useState<string>(searchQuery || "");
  const onSearchChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setSearchTerm(event.target.value);
  const onSearch: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <form className="mzp-c-form" role="search" onSubmit={onSearch}>
      <input
        style={{ width: "100%" }}
        type="search"
        placeholder="Search transcript..."
        value={searchTerm}
        onChange={onSearchChange}
      />
    </form>
  );
};

export default SearchBar;
