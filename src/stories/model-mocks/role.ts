import Role from "../../models/Role";
import { ROLE_TITLE } from "../../models/constants";
import { basicBody } from "./body";
import { basicSeat } from "./seat";

/*
  title?: ROLE_TITLE;
  start_datetime?: Date;
  end_datetime?: Date;
  person?: Person;
  person_ref?: string;
  body?: Body;
  body_ref?: string;
  seat?: Seat;
  seat_ref?: string;
  external_source_id?: string;
*/
const ten_years_councilmember: Role = {
  id: "10-year-role",
  title: ROLE_TITLE.COUNCILMEMBER,
  start_datetime: new Date("1/1/2010"),
  person_ref: "person-test-id",
  seat: basicSeat,
  seat_ref: "fake-ten_years_councilmember-id",
  external_source_id: "fake-role-external-id",
  body_ref: "body_ref",
  body: basicBody,
};

const recent_chair: Role = {
  id: "recent-chair",
  title: ROLE_TITLE.CHAIR,
  start_datetime: new Date("1/1/2020"),
  person_ref: "person-test-id",
  seat: basicSeat,
  seat_ref: "fake-recent_chair-id",
  external_source_id: "fake-role-external-id",
  body: basicBody,
};

const recentCouncil: Role = {
  id: "eefa0d7e5b75",
  person_ref: "3f08f4e93541",
  seat_ref: "3e57b6c25e80",
  start_datetime: new Date("2022-01-01T08:00:00.000Z"),
  title: ROLE_TITLE.COUNCILMEMBER,
  end_datetime: new Date("2024-12-31T08:00:00.000Z"),
  body_ref: "95cbe8255000",
  seat: {
    id: "3e57b6c25e80",
    name: "Position 9",
    electoral_area: "Citywide",
    image_ref: "68b94b7a4603",
  },
  external_source_id: "1195",
};

const expired_chair: Role = {
  id: "expired-chair",
  title: ROLE_TITLE.CHAIR,
  start_datetime: new Date("1/1/2018"),
  end_datetime: new Date("1/1/2020"),
  person_ref: "person-test-id",
  seat: basicSeat,
  seat_ref: "fake-recent_chair-id",
  external_source_id: "fake-role-external-id",
  body: basicBody,
};

const varietyRoles: Role[] = [
  {
    id: "b2e670885a8e",
    person_ref: "3f08f4e93541",
    seat_ref: "3e57b6c25e80",
    start_datetime: new Date("2022-01-05T08:00:00.000Z"),
    title: ROLE_TITLE.MEMBER,
    end_datetime: new Date("2023-12-31T08:00:00.000Z"),
    body: {
      id: "42da53d11c86",
      is_active: true,
      start_datetime: new Date("2022-01-11T22:00:00.000Z"),
      name: "Neighborhoods, Education, Civil Rights, and Culture Committee",
      external_source_id: "261",
    },
    external_source_id: "1249",
  },
  {
    id: "4a718720ff4e",
    person_ref: "3f08f4e93541",
    seat_ref: "3e57b6c25e80",
    start_datetime: new Date("2022-01-05T08:00:00.000Z"),
    title: ROLE_TITLE.CHAIR,
    end_datetime: new Date("2023-12-31T08:00:00.000Z"),
    body: {
      id: "80b98d338329",
      is_active: true,
      start_datetime: new Date("2022-01-11T22:00:00.000Z"),
      name: "Economic Development, Technology, and City Light Committee",
      external_source_id: "259",
    },
    external_source_id: "1236",
  },
  {
    id: "c3064307929a",
    person_ref: "3f08f4e93541",
    seat_ref: "3e57b6c25e80",
    start_datetime: new Date("2022-01-04T08:00:00.000Z"),
    title: ROLE_TITLE.MEMBER,
    end_datetime: new Date("2023-12-31T08:00:00.000Z"),
    body: {
      id: "75fe098299cb",
      is_active: true,
      start_datetime: new Date("2022-01-11T22:00:00.000Z"),
      name: "Land Use Committee",
      external_source_id: "262",
    },
    external_source_id: "1255",
  },
  {
    id: "a812c19a1a25",
    person_ref: "3f08f4e93541",
    seat_ref: "3e57b6c25e80",
    start_datetime: new Date("2022-01-04T08:00:00.000Z"),
    title: ROLE_TITLE.ALTERNATE,
    end_datetime: new Date("2023-12-31T08:00:00.000Z"),
    body: {
      id: "bd2e47dde7d3",
      is_active: true,
      start_datetime: new Date("2022-01-11T22:00:00.000Z"),
      name: "Public Safety and Human Services Committee",
      external_source_id: "251",
    },
    external_source_id: "1229",
  },
  {
    id: "6561540ee8f7",
    person_ref: "3f08f4e93541",
    seat_ref: "3e57b6c25e80",
    start_datetime: new Date("2022-01-04T08:00:00.000Z"),
    title: ROLE_TITLE.VICE_CHAIR,
    end_datetime: new Date("2023-12-31T08:00:00.000Z"),
    body: {
      id: "c88359d0e0eb",
      is_active: true,
      start_datetime: new Date("2022-01-11T22:00:00.000Z"),
      name: "Sustainability and Renters' Rights Committee",
      external_source_id: "252",
    },
    external_source_id: "1220",
  },
  {
    id: "eefa0d7e5b75",
    person_ref: "3f08f4e93541",
    seat_ref: "3e57b6c25e80",
    start_datetime: new Date("2022-01-01T08:00:00.000Z"),
    title: ROLE_TITLE.COUNCILMEMBER,
    end_datetime: new Date("2024-12-31T08:00:00.000Z"),
    body: {
      id: "95cbe8255000",
      is_active: true,
      start_datetime: new Date("2022-01-11T22:00:00.000Z"),
      name: "City Council",
      external_source_id: "138",
    },
    external_source_id: "1195",
  },
  {
    id: "a5d8e3b9e6d8",
    person_ref: "3f08f4e93541",
    seat_ref: "3e57b6c25e80",
    start_datetime: new Date("2022-01-01T08:00:00.000Z"),
    title: ROLE_TITLE.MEMBER,
    end_datetime: new Date("2024-12-31T08:00:00.000Z"),
    body: {
      id: "eb0385db0376",
      is_active: true,
      start_datetime: new Date("2022-01-11T22:00:00.000Z"),
      name: "Council Briefing",
      external_source_id: "211",
    },
    external_source_id: "1198",
  },
];

export { ten_years_councilmember, recent_chair, expired_chair, recentCouncil, varietyRoles };
