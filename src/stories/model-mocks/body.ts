import Body from "../../models/Body";

const basicBody: Body = {
  id: "basic-id",
  name: "Illustrious Test Board of Experimental Confirmation",
  description: "A board for testing.",
  start_datetime: new Date("1/1/2019"),
  end_datetime: new Date("1/1/2020"),
  is_active: true,
  external_source_id: "test-basicBody-external-id",
};

export { basicBody };
