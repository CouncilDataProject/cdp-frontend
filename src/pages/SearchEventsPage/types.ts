import { FilterState } from "../../components/Filters/reducer";

export interface SearchEventsState {
  query: string;
  committees: string[];
  dateRange: FilterState<string>;
}
