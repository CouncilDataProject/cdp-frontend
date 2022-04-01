import Person from "../../models/Person";
import { mockImageFile } from "./file";

const basicPerson: Person = {
  id: "test-id",
  name: "R.J. Person",
  email: "test-person@test.com",
  phone: "206-867-5309",
  website: "https://www.google.com",
  picture: mockImageFile(400, 400, "Avatar Face"),
  router_string: "test.person",
  is_active: true,
};

const realPerson: Person = {
  id: "975edb7a71f6",
  name: "Teresa Mosqueda",
  email: "Teresa.Mosqueda@seattle.gov",
  phone: "206-867-5309",
  website: "http://www.seattle.gov/council/mosqueda",
  picture: undefined,
  picture_ref: "e2ac924a1884",
  router_string: "teresa-mosqueda",
  is_active: true,
};

export { basicPerson, realPerson };
