import getTimeZoneDate from "../getTimeZoneName";

describe("getTimeZoneDate", () => {
  it("handles start date of daylight time", () => {
    const date = getTimeZoneDate(new Date("2022-03-14"), "America/Los_Angeles");
    expect(date?.getTime()).toEqual(new Date("3/14/2022, PDT").getTime());
  });

  it("handles end date of daylight time", () => {
    const date = getTimeZoneDate(new Date("2022-11-06"), "America/Los_Angeles");
    expect(date?.getTime()).toEqual(new Date("11/6/2022, PDT").getTime());
  });

  it("handles start date of standard time", () => {
    const date = getTimeZoneDate(new Date("2022-11-07"), "America/Los_Angeles");
    expect(date?.getTime()).toEqual(new Date("11/7/2022, PST").getTime());
  });

  it("handles end date of standard time", () => {
    const date = getTimeZoneDate(new Date("2022-03-13"), "America/Los_Angeles");
    expect(date?.getTime()).toEqual(new Date("3/13/2022, PST").getTime());
  });
});
