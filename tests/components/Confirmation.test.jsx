import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, beforeEach } from "vitest";
import Confirmation from "../../src/views/Confirmation";

// Helper för att slippa repetera render-koden
const renderConfirmation = () =>
  render(
    <MemoryRouter>
      <Confirmation />
    </MemoryRouter>
  );

describe("Confirmation page", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test("shows message when no booking exists", () => {
    // "Om ingen bokning finns ska texten 'Ingen bokning gjord' visas."
    renderConfirmation();

    expect(screen.getByText(/Ingen bokning gjord/i)).toBeInTheDocument();
  });

  test("shows confirmation details when booking exists in sessionStorage", () => {
    // "Om en bokning finns sparad ska detaljerna visas."
    const mockBooking = {
      bookingId: "TEST123",
      when: "2025-12-25T19:00",
      people: 4,
      lanes: 1,
      price: 580,
    };

    sessionStorage.setItem("confirmation", JSON.stringify(mockBooking));

    renderConfirmation();

    expect(screen.getByDisplayValue("2025-12-25 19:00")).toBeInTheDocument();
    expect(screen.getByDisplayValue("4")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("TEST123")).toBeInTheDocument();
    expect(screen.getByText("580 sek")).toBeInTheDocument();
  });
});
