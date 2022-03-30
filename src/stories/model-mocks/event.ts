import Event from "../../models/Event";

import { basicBody } from "./body";

const basicEvent: Event = {
  id: "event-id",
  external_source_id: "external-id",
  event_datetime: new Date(),
  body_ref: "body-ref",
};

const eventWithRealImages: Event = {
  ...basicEvent,
  body: basicBody,
  static_thumbnail_ref: "e22f322a21e7",
  hover_thumbnail_ref: "da4673e5f412",
};

export { basicEvent, eventWithRealImages };
