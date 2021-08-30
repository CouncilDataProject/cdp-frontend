import { NetworkResponse } from "../NetworkResponse";
import Event from "../../models/Event";
import EventService from "../EventService";

describe("ModelService", () => {
  const eventService = new EventService();
  describe("createModel", () => {
    const networkResponse = Promise.resolve(new NetworkResponse({ agenda_uri: "test" }));
    test("Dynamically creates database model", async () => {
      const createModelResponse = await eventService.createModel(networkResponse, Event, "");
      expect(createModelResponse).toMatchObject({ agenda_uri: "test" });
    });
    test("Dynamically creates database model of correct class", async () => {
      const createModelResponse = await eventService.createModel(networkResponse, Event, "");
      expect(createModelResponse).toBeInstanceOf(Event);
    });
  });
});
