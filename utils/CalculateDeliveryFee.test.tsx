import calculateDeliveryFee from "./calculateDeliveryFee";
import React, { useState } from "react";
import { render, fireEvent, screen } from "@testing-library/react";

describe("calculateDeliveryFee", () => {
  const distanceRanges = [
    { min: 0, max: 500, a: 0, b: 0 },
    { min: 500, max: 1000, a: 100, b: 1 },
    { min: 1000, max: 0, a: 200, b: 2 }, // max: 0 means no upper limit
  ];

  it("should calculate the correct delivery fee within a valid range", () => {
    const distance = 600; // Within the second range
    const basePrice = 199; // €1.99 in cents
    const result = calculateDeliveryFee(distance, basePrice, distanceRanges);
    // Calculation: 199 + 100 + (1 * Math.round(600 / 10)) = 199 + 100 + 60 = 359
    expect(result.deliveryFee).toBe(359); // €3.59
  });

  it("should handle the maximum range with max set to 0 (no upper limit)", () => {
    const distance = 1200; // Within the third range
    const basePrice = 199; // €1.99 in cents
    const result = calculateDeliveryFee(distance, basePrice, distanceRanges);
    // Calculation: 199 + 200 + (2 * Math.round(1200 / 10)) = 199 + 200 + 240 = 639
    expect(result.deliveryFee).toBe(639); // €6.39
  });

  it("should display an error message if the distance exceeds all ranges", () => {
    const TestComponent = () => {
      const [errorMessage, setErrorMessage] = useState("");
      const basePrice = 199;
      const handleCheckDeliveryFee = () => {
        const result = calculateDeliveryFee(2000, basePrice, distanceRanges); // Beyond all ranges
        if (2000 >result.range) {
          setErrorMessage("Delivery not possible: Distance exceeds available ranges.");
        }
      };

      return (
        <div>
          <button onClick={handleCheckDeliveryFee}>Calculate</button>
          {errorMessage && <div role="alert">{errorMessage}</div>}
        </div>
      );
    };

    render(<TestComponent />);

    // Simulate user interaction
    fireEvent.click(screen.getByText("Calculate"));

    // Assert that the error message is displayed
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Delivery not possible: Distance exceeds available ranges."
    );
  });

  

  it("should handle a distance within the first range", () => {
    const distance = 300; // Within the first range
    const basePrice = 199; // €1.99 in cents
    const result = calculateDeliveryFee(distance, basePrice, distanceRanges);
    // Calculation: 199 + 0 + (0 * Math.round(300 / 10)) = 199
    expect(result.deliveryFee).toBe(199); // €1.99
  });
});
