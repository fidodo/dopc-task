import React from "react";
import { render, screen } from "@testing-library/react";
import OrderSummary from "../../Components/OrderSummary/OrderSummary";

describe("OrderSummary Component", () => {
  const mockSummary = {
    cartValue: 20.5,
    smallOrderSurcharge: 1.5,
    deliveryFee: 3.9,
    deliveryDistance: 1500,
    totalPrice: 25.9,
  };

  const mockDynamicData = {
    venue_raw: {
      delivery_specs: {
        delivery_pricing: {
          base_price: 2,
          distance_ranges: [
            { min: 0, max: 500, a: 0, b: 0, flag: null },
            { min: 500, max: 1000, a: 100, b: 0, flag: null },
            { min: 1000, max: 1500, a: 200, b: 0, flag: null },
            { min: 1500, max: 2000, a: 200, b: 1, flag: null },
            { min: 2000, max: 0, a: 0, b: 0, flag: null },
          ],
        },
        order_minimum_no_surcharge: 15,
      },
    },
  };

  it("renders the summary values correctly", () => {
    render(<OrderSummary summary={mockSummary} dynamicData={mockDynamicData} />);

    
    const cartValue = screen.getByText("Cart Value:").nextElementSibling;
    expect(cartValue).toHaveTextContent("20.50 EUR");
    expect(cartValue).toHaveAttribute("data-raw-value", "2050");

 
    const smallOrderSurcharge = screen.getByText("Small Order Surcharge:").nextElementSibling;
    expect(smallOrderSurcharge).toHaveTextContent("1.50 EUR");
    expect(smallOrderSurcharge).toHaveAttribute("data-raw-value", "150");

  
    const deliveryFee = screen.getByText("Delivery Fee:").nextElementSibling;
    expect(deliveryFee).toHaveTextContent("3.90 EUR");
    expect(deliveryFee).toHaveAttribute("data-raw-value", "390");

   
    const deliveryDistance = screen.getByText("Delivery Distance:").nextElementSibling;
    expect(deliveryDistance).toHaveTextContent("1500.00 m");
    expect(deliveryDistance).toHaveAttribute("data-raw-value", "1500");

 
    const totalPrice = screen.getByText("Total Price:").nextElementSibling;
    expect(totalPrice).toHaveTextContent("25.90 EUR");
    expect(totalPrice).toHaveAttribute("data-raw-value", "2590");
  });

  it("renders dynamic data correctly", () => {
    render(<OrderSummary summary={mockSummary} dynamicData={mockDynamicData} />);

    // Assert dynamicData structure in console logs
    console.log = jest.fn();
    render(<OrderSummary summary={mockSummary} dynamicData={mockDynamicData} />);
    expect(console.log).toHaveBeenCalledWith(mockDynamicData);
  });
});
