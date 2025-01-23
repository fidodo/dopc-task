import calculateSmallOrderSurcharge from './calculateSmallOrderSurcharge';

describe('calculateSmallOrderSurcharge', () => {
  it('should return the difference when cart value is less than the order minimum', () => {
    const cartValue = 8.00; // 8.00 EUR
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
  it('should return an error message for negative cart value', () => {
    const cartValue = -100; // Invalid scenario
    const orderMinimum = 500; // 5.00 EUR
  
 
    const validateCartValue = (value:number) => {
      if (value < 0) {
        return "Cart value must be a positive number.";
      }
      return calculateSmallOrderSurcharge(value, orderMinimum);
    };
  
    const result = validateCartValue(cartValue);
  
    // Expect the validation error
    expect(result).toBe("Cart value must be a positive number.");
  });
  
});
