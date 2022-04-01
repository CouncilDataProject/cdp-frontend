import Seat from "../../models/Seat";
import { mockImageFile } from "./file";

const basicSeat: Seat = {
  id: "basic-seat",
  name: "Splendid Test Seat",
  electoral_area: "Shady Pines Test Neighborhood",
  image_ref: "mock-image-ref-to-electoral-seat-pic",
  image: mockImageFile(1400, 800, "Electoral Seat"),
  external_source_id: "test-external-source-id",
};

const realSeat: Seat = {
  id: "a3c0719eef4a",
  electoral_area: "West Seattle",
  electoral_type: undefined,
  external_source_id: undefined,
  image_ref: "1607b20993bf",
  name: "Position 1",
};

const realSeatNoImage: Seat = {
  id: "a3c0719eef4a",
  electoral_area: "West Seattle",
  electoral_type: undefined,
  external_source_id: undefined,
  image_ref: undefined,
  name: "Position 1",
};

export { basicSeat, realSeat, realSeatNoImage };
