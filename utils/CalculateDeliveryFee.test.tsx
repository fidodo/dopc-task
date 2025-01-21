import calculateDeliveryFee from "./calculateDeliveryFee";

describe("calculateDeliveryFee", () => {
  const distanceRanges = [
    { min: 0, max: 500, a: 0, b: 0 },
    { min: 500, max: 1000, a: 100, b: 1 },
    { min: 1000, max: 0, a: 200, b: 2 }, // max: 0 means no upper limit
  ];

  it("should calculate the correct delivery fee within a valid range", () => {
    const distance = 600; // Within the second range
    const basePrice = 199; // €1.99 in cents
    const result = calculateDeliveryFee(distance, basePrice, distanceRanges);
    // Calculation: 199 + 100 + (1 * Math.round(600 / 10)) = 199 + 100 + 60 = 359
    expect(result).toBe(359); // €3.59
  });

  it("should handle the maximum range with max set to 0 (no upper limit)", () => {
    const distance = 1200; // Within the third range
    const basePrice = 199; // €1.99 in cents
    const result = calculateDeliveryFee(distance, basePrice, distanceRanges);
    // Calculation: 199 + 200 + (2 * Math.round(1200 / 10)) = 199 + 200 + 240 = 639
    expect(result).toBe(639); // €6.39
  });

//   it("should throw an error if the distance exceeds all ranges", () => {
//     const distance = 2000; // Beyond all ranges
//     const basePrice = 199; // €1.99 in cents
//     expect(() => calculateDeliveryFee(distance, basePrice, distanceRanges)).toThrow(
//       "Delivery not possible: Distance exceeds available ranges."
//     );
//   });

  it("should handle a distance within the first range", () => {
    const distance = 300; // Within the first range
    const basePrice = 199; // €1.99 in cents
    const result = calculateDeliveryFee(distance, basePrice, distanceRanges);
    // Calculation: 199 + 0 + (0 * Math.round(300 / 10)) = 199
    expect(result).toBe(199); // €1.99
  });
});
