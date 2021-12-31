import { NetworkResponse, ResponseData } from "../NetworkResponse";
import Event from "../../models/Event";
import EventService from "../EventService";
import firestoreTimestampToDate from "../../utils/firestoreTimestampToDate";
import { Timestamp } from "firebase/firestore";

describe("ModelService", () => {
  const eventService = new EventService({ options: { projectId: "test" }, settings: {} });
  describe("createModel", () => {
    const mockData: ResponseData = {
      agenda_uri: "test",
      id: "testID",
      body_ref: { id: "test_body_ref_id" },
      event_datetime: new Timestamp(100000, 150000),
    };
    test("Dynamically creates database model", async () => {
      const createModelResponse = await eventService.createModel(
        Promise.resolve(new NetworkResponse(mockData)),
        Event,
        ""
      );
      expect(createModelResponse).toMatchObject({
        agenda_uri: "test",
        id: "testID",
        body_ref: "test_body_ref_id",
        event_datetime: firestoreTimestampToDate(new Timestamp(100000, 150000)),
      });
    });
    test("Dynamically creates database model of correct class", async () => {
      const createModelResponse = await eventService.createModel(
        Promise.resolve(new NetworkResponse(mockData)),
        Event,
        ""
      );
      expect(createModelResponse).toBeInstanceOf(Event);
    });
    test("Rejects with network error message", async () => {
      const errorMessage = "network error message.";
      try {
        await eventService.createModel(
          Promise.resolve(new NetworkResponse(undefined, new Error(errorMessage))),
          Event,
          "getEventById"
        );
      } catch (e) {
        expect((e as Error).message).toEqual(`EventService_getEventById_${errorMessage}`);
      }
    });
    test("Rejects with no data message", async () => {
      try {
        await eventService.createModel(
          Promise.resolve(new NetworkResponse()),
          Event,
          "getEventById"
        );
      } catch (e) {
        expect((e as Error).message).toEqual("EventService_getEventById_No event found.");
      }
    });
    test("Rejects with invalid JSON message__validateResponseData_Missing properties:id, body_ref, event_datetime", async () => {
      try {
        await eventService.createModel(
          Promise.resolve(new NetworkResponse()),
          Event,
          "getEventById"
        );
      } catch (e) {
        expect((e as Error).message).toEqual("EventService_getEventById_No event found.");
      }
    });
  });
});
