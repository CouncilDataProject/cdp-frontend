import EventMinutesItem from "../../models/EventMinutesItem";
import { EVENT_MINUTES_ITEM_DECISION } from "../../models/constants";

const basicPassEventMinutesItem: EventMinutesItem = {
  id: "passIdEventMinutesItem",
  decision: EVENT_MINUTES_ITEM_DECISION.PASSED,
  event_ref: "passeventref",
  index: 10,
  minutes_item_ref: "a5dae0358d16",
};
const basicFailEventMinutesItem: EventMinutesItem = {
  id: "failIdEventMinutesItem",
  decision: EVENT_MINUTES_ITEM_DECISION.FAILED,
  event_ref: "faileventref",
  index: 11,
  minutes_item_ref: "a5dae0358d16",
};
export { basicPassEventMinutesItem, basicFailEventMinutesItem };
