import { mockImageFile } from "./file";
const basicPerson = {
  id: "test-id",
  name: "R.J. Person",
  email: "test-person@test.com",
  phone: "206-867-5309",
  website: "https://www.google.com",
  seatPicture: mockImageFile(1400, 800, "Electoral Seat"),
  picture: mockImageFile(400, 400, "Avatar Face"),
  router_string: "test.person",
  is_active: true,
};

export { basicPerson };
