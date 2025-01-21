import { calculateLongLang } from './calculateLongLang';

describe('calculateLongLang', () => {
  const mockStaticData = {
    venue_raw: {
      name: 'Home Assignment Venue Helsinki',
      location: {
        coordinates: [24.93, 60.17] as [number, number], // Longitude, Latitude
      },
    },
  };

  it('should return user latitude and longitude if names match after normalization', () => {
    const venue = 'home-assignment-venue-helsinki';

    const result = calculateLongLang({
      venue,
      staticData: mockStaticData,
    });

    expect(result).toEqual({
      userLatitude: 60.17,
      userLongitude: 24.93,
    });
  });

  it('should return undefined if names do not match after normalization', () => {
    const venue = 'different-venue';

    const result = calculateLongLang({
      venue,
      staticData: mockStaticData,
    });

    expect(result).toBeUndefined();
  });

  it('should handle special characters and case differences during normalization', () => {
    const venue = 'Home-ASSIGNMENT-venue-helsinki';

    const result = calculateLongLang({
      venue,
      staticData: mockStaticData,
    });

    expect(result).toEqual({
      userLatitude: 60.17,
      userLongitude: 24.93,
    });
  });

  it('should handle empty venue string and return undefined', () => {
    const venue = '';

    const result = calculateLongLang({
      venue,
      staticData: mockStaticData,
    });

    expect(result).toBeUndefined();
  });
});
