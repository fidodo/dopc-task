import {findDistanceRange} from "./distanceRanges";
interface DistanceRange {
  min: number;
  max: number; // `max: 0` indicates no upper limit
  a?: number;   // Constant amount to add
  b?: number;   // Multiplier for distance-based fee (always defined)
}

export default function calculateDeliveryFee(
  distance: number,
  basePrice: number,
  distanceRanges: DistanceRange[]
): {deliveryFee: number; range: number} {


  const range = findDistanceRange(distance, distanceRanges);

  if (!range) {
    throw new Error("Delivery not possible: Distance exceeds available ranges.");
  }

  const { a, b } = range;


  if (b === undefined) {
    throw new Error("Invalid distance range: 'b' is undefined.");
  }

  if (a === undefined) {
    throw new Error("Invalid distance range: 'b' is undefined.");
  }

  const additionalFee = (b * Math.round(distance / 10));


  return {
    deliveryFee:basePrice + a + additionalFee,
    range: range.min,
  };
}

