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
        coordinates: [24.93, 60.17] as [number, number], 
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

  beforeEach(() => {
    jest.clearAllMocks();
  });


  it("should calculate order details correctly for valid inputs", () => {
    // Mocked function values
    (calculateDistance as jest.Mock).mockReturnValue(600); 
    (calculateSmallOrderSurcharge as jest.Mock).mockReturnValue(200);
    (calculateDeliveryFee as jest.Mock).mockReturnValue({ deliveryFee: 399, range: 1000 }); 
    (calculateTotalPrice as jest.Mock).mockReturnValue(1599); 

  
    const result = calculateOrderDetails({
      staticData: mockStaticData,
      dynamicData: mockDynamicData,
      cartValue: "800", 
      userLatitude: "60.19", 
      userLongitude: "24.94", 
    });

   
    expect(calculateDistance).toHaveBeenCalledWith(60.17, 24.93, 60.19, 24.94);
    expect(calculateSmallOrderSurcharge).toHaveBeenCalledWith(800, 1000);
    expect(calculateDeliveryFee).toHaveBeenCalledWith(
      600,
      199,
      mockDynamicData.venue_raw.delivery_specs.delivery_pricing.distance_ranges
    );
    expect(calculateTotalPrice).toHaveBeenCalledWith(800, 399, 200);

    expect(result).toEqual({
      deliveryDistance: 600,
      smallOrderSurcharge: 200,
      deliveryFee: 399,
      totalPrice: 1599,
      range: 1000,
    });
  });



  it("should handle delivery distances exceeding all ranges", () => {
    (calculateDistance as jest.Mock).mockReturnValue(1500); 
    (calculateDeliveryFee as jest.Mock).mockReturnValue({ deliveryFee: 0, range: 0 }); 
    (calculateSmallOrderSurcharge as jest.Mock).mockReturnValue(0);
    (calculateTotalPrice as jest.Mock).mockReturnValue(0);

    const result = calculateOrderDetails({
      staticData: mockStaticData,
      dynamicData: mockDynamicData,
      cartValue: "800",
      userLatitude: "60.19",
      userLongitude: "24.94",
    });

    expect(result).toEqual({
      deliveryDistance: 1500,
      smallOrderSurcharge: 0,
      deliveryFee: 0,
      totalPrice: 0,
      range: 0,
    });
  });

  it("should calculate order details with large cart values (no surcharge)", () => {
    (calculateDistance as jest.Mock).mockReturnValue(300); 
    (calculateSmallOrderSurcharge as jest.Mock).mockReturnValue(0); 
    (calculateDeliveryFee as jest.Mock).mockReturnValue({ deliveryFee: 199, range: 500 });
    (calculateTotalPrice as jest.Mock).mockReturnValue(4199); 

    const result = calculateOrderDetails({
      staticData: mockStaticData,
      dynamicData: mockDynamicData,
      cartValue: "4000",
      userLatitude: "60.19",
      userLongitude: "24.94",
    });

    expect(result).toEqual({
      deliveryDistance: 300,
      smallOrderSurcharge: 0,
      deliveryFee: 199,
      totalPrice: 4199,
      range: 500,
    });
  });
});
