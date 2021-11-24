import { RenderableEvent } from "../../networking/EventSearchService";

import { SearchState } from "../../pages/SearchPage/types";

export interface SearchContainerData {
  searchState: SearchState;
  eventResult: {
    events: RenderableEvent[];
    total: number;
  };
  //TODO: add legislation result
}
