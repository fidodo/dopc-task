import React from "react";
import { render, screen } from "@testing-library/react";
import OrderSummary from "../../Components/OrderSummary/OrderSummary";

describe("OrderSummary Component", () => {
  const mockSummary = {
    cartValue: 20.5,
    smallOrderSurcharge: 0,
    deliveryFee: 3.9,
    deliveryDistance: 1500,
    totalPrice: 25.90,
    range:2000
  };
  const errorMessage = "Delivery not possible: Distance exceeds available ranges.";
  const mockSetSummary = jest.fn();
  const mockErrorMessage = jest.fn();
  const mockSetErrorMessage = jest.fn();

  const mockDynamicData = {
    venue_raw: {
      delivery_specs: {
        delivery_pricing: {
          base_price: 1.9,
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
    render(<OrderSummary summary={mockSummary} dynamicData={mockDynamicData} setSummary={mockSetSummary} setErrorMessage={mockErrorMessage} errorMessage={errorMessage}/>);

    
    const cartValue = screen.getByText("Cart Value:").nextElementSibling;
    expect(cartValue).toHaveTextContent("20.5 EUR");
    expect(cartValue).toHaveAttribute("data-raw-value", "2050");

 
    const smallOrderSurcharge = screen.getByText("Small Order Surcharge:").nextElementSibling;
    expect(smallOrderSurcharge).toHaveTextContent("0 EUR");
    expect(smallOrderSurcharge).toHaveAttribute("data-raw-value", "0");

  
    const deliveryFee = screen.getByText("Delivery Fee:").nextElementSibling;
    expect(deliveryFee).toHaveAttribute("data-raw-value", "390");

   
    const deliveryDistance = screen.getByText("Delivery Distance:").nextElementSibling;
    expect(deliveryDistance).toHaveTextContent("1500.00 m");
    expect(deliveryDistance).toHaveAttribute("data-raw-value", "1500");

 
    const totalPrice = screen.getByText("Total Price:").nextElementSibling;
    expect(totalPrice).toHaveTextContent("25.90 EUR");
    expect(totalPrice).toHaveAttribute("data-raw-value", "2590");
  });

  it("renders correct raw values in data-raw-value attributes", () => {
    const mockErrorMessage = "";
    render(
      <OrderSummary
        summary={mockSummary}
        dynamicData={mockDynamicData}
        setSummary={mockSetSummary}
        setErrorMessage={mockSetErrorMessage}
        errorMessage={mockErrorMessage}
      />
    );
  
    // Assert raw values for cart value, small order surcharge, delivery fee, and total price
    expect(screen.getByText("20.5 EUR")).toHaveAttribute("data-raw-value", "2050");
    expect(screen.getByText("0 EUR")).toHaveAttribute("data-raw-value", "0");
    expect(screen.getByText("25.90 EUR")).toHaveAttribute("data-raw-value", "2590");
    expect(screen.getByText("1500.00 m")).toHaveAttribute("data-raw-value", "1500");
  });
  

  it("handles distance exceeding range and sets error message", () => {
    const customSummary = { ...mockSummary, deliveryDistance: 2500 };
    const mockErrorMessage = "";
    render(
      <OrderSummary
        summary={customSummary}
        dynamicData={mockDynamicData}
        setSummary={mockSetSummary}
        setErrorMessage={mockSetErrorMessage}
        errorMessage={mockErrorMessage}
      />
    );

    // Assert that error message is set
    expect(mockSetSummary).toHaveBeenCalledWith({
      cartValue: 0,
      smallOrderSurcharge: 0,
      deliveryFee: 0,
      deliveryDistance: 0,
      totalPrice: 0,
      range: 0,
    });
    expect(mockSetErrorMessage).toHaveBeenCalledWith(
      "Delivery not possible: Distance exceeds available ranges."
    );
  });

  it("does not show error message initially", () => {
    const mockErrorMessage = "";
    render(
      <OrderSummary
        summary={mockSummary}
        dynamicData={mockDynamicData}
        setSummary={mockSetSummary}
        setErrorMessage={mockSetErrorMessage}
        errorMessage={mockErrorMessage}
      />
    );

    expect(screen.queryByText("Delivery not possible")).not.toBeInTheDocument();
  });
});
