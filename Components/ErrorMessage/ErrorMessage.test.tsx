

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage Component", () => {
  const testMessage = "This is a test error message";

  it("renders the error message correctly when `isVisible` is true", () => {
    const mockSetIsVisible = jest.fn(); // Mock `setIsVisible`

    render(
      <ErrorMessage
        message={testMessage}
        isVisible={true}
        setIsVisible={mockSetIsVisible}
      />
    );

    // Check that the error message is rendered
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText(testMessage)).toBeInTheDocument();

    // Check that the close button is rendered
    expect(screen.getByRole("button", { name: /close/i })).toBeInTheDocument();
  });

  it("does not render the error message when `isVisible` is false", () => {
    const mockSetIsVisible = jest.fn(); // Mock `setIsVisible`

    render(
      <ErrorMessage
        message={testMessage}
        isVisible={false}
        setIsVisible={mockSetIsVisible}
      />
    );

    // Check that the error message is not rendered
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("hides the error message when the close button is clicked", () => {
    const mockSetIsVisible = jest.fn(); // Mock `setIsVisible`

    render(
      <ErrorMessage
        message={testMessage}
        isVisible={true}
        setIsVisible={mockSetIsVisible}
      />
    );

    // Get the close button
    const closeButton = screen.getByRole("button", { name: /close/i });

    // Simulate a click event on the close button
    fireEvent.click(closeButton);

    // Check that `setIsVisible` is called with `false`
    expect(mockSetIsVisible).toHaveBeenCalledWith(false);
  });
});
