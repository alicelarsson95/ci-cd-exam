import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Navigation from "../../src/components/Navigation/Navigation";
import { vi } from "vitest";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Navigation component", () => {
  test("opens menu when icon is clicked and triggers navigation", async () => {
    // "Användaren ska kunna öppna menyn och navigera mellan sidorna."
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const icon = screen.getByRole("img");
    expect(icon).toBeInTheDocument();

    await user.click(icon);

    // "När menyn öppnas ska länkarna för Booking och Confirmation visas."
    const bookingLink = screen.getByText("Booking");
    const confirmationLink = screen.getByText("Confirmation");

    expect(bookingLink).toBeVisible();
    expect(confirmationLink).toBeVisible();

    await user.click(bookingLink);
    expect(mockNavigate).toHaveBeenCalledWith("/");

    await user.click(confirmationLink);
    expect(mockNavigate).toHaveBeenCalledWith("/confirmation");
  });
});
