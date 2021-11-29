import Body from "../../models/Body";
import { RenderableEvent } from "../../networking/EventService";

export interface EventsData {
  bodies: Body[];
  events: RenderableEvent[];
}
