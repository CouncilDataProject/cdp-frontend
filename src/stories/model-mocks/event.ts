import Event from "../../models/Event";

const basicEvent: Event = {
  id: "event-id",
  external_source_id: "external-id",
  event_datetime: new Date(),
  body_ref: "body-ref",
};

export { basicEvent };
