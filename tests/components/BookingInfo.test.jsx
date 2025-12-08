import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, describe, vi } from "vitest";
import BookingInfo from "../../src/components/BookingInfo/BookingInfo";

describe("BookingInfo Component", () => {
  test("verifies date and time inputs update state correctly", async () => {
    const mockUpdateDetails = vi.fn();
    render(<BookingInfo updateBookingDetails={mockUpdateDetails} />);

    const dateInput = screen.getByLabelText("Date");
    await userEvent.type(dateInput, "2025-12-25");

    const timeInput = screen.getByLabelText("Time");
    await userEvent.type(timeInput, "19:00");

    const lastCall = mockUpdateDetails.mock.calls.at(-1)[0];
    expect(lastCall.target.value).toBe("19:00");
    expect(lastCall.target.name).toBe("time");

    expect(mockUpdateDetails).toHaveBeenCalledTimes(2);
  });

  test("verifies number inputs for people and lanes update state correctly", async () => {
    const mockUpdateDetails = vi.fn();
    render(<BookingInfo updateBookingDetails={mockUpdateDetails} />);

    const peopleInput = screen.getByLabelText("Number of awesome bowlers");
    await userEvent.type(peopleInput, "5");

    const lanesInput = screen.getByLabelText("Number of lanes");
    await userEvent.type(lanesInput, "2");

    const lastLaneCall = mockUpdateDetails.mock.calls.at(-1)[0];
    expect(lastLaneCall.target.value).toBe("2");
    expect(lastLaneCall.target.name).toBe("lanes");

    expect(mockUpdateDetails).toHaveBeenCalledTimes(2);
  });
});
