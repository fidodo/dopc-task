export function findDistanceRange(distance, distanceRanges) {
    return distanceRanges.find(
      (range) => distance >= range.min && (range.max === 0 || distance < range.max)
    );
  }
  