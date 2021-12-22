export enum SEARCH_TYPE {
  EVENT = "events",
  LEGISLATION = "legislations",
}

export interface SearchState {
  query: string;
  searchTypes: Record<SEARCH_TYPE, boolean>;
}
