import calculateOrderDetails from "./calculateOrderDetails";
import calculateDistance from "./calculateDeliveryDistance";
import calculateSmallOrderSurcharge from "./calculateSmallOrderSurcharge";
import calculateDeliveryFee from "./calculateDeliveryFee";
import calculateTotalPrice from "./calculateTotalPrice";

jest.mock("./calculateDeliveryDistance");
jest.mock("./calculateSmallOrderSurcharge");
jest.mock("./calculateDeliveryFee");
jest.mock("./calculateTotalPrice");

describe("calculateOrderDetails", () => {
  const mockStaticData = {
    venue_raw: {
      location: {
        coordinates: [24.93, 60.17] as [number, number], // Longitude, Latitude
      },
    },
  };

  const mockDynamicData = {
    venue_raw: {
      delivery_specs: {
        delivery_pricing: {
          base_price: 199,
          distance_ranges: [
            { min: 0, max: 500, a: 0, b: 0 },
            { min: 500, max: 1000, a: 100, b: 1 },
            { min: 1000, max: 0, a: 200, b: 2 },
          ],
        },
        order_minimum_no_surcharge: 1000,
      },
    },
  };

  it("should calculate order details correctly", () => {
    (calculateDistance as jest.Mock).mockReturnValue(600);
    (calculateSmallOrderSurcharge as jest.Mock).mockReturnValue(200);
    (calculateDeliveryFee as jest.Mock).mockReturnValue(399);
    (calculateTotalPrice as jest.Mock).mockReturnValue(1599);

    const cartValue = "800";
    const result = calculateOrderDetails({
      staticData: mockStaticData,
      dynamicData: mockDynamicData,
      cartValue,
    });

    expect(calculateDistance).toHaveBeenCalledWith(60.17, 24.93, 60.182114, 24.928135);
    expect(calculateSmallOrderSurcharge).toHaveBeenCalledWith(800, 1000);
    expect(calculateDeliveryFee).toHaveBeenCalledWith(600, 199, mockDynamicData.venue_raw.delivery_specs.delivery_pricing.distance_ranges);
    expect(calculateTotalPrice).toHaveBeenCalledWith(800, 399, 200);

    expect(result).toEqual({
      deliveryDistance: 600,
      smallOrderSurcharge: 200,
      deliveryFee: 399,
      totalPrice: 1599,
    });
  });

  it("should handle cartValue as 0", () => {
    (calculateDistance as jest.Mock).mockReturnValue(300);
    (calculateSmallOrderSurcharge as jest.Mock).mockReturnValue(1000);
    (calculateDeliveryFee as jest.Mock).mockReturnValue(199);
    (calculateTotalPrice as jest.Mock).mockReturnValue(1199);

    const cartValue = "800";
    const result = calculateOrderDetails({
      staticData: mockStaticData,
      dynamicData: mockDynamicData,
      cartValue,
    });

    expect(calculateSmallOrderSurcharge).toHaveBeenCalledWith(800, 1000);
    expect(result).toEqual({
      deliveryDistance: 300,
      smallOrderSurcharge: 1000,
      deliveryFee: 199,
      totalPrice: 1199,
    });
  });
});
