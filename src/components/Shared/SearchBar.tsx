import React, { FC, Dispatch, SetStateAction, ChangeEventHandler, FormEventHandler } from "react";

export interface SearchBarProps {
  placeholder: string;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  handleSearch(): void;
}

const SearchBar: FC<SearchBarProps> = ({
  placeholder,
  query,
  setQuery,
  handleSearch,
}: SearchBarProps) => {
  const onSearchChange: ChangeEventHandler<HTMLInputElement> = (event) =>
    setQuery(event.target.value);
  const onSearch: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <form className="mzp-c-form" role="search" onSubmit={onSearch}>
      <input
        type="search"
        placeholder={placeholder}
        required
        aria-required
        value={query}
        onChange={onSearchChange}
      />
    </form>
  );
};

export default SearchBar;
