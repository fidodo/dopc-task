import {findDistanceRange} from "./distanceRanges"


export default  function calculateDeliveryFee(distance, basePrice, distanceRanges) {
  console.log(distance, basePrice, distanceRanges)
    const range = findDistanceRange(distance, distanceRanges);
  
    if (!range) {
      throw new Error("Delivery not possible: Distance exceeds available ranges.");
    }
  
    const { a, b } = range;
    const additionalFee = b * Math.round(distance / 10);
  
    return basePrice + a + additionalFee;
  }
  