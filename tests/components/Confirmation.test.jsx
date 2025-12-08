import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, beforeEach } from "vitest";
import Confirmation from "../../src/views/Confirmation";

describe("Confirmation page", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  test("shows message when no booking exists", () => {
    render(
      <MemoryRouter>
        <Confirmation />
      </MemoryRouter>
    );

    expect(screen.getByText(/Inga bokning gjord/i)).toBeInTheDocument();
  });

  test("shows confirmation details when booking exists in sessionStorage", () => {
    const mockBooking = {
      bookingId: "TEST123",
      when: "2025-12-25T19:00",
      people: 4,
      lanes: 1,
      price: 580,
    };

    sessionStorage.setItem("confirmation", JSON.stringify(mockBooking));

    render(
      <MemoryRouter>
        <Confirmation />
      </MemoryRouter>
    );

    expect(screen.getByDisplayValue("2025-12-25 19:00")).toBeInTheDocument();
    expect(screen.getByDisplayValue("4")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("TEST123")).toBeInTheDocument();

    expect(screen.getByText("580 sek")).toBeInTheDocument();
  });
});
