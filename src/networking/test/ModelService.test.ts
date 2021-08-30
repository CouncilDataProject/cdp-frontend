import { NetworkResponse } from "../NetworkResponse";
import Event from "../../models/Event";
import EventService from "../EventService";

describe("ModelService", () => {
  const eventService = new EventService();
  describe("createModel", () => {
    test("Dynamically creates database model", async () => {
      const createModelResponse = await eventService.createModel(
        Promise.resolve(new NetworkResponse({ agenda_uri: "test" })),
        Event,
        ""
      );
      expect(createModelResponse).toMatchObject({ agenda_uri: "test" });
    });
    test("Dynamically creates database model of correct class", async () => {
      const createModelResponse = await eventService.createModel(
        Promise.resolve(new NetworkResponse({ agenda_uri: "test" })),
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
        expect(e.message).toEqual(`EventService_getEventById_${errorMessage}`);
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
        expect(e.message).toEqual("EventService_getEventById_No event found.");
      }
    });
  });
});
