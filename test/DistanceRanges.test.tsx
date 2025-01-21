import {findDistanceRange}from '../utils/distanceRanges';

describe('findDistanceRange', () => {
    const distanceRanges = [
      { min: 0, max: 500, a: 0, b: 0 },
      { min: 500, max: 1000, a: 100, b: 1 },
      { min: 1000, max: 1500, a: 200, b: 2 },
      { min: 1500, max: 2000, a: 300, b: 3 },
      { min: 2000, max: 0, a: 400, b: 4 }, // max: 0 means no upper limit
    ];
  
    it('returns the correct range for a distance within a range', () => {
      const distance = 600;
      const result = findDistanceRange(distance, distanceRanges);
      expect(result).toEqual({ min: 500, max: 1000, a: 100, b: 1 });
    });
  
    it('returns the first range for a distance at the lower bound', () => {
      const distance = 0;
      const result = findDistanceRange(distance, distanceRanges);
      expect(result).toEqual({ min: 0, max: 500, a: 0, b: 0 });
    });
  
    it('returns the last range for a distance exceeding the highest range with max: 0', () => {
      const distance = 2500;
      const result = findDistanceRange(distance, distanceRanges);
      expect(result).toEqual({ min: 2000, max: 0, a: 400, b: 4 });
    });
  
    it('returns undefined for a distance that does not fall in any range', () => {
      const distance = -100;
      const result = findDistanceRange(distance, distanceRanges);
      expect(result).toBeUndefined();
    });
  
    it('returns the correct range for a distance at the upper boundary of a range', () => {
      const distance = 1000;
      const result = findDistanceRange(distance, distanceRanges);
      expect(result).toEqual({ min: 1000, max: 1500, a: 200, b: 2 });
    });
  
    it('returns undefined for a distance just beyond the last range with a max limit', () => {
      const distance = 2000; 
      const result = findDistanceRange(distance, distanceRanges);
      expect(result).toEqual({ min: 2000, max: 0, a: 400, b: 4 });
    });
  });