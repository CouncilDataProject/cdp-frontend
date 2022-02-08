import MatterStatus from "../../models/MatterStatus";
import { MATTER_STATUS_DECISION } from "../../models/constants";
import { basicMatter } from "./matter";
import { basicPassEventMinutesItem } from "./eventMinutesItem";

const adoptedMatterStatus: MatterStatus = {
  id: "adoptedMatterStatus-test",
  event_minutes_item_ref: "event_minutes_item_ref",
  event_minutes_item: basicPassEventMinutesItem,
  external_source_id: "external_source_id",
  matter_ref: "matter_ref",
  matter: basicMatter,
  status: MATTER_STATUS_DECISION.ADOPTED,
  update_datetime: new Date(),
};

const rejectedMatterStatus: MatterStatus = {
  id: "rejectedMatterStatus-test",
  event_minutes_item_ref: "event_minutes_item_ref",
  event_minutes_item: basicPassEventMinutesItem,
  external_source_id: "external_source_id",
  matter_ref: "matter_ref",
  matter: basicMatter,
  status: MATTER_STATUS_DECISION.REJECTED,
  update_datetime: new Date(),
};

const inProgressMatterStatus: MatterStatus = {
  id: "inProgressMatterStatus-test",
  event_minutes_item_ref: "event_minutes_item_ref",
  event_minutes_item: basicPassEventMinutesItem,
  external_source_id: "external_source_id",
  matter_ref: "matter_ref",
  matter: basicMatter,
  status: MATTER_STATUS_DECISION.IN_PROGRESS,
  update_datetime: new Date(),
};

export { adoptedMatterStatus, rejectedMatterStatus, inProgressMatterStatus };
