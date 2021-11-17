import { mockImageFile } from "./file";

const basicSeat = {
  name: "Splendid Test Seat",
  electoral_area: "Shady Pines Test Neighborhood",
  image_ref: "mock-image-ref-to-electoral-seat-pic",
  image: mockImageFile(1400, 800, "Electoral Seat"),
  external_source_id: "test-external-source-id",
};

export { basicSeat };
