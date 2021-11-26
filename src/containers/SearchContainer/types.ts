import { RenderableEvent } from "../../networking/EventSearchService";

import { SearchState } from "../../pages/SearchPage/types";

export interface SearchContainerData {
  searchState: SearchState;
}

export interface SearchData {
  event: {
    total: number;
    events: RenderableEvent[];
  };
  //TODO: add legislation result
}
