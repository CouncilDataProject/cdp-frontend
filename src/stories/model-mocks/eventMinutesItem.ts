import EventMinutesItem from "../../models/EventMinutesItem";

const basicPassEventMinutesItem: EventMinutesItem = {
  id: "passIdEventMinutesItem",
  decision: "Passed",
  event_ref: "passeventref",
  index: 10,
  minutes_item_ref: "a5dae0358d16",
};
const basicFailEventMinutesItem: EventMinutesItem = {
  id: "failIdEventMinutesItem",
  decision: "Failed",
  event_ref: "faileventref",
  index: 11,
  minutes_item_ref: "a5dae0358d16",
};
export { basicPassEventMinutesItem, basicFailEventMinutesItem };
