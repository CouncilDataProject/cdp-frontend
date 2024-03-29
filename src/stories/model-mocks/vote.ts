import Vote from "../../models/Vote";
import { VOTE_DECISION, EVENT_MINUTES_ITEM_DECISION } from "../../models/constants";
import { basicPassEventMinutesItem, basicFailEventMinutesItem } from "./eventMinutesItem";
import { basicPerson } from "./person";
import { basicEvent } from "./event";

const vote: Vote = {
  id: "vote-1",
  decision: VOTE_DECISION.APPROVE,
  event_minutes_item_ref: "emi_ref",
  event_minutes_item: basicPassEventMinutesItem,
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

const voteList: Vote[] = [
  {
    id: "0ff26eda838f",
    event_minutes_item_ref: "6e58df20b7d2",
    event_ref: "9409f4d1ea09",
    matter_ref: "a5dae0358d16",
    person_ref: "051d21034209",
    decision: VOTE_DECISION.APPROVE,
    event: {
      id: "9409f4d1ea09",
      event_datetime: new Date("2021-09-14T21:00:00.000Z"),
      body_ref: "698ba00dfe84",
      minutes_uri:
        "https://legistar2.granicus.com/seattle/meetings/2021/12/4931_M_Governance_and_Education_Committee_21-12-08_Committee_Minutes.pdf",
      body: {
        id: "698ba00dfe84",
        is_active: true,
        start_datetime: new Date("2021-12-15T17:30:00.000Z"),
        name: "Governance and Education Committee",
        external_source_id: "248",
      },
      external_source_id: "4931",
      hover_thumbnail_ref: "beac68321431",
      static_thumbnail_ref: "9b8285f74dee",
    },
    event_minutes_item: basicFailEventMinutesItem,
    external_source_id: "71708",
    in_majority: true,
    matter: {
      id: "a5dae0358d16",
      matter_type: "Resolution (Res)",
      name: "Res 32029",
      title:
        "A RESOLUTION adopting General Rules and Procedures of the Seattle City Council; superseding Resolution 31920.",
      external_source_id: "12263",
    },
  },
  {
    id: "3112a281ad8a",
    event_minutes_item_ref: "3f7fff017660",
    event_ref: "4bf610d2947e",
    matter_ref: "f8f243934834",
    person_ref: "051d21034209",
    decision: VOTE_DECISION.APPROVE,
    event: {
      id: "4bf610d2947e",
      event_datetime: new Date("2021-09-14T21:00:00.000Z"),
      body_ref: "698ba00dfe84",
      minutes_uri:
        "https://legistar2.granicus.com/seattle/meetings/2021/9/4873_M_Governance_and_Education_Committee_21-09-14_Committee_Minutes.pdf",
      body: {
        id: "698ba00dfe84",
        is_active: true,
        start_datetime: new Date("2021-12-15T17:30:00.000Z"),
        name: "Governance and Education Committee",
        external_source_id: "248",
      },
      external_source_id: "4873",
      hover_thumbnail_ref: "e5f6c0cfa3c3",
      static_thumbnail_ref: "33d0ab4c2d57",
    },
    event_minutes_item: basicPassEventMinutesItem,
    external_source_id: "68102",
    in_majority: true,
    matter: {
      id: "f8f243934834",
      matter_type: "Ordinance (Ord)",
      name: "CB 120172",
      title:
        "AN ORDINANCE relating to City employment, commonly referred to as the Third Quarter 2021 Employment Ordinance; returning positions to the civil service system; and amending classification titles.",
      external_source_id: "11970",
    },
  },
  {
    id: "54d8d3d81639",
    event_minutes_item_ref: "e69f7fb7ba0b",
    event_ref: "4bf610d2947e",
    matter_ref: "00537b8c72c1",
    person_ref: "051d21034209",
    decision: VOTE_DECISION.APPROVE,
    event: {
      id: "4bf610d2947e",
      event_datetime: new Date("2021-09-14T21:00:00.000Z"),
      body_ref: "698ba00dfe84",
      minutes_uri:
        "https://legistar2.granicus.com/seattle/meetings/2021/9/4873_M_Governance_and_Education_Committee_21-09-14_Committee_Minutes.pdf",
      body: {
        id: "698ba00dfe84",
        is_active: true,
        start_datetime: new Date("2021-12-15T17:30:00.000Z"),
        name: "Governance and Education Committee",
        external_source_id: "248",
      },
      external_source_id: "4873",
      hover_thumbnail_ref: "e5f6c0cfa3c3",
      static_thumbnail_ref: "33d0ab4c2d57",
    },
    event_minutes_item: {
      id: "e69f7fb7ba0b",
      decision: EVENT_MINUTES_ITEM_DECISION.PASSED,
      event_ref: "4bf610d2947e",
      index: 9,
      minutes_item_ref: "00537b8c72c1",
    },
    external_source_id: "68107",
    in_majority: true,
    matter: {
      id: "00537b8c72c1",
      matter_type: "Appointment (Appt)",
      name: "Appt 02033",
      title: "Reappointment of David G. Jones as City Auditor, for a term to December 13, 2025.",
      external_source_id: "12056",
    },
  },
  {
    id: "72a32a3204fb",
    event_minutes_item_ref: "b8b014609e8a",
    event_ref: "9409f4d1ea09",
    matter_ref: "a5dae0358d16",
    person_ref: "051d21034209",
    decision: VOTE_DECISION.APPROVE,
    event: {
      id: "9409f4d1ea09",
      event_datetime: new Date("2021-12-08T22:00:00.000Z"),
      body_ref: "698ba00dfe84",
      minutes_uri:
        "https://legistar2.granicus.com/seattle/meetings/2021/12/4931_M_Governance_and_Education_Committee_21-12-08_Committee_Minutes.pdf",
      body: {
        id: "698ba00dfe84",
        is_active: true,
        start_datetime: new Date("2021-12-15T17:30:00.000Z"),
        name: "Governance and Education Committee",
        external_source_id: "248",
      },
      external_source_id: "4931",
      hover_thumbnail_ref: "beac68321431",
      static_thumbnail_ref: "9b8285f74dee",
    },
    event_minutes_item: {
      id: "b8b014609e8a",
      decision: EVENT_MINUTES_ITEM_DECISION.PASSED,
      event_ref: "9409f4d1ea09",
      index: 9,
      minutes_item_ref: "a5dae0358d16",
    },
    external_source_id: "71681",
    in_majority: true,
    matter: {
      id: "a5dae0358d16",
      matter_type: "Resolution (Res)",
      name: "Res 32029",
      title:
        "A RESOLUTION adopting General Rules and Procedures of the Seattle City Council; superseding Resolution 31920.",
      external_source_id: "12263",
    },
  },
];

const voteListWithBrokenVote: Vote[] = [
  {
    id: "0ff26eda838f",
    event_minutes_item_ref: "6e58df20b7d2",
    event_ref: "9409f4d1ea09",
    matter_ref: "a5dae0358d16",
    person_ref: "051d21034209",
    decision: VOTE_DECISION.APPROVE,
    event: {
      id: "9409f4d1ea09",
      event_datetime: new Date("2021-12-08T22:00:00.000Z"),
      body_ref: "698ba00dfe84",
      minutes_uri:
        "https://legistar2.granicus.com/seattle/meetings/2021/12/4931_M_Governance_and_Education_Committee_21-12-08_Committee_Minutes.pdf",
      body: {
        id: "698ba00dfe84",
        is_active: true,
        start_datetime: new Date("2021-12-15T17:30:00.000Z"),
        name: "Governance and Education Committee",
        external_source_id: "248",
      },
      external_source_id: "4931",
      hover_thumbnail_ref: "beac68321431",
      static_thumbnail_ref: "9b8285f74dee",
    },
    event_minutes_item: {
      id: "6e58df20b7d2",
      decision: EVENT_MINUTES_ITEM_DECISION.PASSED,
      event_ref: "9409f4d1ea09",
      index: 10,
      minutes_item_ref: "a5dae0358d16",
    },
    external_source_id: "71708",
    in_majority: true,
    matter: {
      id: "a5dae0358d16",
      matter_type: "Resolution (Res)",
      name: "Res 32029",
      title:
        "A RESOLUTION adopting General Rules and Procedures of the Seattle City Council; superseding Resolution 31920.",
      external_source_id: "12263",
    },
  },
  {
    id: "broken-vote-id",
    event_minutes_item_ref: "",
    event_ref: "",
    matter_ref: "",
    person_ref: "",
    decision: VOTE_DECISION.APPROVE,
  },
  {
    id: "54d8d3d81639",
    event_minutes_item_ref: "e69f7fb7ba0b",
    event_ref: "4bf610d2947e",
    matter_ref: "00537b8c72c1",
    person_ref: "051d21034209",
    decision: VOTE_DECISION.APPROVE,
    event: {
      id: "4bf610d2947e",
      event_datetime: new Date("2021-09-14T21:00:00.000Z"),
      body_ref: "698ba00dfe84",
      minutes_uri:
        "https://legistar2.granicus.com/seattle/meetings/2021/9/4873_M_Governance_and_Education_Committee_21-09-14_Committee_Minutes.pdf",
      body: {
        id: "698ba00dfe84",
        is_active: true,
        start_datetime: new Date("2021-12-15T17:30:00.000Z"),
        name: "Governance and Education Committee",
        external_source_id: "248",
      },
      external_source_id: "4873",
      hover_thumbnail_ref: "e5f6c0cfa3c3",
      static_thumbnail_ref: "33d0ab4c2d57",
    },
    event_minutes_item: {
      id: "e69f7fb7ba0b",
      decision: EVENT_MINUTES_ITEM_DECISION.PASSED,
      event_ref: "4bf610d2947e",
      index: 9,
      minutes_item_ref: "00537b8c72c1",
    },
    external_source_id: "68107",
    in_majority: true,
    matter: {
      id: "00537b8c72c1",
      matter_type: "Appointment (Appt)",
      name: "Appt 02033",
      title: "Reappointment of David G. Jones as City Auditor, for a term to December 13, 2025.",
      external_source_id: "12056",
    },
  },
  {
    id: "72a32a3204fb",
    event_minutes_item_ref: "b8b014609e8a",
    event_ref: "9409f4d1ea09",
    matter_ref: "a5dae0358d16",
    person_ref: "051d21034209",
    decision: VOTE_DECISION.APPROVE,
    event: {
      id: "9409f4d1ea09",
      event_datetime: new Date("2021-09-14T21:00:00.000Z"),
      body_ref: "698ba00dfe84",
      minutes_uri:
        "https://legistar2.granicus.com/seattle/meetings/2021/12/4931_M_Governance_and_Education_Committee_21-12-08_Committee_Minutes.pdf",
      body: {
        id: "698ba00dfe84",
        is_active: true,
        start_datetime: new Date("2021-12-15T17:30:00.000Z"),
        name: "Governance and Education Committee",
        external_source_id: "248",
      },
      external_source_id: "4931",
      hover_thumbnail_ref: "beac68321431",
      static_thumbnail_ref: "9b8285f74dee",
    },
    event_minutes_item: {
      id: "b8b014609e8a",
      decision: EVENT_MINUTES_ITEM_DECISION.PASSED,
      event_ref: "9409f4d1ea09",
      index: 9,
      minutes_item_ref: "a5dae0358d16",
    },
    external_source_id: "71681",
    in_majority: true,
    matter: {
      id: "a5dae0358d16",
      matter_type: "Resolution (Res)",
      name: "Res 32029",
      title:
        "A RESOLUTION adopting General Rules and Procedures of the Seattle City Council; superseding Resolution 31920.",
      external_source_id: "12263",
    },
  },
];

function generatePopulatedVoteList(winningSide: VOTE_DECISION): Vote[] {
  const VOTE_LIST_SIZE = 9;
  const voteList: Vote[] = [];
  for (let i = 0; i <= VOTE_LIST_SIZE; i++) {
    const person = Object.assign({}, basicPerson);
    let decision: VOTE_DECISION = winningSide;
    if (i % 7 === 0) {
      decision = VOTE_DECISION.APPROVE;
    }
    if (i % 3 === 0) {
      decision = VOTE_DECISION.REJECT;
    }
    if (i % 5 === 0) {
      decision = VOTE_DECISION.ABSTAIN_NON_VOTING;
    }
    person.name = `Test Person ${i}`;
    const vote = {
      id: "0ff26eda838f",
      event_minutes_item_ref: "6e58df20b7d2",
      event_ref: "9409f4d1ea09",
      matter_ref: "a5dae0358d16",
      person_ref: "051d21034209",
      person,
      decision,
      event: basicEvent,
      event_minutes_item: basicFailEventMinutesItem,
      external_source_id: "71708",
      in_majority: true,
      matter: {
        id: "a5dae0358d16",
        matter_type: "Resolution (Res)",
        name: "Res 32029",
        title:
          "A RESOLUTION adopting General Rules and Procedures of the Seattle City Council; superseding Resolution 31920.",
        external_source_id: "12263",
      },
    };
    voteList.push(vote);
  }
  return voteList;
}

export { vote, voteList, voteListWithBrokenVote, generatePopulatedVoteList };
