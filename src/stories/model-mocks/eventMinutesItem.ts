import EventMinutesItem from "../../models/EventMinutesItem";
import { EVENT_MINUTES_ITEM_DECISION } from "../../models/constants";
import { basicEvent } from "./event";

const basicPassEventMinutesItem: EventMinutesItem = {
  id: "f156c87a64f3",
  decision: EVENT_MINUTES_ITEM_DECISION.PASSED,
  event_ref: "0b72b75170ec",
  event: basicEvent,
  index: 234,
  minutes_item_ref: "e8a7fb715ea4",
};
const basicFailEventMinutesItem: EventMinutesItem = {
  id: "93790abe707e",
  decision: EVENT_MINUTES_ITEM_DECISION.FAILED,
  event_ref: "0b72b75170ec",
  event: basicEvent,
  index: 11,
  minutes_item_ref: "f5bf0a305",
};

const nonVotingEventMinutesItem: EventMinutesItem = {
  id: "9b7fc6d73e64",
  event_ref: "3c761f4cbd22",
  event: basicEvent,
  index: 7,
  minutes_item_ref: "dc66d09feffb",
};

export { basicPassEventMinutesItem, basicFailEventMinutesItem, nonVotingEventMinutesItem };
