import { FilterState } from "../../components/Filters/reducer";

export interface SearchEventsState {
  query: string;
  committees: FilterState<boolean>;
  dateRange: FilterState<string>;
}
