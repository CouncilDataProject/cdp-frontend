import Body from "../../models/Body";

import { SearchEventsState } from "../../pages/SearchEventsPage/types";

export interface SearchEventsContainerData {
  searchEventsState: SearchEventsState;
  bodies: Body[];
}
