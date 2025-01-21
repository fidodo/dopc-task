import { findDistanceRange } from "./distanceRanges";

describe("findDistanceRange", () => {
  const distanceRanges = [
    { min: 0, max: 500, a: 0, b: 0 },
    { min: 500, max: 1000, a: 100, b: 1 },
    { min: 1000, max: 0, a: 200, b: 2 }, // max: 0 means no upper limit
  ];

  it("should return the correct range for a distance within bounds", () => {
    expect(findDistanceRange(300, distanceRanges)).toEqual({ min: 0, max: 500, a: 0, b: 0 });
    expect(findDistanceRange(700, distanceRanges)).toEqual({ min: 500, max: 1000, a: 100, b: 1 });
    expect(findDistanceRange(1500, distanceRanges)).toEqual({ min: 1000, max: 0, a: 200, b: 2 });
  });

 

  it("should handle edge cases with max equal to 0", () => {
    expect(findDistanceRange(1000, distanceRanges)).toEqual({ min: 1000, max: 0, a: 200, b: 2 });
  });
});
