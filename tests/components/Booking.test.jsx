import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";
import Booking from "../../src/views/Booking";

  // Mock för useNavigate
vi.mock("react-router-dom", () => ({
  ...require("react-router-dom"),
  useNavigate: () => vi.fn(),
}));

  // Helper för att slippa repetera renderkoden
const renderBooking = () =>
  render(
    <MemoryRouter>
      <Booking />
    </MemoryRouter>
  );

describe("Booking Page", () => {
  test("renders booking page with all essential fields", () => {
  // "Användaren ska kunna ange datum, tid, antal spelare och antal banor."
  // "Användaren ska kunna välja skor."
    renderBooking();

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByLabelText("Date")).toBeInTheDocument();
    expect(screen.getByLabelText("Time")).toBeInTheDocument();
    expect(screen.getByLabelText("Number of awesome bowlers")).toBeInTheDocument();
    expect(screen.getByLabelText("Number of lanes")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /shoes/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /strIIIIIike!/i })).toBeInTheDocument();
  });

  test("completes a booking and saves confirmation", async () => {
  // "Användaren ska kunna slutföra bokningen genom att klicka på STRIIIIIKE"
    sessionStorage.clear();
    const user = userEvent.setup();

    renderBooking();

    await user.type(screen.getByLabelText("Date"), "2025-12-25");
    await user.type(screen.getByLabelText("Time"), "19:00");
    await user.type(screen.getByLabelText("Number of awesome bowlers"), "2");
    await user.type(screen.getByLabelText("Number of lanes"), "1");
    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: "+" }));

    const shoes = screen.getAllByLabelText(/Shoe size/i);
    await user.type(shoes[0], "42");
    await user.type(shoes[1], "39");

    await user.click(screen.getByRole("button", { name: /strIIIIIike!/i }));

    await waitFor(() => {
      expect(sessionStorage.getItem("confirmation")).not.toBeNull();
    });
  });

  test("shows error when required fields are missing", async () => {
  // "Om obligatoriska fält saknas ska ett felmeddelande visas."
    const user = userEvent.setup();

    renderBooking();
    await user.click(screen.getByRole("button", { name: /strIIIIIike!/i }));

    expect(await screen.findByText(/Alla fälten måste vara ifyllda/i)).toBeInTheDocument();
  });

  test("shows error when players exceed max allowed per lane", async () => {
  // Om antalet spelare överstiger vad en bana kan hantera,
  // (jag bestämde max 4 spelare per bana) ska ett felmeddelande visas.

    const user = userEvent.setup();

    renderBooking();

    await user.type(screen.getByLabelText("Date"), "2025-12-25");
    await user.type(screen.getByLabelText("Time"), "19:00");
    await user.type(screen.getByLabelText("Number of awesome bowlers"), "6");
    await user.type(screen.getByLabelText("Number of lanes"), "1");

    const add = screen.getByRole("button", { name: "+" });
    for (let i = 0; i < 6; i++) {
      await user.click(add);
    }

    const shoes = screen.getAllByLabelText(/Shoe size/i);
    for (const input of shoes) {
      await user.type(input, "40");
    }

    await user.click(screen.getByRole("button", { name: /strIIIIIike!/i }));

    expect(await screen.findByText(/4 spelare per bana/i)).toBeInTheDocument();
  });

  test("shows error when number of shoes does not match players", async () => {
  // "Antalet valda skor måste stämma överens med antal spelare."
    const user = userEvent.setup();

    renderBooking();

    await user.type(screen.getByLabelText("Date"), "2025-12-25");
    await user.type(screen.getByLabelText("Time"), "19:00");
    await user.type(screen.getByLabelText("Number of awesome bowlers"), "2");
    await user.type(screen.getByLabelText("Number of lanes"), "1");

    await user.click(screen.getByRole("button", { name: "+" }));

    await user.click(screen.getByRole("button", { name: /strIIIIIike!/i }));

    expect(await screen.findByText(/Antalet skor måste stämma överens/i)).toBeInTheDocument();
  });

  test("shows error when a shoe size is empty", async () => {
  // "Alla valda skor måste ha en ifylld skostorlek."
    const user = userEvent.setup();

    renderBooking();

    await user.type(screen.getByLabelText("Date"), "2025-12-25");
    await user.type(screen.getByLabelText("Time"), "19:00");
    await user.type(screen.getByLabelText("Number of awesome bowlers"), "1");
    await user.type(screen.getByLabelText("Number of lanes"), "1");

    await user.click(screen.getByRole("button", { name: "+" }));

    await user.click(screen.getByRole("button", { name: /strIIIIIike!/i }));

    expect(await screen.findByText(/Alla skor måste vara ifyllda/i)).toBeInTheDocument();
  });
});
