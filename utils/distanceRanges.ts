
interface DistanceRange {
  min: number;
  max: number;
  a?: number; 
  b?: number; 
}

export function findDistanceRange(
  distance: number,
  distanceRanges: DistanceRange[]
): DistanceRange | undefined {
  return distanceRanges.find(
    (range) => distance >= range.min && (range.max === 0 || distance < range.max)
  );
}
