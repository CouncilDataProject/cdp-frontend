import Vote from "../../models/Vote";

const vote: Vote = {
  id: "vote-1",
  decision: "Approve",
  event_minutes_item_ref: "emi_ref",
  event_minutes_item: {
    id: "event_minutes_item_test_1",
    decision: "Rejected",
    event_ref: "unpopulated",
    external_source_id: "external_source_id_test",
    index: 0,
    minutes_item_ref: "unpopulated",
  },
  event_ref: "event_ref",
  event: {
    id: "event_test_string_1",
    agenda_uri: "agenda uri",
    body_ref: "body_ref",
    body: {
      id: "body_test_string_1",
      description: "Test Event Body Description",
      end_datetime: new Date(),
      is_active: false,
      name: "Event Bod 1",
      start_datetime: new Date(),
    },
    event_datetime: new Date(),
  },
  in_majority: true,
  matter_ref: "matter_ref",
  matter: {
    id: "string test matter",
    name: "Test Matter",
    title: "title",
    matter_type: "matter_type",
  },
  person_ref: "person_ref",
  person: {
    id: "test person",
    name: "test person",
    router_string: "router_string",
    is_active: true,
  },
};

export { vote };
