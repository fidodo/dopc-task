import calculateSmallOrderSurcharge from './calculateSmallOrderSurcharge';

describe('calculateSmallOrderSurcharge', () => {
  it('should return the difference when cart value is less than the order minimum', () => {
    const cartValue = 800; // 8.00 EUR
    const orderMinimum = 1000; // 10.00 EUR
    const result = calculateSmallOrderSurcharge(cartValue, orderMinimum);
    expect(result).toBe(200); // 2.00 EUR
  });

  it('should return 0 when cart value equals the order minimum', () => {
    const cartValue = 1000; // 10.00 EUR
    const orderMinimum = 1000; // 10.00 EUR
    const result = calculateSmallOrderSurcharge(cartValue, orderMinimum);
    expect(result).toBe(0);
  });

  it('should return 0 when cart value is greater than the order minimum', () => {
    const cartValue = 1200; // 12.00 EUR
    const orderMinimum = 1000; // 10.00 EUR
    const result = calculateSmallOrderSurcharge(cartValue, orderMinimum);
    expect(result).toBe(0);
  });

  it('should return the correct surcharge when cart value is 0', () => {
    const cartValue = 0;
    const orderMinimum = 500; // 5.00 EUR
    const result = calculateSmallOrderSurcharge(cartValue, orderMinimum);
    expect(result).toBe(500); // 5.00 EUR
  });

  it('should handle negative cart value and return full order minimum', () => {
    const cartValue = -100; // Invalid scenario
    const orderMinimum = 500; // 5.00 EUR
    const result = calculateSmallOrderSurcharge(cartValue, orderMinimum);
    expect(result).toBe(600); // 6.00 EUR (difference)
  });
});
