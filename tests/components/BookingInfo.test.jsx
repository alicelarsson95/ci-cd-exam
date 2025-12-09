import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, describe, vi } from "vitest";
import BookingInfo from "../../src/components/BookingInfo/BookingInfo";

describe("BookingInfo Component", () => {
  test("updates booking details when user enters date and time", async () => {
    // "Användaren ska kunna ange datum och tid."
    const mockUpdateDetails = vi.fn();

    render(<BookingInfo updateBookingDetails={mockUpdateDetails} />);

    const dateInput = screen.getByLabelText("Date");
    await userEvent.type(dateInput, "2025-12-25");

    const timeInput = screen.getByLabelText("Time");
    await userEvent.type(timeInput, "19:00");

    const lastTimeEvent = mockUpdateDetails.mock.calls.at(-1)[0];

    expect(lastTimeEvent.target.name).toBe("time");
    expect(lastTimeEvent.target.value).toBe("19:00");

    expect(mockUpdateDetails).toHaveBeenCalledTimes(2);
  });

  test("updates booking details when entering number of players and lanes", async () => {
    // "Användaren ska kunna ange antal spelare och antal banor."
    const mockUpdateDetails = vi.fn();

    render(<BookingInfo updateBookingDetails={mockUpdateDetails} />);

    const peopleInput = screen.getByLabelText("Number of awesome bowlers");
    await userEvent.type(peopleInput, "5");

    const lanesInput = screen.getByLabelText("Number of lanes");
    await userEvent.type(lanesInput, "2");

    const lastLanesEvent = mockUpdateDetails.mock.calls.at(-1)[0];

    expect(lastLanesEvent.target.name).toBe("lanes");
    expect(lastLanesEvent.target.value).toBe("2");

    expect(mockUpdateDetails).toHaveBeenCalledTimes(2);
  });
});
