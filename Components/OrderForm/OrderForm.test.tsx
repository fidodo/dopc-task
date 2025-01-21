
import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import OrderForm from "../../Components/OrderForm/OrderForm";

describe("OrderForm Component", () => {
  const mockOnSubmit = jest.fn();

  const mockStaticData = {
    venue_raw: {
      name: "Home Assignment Venue Helsinki",
      location: {
        coordinates: [24.93, 60.17] as [number, number]
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form correctly", () => {
    render(<OrderForm onSubmit={mockOnSubmit} staticData={mockStaticData} />);

    expect(screen.getByLabelText(/venue slug/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cart value/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/user latitude/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/user longitude/i)).toBeInTheDocument();
  });

  it("handles input changes correctly", () => {
    render(<OrderForm onSubmit={mockOnSubmit} staticData={mockStaticData} />);

    fireEvent.change(screen.getByTestId("venueSlug"), { target: { value: "Home Assignment Venue Helsinki" } });
    fireEvent.change(screen.getByTestId("cartValue"), { target: { value: "10.50" } });
    fireEvent.change(screen.getByTestId("userLatitude"), { target: { value: "60.17" } });
    fireEvent.change(screen.getByTestId("userLongitude"), { target: { value: "24.93" } });

    expect(screen.getByTestId("venueSlug")).toHaveValue("Home Assignment Venue Helsinki");
    expect(screen.getByTestId("cartValue")).toHaveValue("10.50");
    expect(screen.getByTestId("userLatitude")).toHaveValue("60.17");
    expect(screen.getByTestId("userLongitude")).toHaveValue("24.93");
  });

  it("validates inputs and shows error messages", async () => {
    render(<OrderForm onSubmit={mockOnSubmit} staticData={mockStaticData} />);

    fireEvent.click(screen.getByTestId("calculate"));

    await waitFor(() => {
      expect(screen.getByText(/venue slug is required/i)).toBeInTheDocument();
      expect(screen.getByText(/cart value must be a positive number/i)).toBeInTheDocument();
      expect(screen.getByText(/valid latitude is required/i)).toBeInTheDocument();
      expect(screen.getByText(/valid longitude is required/i)).toBeInTheDocument();
    });
  });

  it("handles form submission correctly", async () => {
    render(<OrderForm onSubmit={mockOnSubmit} staticData={mockStaticData} />);

    fireEvent.change(screen.getByTestId("venueSlug"), { target: { value: "Home Assignment Venue Helsinki" } });
    fireEvent.change(screen.getByTestId("cartValue"), { target: { value: "10.50" } });
    fireEvent.change(screen.getByTestId("userLatitude"), { target: { value: "60.17" } });
    fireEvent.change(screen.getByTestId("userLongitude"), { target: { value: "24.93" } });

    fireEvent.click(screen.getByTestId("calculate"));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        venueSlug: "Home Assignment Venue Helsinki",
        cartValue: "10.50",
        userLatitude: "60.17",
        userLongitude: "24.93",
      });
    });
  });

  it("handles Get Location click and updates latitude and longitude", async () => {
    render(<OrderForm onSubmit={mockOnSubmit} staticData={mockStaticData} />);
  

    fireEvent.change(screen.getByTestId("venueSlug"), {
      target: { value: "Home Assignment Venue Helsinki" },
    });
    fireEvent.change(screen.getByTestId("cartValue"), {
      target: { value: "1000" },
    });
  

    fireEvent.click(screen.getByTestId("getLocation"));

    await waitFor(() => {
      expect(screen.getByTestId("userLatitude")).toHaveValue("60.17");
      expect(screen.getByTestId("userLongitude")).toHaveValue("24.93");
    });
  });
  
});