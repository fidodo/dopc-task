import calculateDistance from './calculateDeliveryDistance';

describe('calculateDistance (Helsinki)', () => {
  it('should return 0 for the same location (Helsinki Central Railway Station)', () => {
    const lat = 60.1708;
    const lon = 24.9414;

    const result = calculateDistance(lat, lon, lat, lon);

    expect(result).toBe(0);
  });

  it('should calculate distance between Helsinki Central Railway Station and Olympic Stadium', () => {
    const lat1 = 60.1708; // Helsinki Central Railway Station
    const lon1 = 24.9414;
    const lat2 = 60.1860; // Helsinki Olympic Stadium
    const lon2 = 24.9274;

    const result = calculateDistance(lat1, lon1, lat2, lon2);

    // Approximate distance in meters
    expect(result).toBeCloseTo(1859, -1); // 1.859 km
  });

  it('should calculate distance between Helsinki Central Railway Station and Linnanmäki Amusement Park', () => {
    const lat1 = 60.1708; // Helsinki Central Railway Station
    const lon1 = 24.9414;
    const lat2 = 60.1889; // Linnanmäki Amusement Park
    const lon2 = 24.9400;

    const result = calculateDistance(lat1, lon1, lat2, lon2);

    // Approximate distance in meters
    expect(result).toBeCloseTo(2010, -1); // 2.01 km
  });

  it('should calculate distance between Helsinki Olympic Stadium and Linnanmäki Amusement Park', () => {
    const lat1 = 60.1860; // Helsinki Olympic Stadium
    const lon1 = 24.9274;
    const lat2 = 60.1889; // Linnanmäki Amusement Park
    const lon2 = 24.9400;

    const result = calculateDistance(lat1, lon1, lat2, lon2);

    // Approximate distance in meters
    expect(result).toBeCloseTo(770, -1); // 770 meters
  });
});

