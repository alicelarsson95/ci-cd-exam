import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import Booking from "../../src/views/Booking";

vi.mock("react-router-dom", () => ({
  ...require("react-router-dom"),
  useNavigate: () => vi.fn(),
}));

describe("Booking page basic rendering", () => {
  test("renders booking page with all essential fields", () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByLabelText("Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Time")).toBeInTheDocument();
    expect(screen.getByLabelText("Number of awesome bowlers")).toBeInTheDocument();
    expect(screen.getByLabelText("Number of lanes")).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: /shoes/i })).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /strIIIIIike!/i })).toBeInTheDocument();
  });
  test("completes a booking and saves confirmation", async () => {
    sessionStorage.clear();

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText("Date"), "2025-12-25");
    await user.type(screen.getByLabelText("Time"), "19:00");
    await user.type(screen.getByLabelText("Number of awesome bowlers"), "4");
    await user.type(screen.getByLabelText("Number of lanes"), "1");

    const addButton = screen.getByRole("button", { name: "+" });
    await user.click(addButton);
    await user.click(addButton);
    await user.click(addButton);
    await user.click(addButton);

    await user.type(screen.getByLabelText("Shoe size / person 1"), "42");
    await user.type(screen.getByLabelText("Shoe size / person 2"), "43");
    await user.type(screen.getByLabelText("Shoe size / person 3"), "44");
    await user.type(screen.getByLabelText("Shoe size / person 4"), "45");

    await user.click(screen.getByRole("button", { name: /strIIIIIike!/i }));

    await waitFor(() => {
      expect(sessionStorage.getItem("confirmation")).not.toBeNull();
    });

    const confirmation = JSON.parse(sessionStorage.getItem("confirmation"));

    expect(confirmation.bookingId).toBe("TEST123");
    expect(confirmation.people).toBe(4);
    expect(confirmation.lanes).toBe(1);
    expect(confirmation.when).toBe("2025-12-25T19:00");
    expect(confirmation.price).toBe(580);
  });
});
