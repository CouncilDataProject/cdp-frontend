import React, { FC } from "react";

import { SearchContainerData } from "./types";

const SearchContainer: FC<SearchContainerData> = ({ events }) => {
  console.log("events", events);
  return <div></div>;
};

export default SearchContainer;
