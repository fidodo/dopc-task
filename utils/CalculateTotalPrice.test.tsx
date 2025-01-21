import calculateTotalPrice from "./calculateTotalPrice";

describe("calculateTotalPrice", () => {
  it("should correctly calculate the total price", () => {
    const cartValue = 1000; // 10.00 EUR
    const deliveryFee = 299; // 2.99 EUR
    const smallOrderSurcharge = 200; // 2.00 EUR

    const totalPrice = calculateTotalPrice(cartValue, deliveryFee, smallOrderSurcharge);

    expect(totalPrice).toBe(1499); // 14.99 EUR
  });

  it("should return only the cart value if deliveryFee and smallOrderSurcharge are zero", () => {
    const cartValue = 800; // 8.00 EUR
    const deliveryFee = 0;
    const smallOrderSurcharge = 0;

    const totalPrice = calculateTotalPrice(cartValue, deliveryFee, smallOrderSurcharge);

    expect(totalPrice).toBe(800); // 8.00 EUR
  });

  it("should handle zero cart value correctly", () => {
    const cartValue = 0;
    const deliveryFee = 250; // 2.50 EUR
    const smallOrderSurcharge = 100; // 1.00 EUR

    const totalPrice = calculateTotalPrice(cartValue, deliveryFee, smallOrderSurcharge);

    expect(totalPrice).toBe(350); // 3.50 EUR
  });

  it("should handle all values as zero and return zero", () => {
    const cartValue = 0;
    const deliveryFee = 0;
    const smallOrderSurcharge = 0;

    const totalPrice = calculateTotalPrice(cartValue, deliveryFee, smallOrderSurcharge);

    expect(totalPrice).toBe(0);
  });
});
