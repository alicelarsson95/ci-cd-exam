import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import Shoes from "../../src/components/Shoes/Shoes";

vi.mock("nanoid", () => ({
  nanoid: () => "test-id",
}));

describe("Shoes Component", () => {
  test("renders one shoe size input per player", () => {
    const shoes = [{ id: "p1" }, { id: "p2" }, { id: "p3" }];

    render(<Shoes shoes={shoes} updateSize={() => {}} addShoe={() => {}} removeShoe={() => {}} />);

    const inputs = screen.getAllByLabelText(/Shoe size \/ person/i);
    expect(inputs).toHaveLength(3);
  });

  test("allows user to enter shoe size for a player", async () => {
    const mockUpdate = vi.fn();

    render(<Shoes shoes={[{ id: "p1" }]} updateSize={mockUpdate} addShoe={() => {}} removeShoe={() => {}} />);

    const input = screen.getByLabelText("Shoe size / person 1");
    await userEvent.type(input, "42");

    expect(mockUpdate).toHaveBeenCalled();
    const event = mockUpdate.mock.calls.at(-1)[0];

    expect(event.target.name).toBe("p1");
    expect(event.target.value).toBe("42");
  });

  test("allows user to change shoe size", async () => {
    const mockUpdate = vi.fn();

    render(<Shoes shoes={[{ id: "p1" }]} updateSize={mockUpdate} addShoe={() => {}} removeShoe={() => {}} />);

    const input = screen.getByLabelText("Shoe size / person 1");

    await userEvent.type(input, "4");
    await userEvent.type(input, "3");

    expect(mockUpdate.mock.calls.length).toBeGreaterThan(1);
    const lastEvent = mockUpdate.mock.calls.at(-1)[0];

    expect(lastEvent.target.value).toBe("43");
  });

  test("removes shoe input when '-' button is clicked", async () => {
    const mockRemove = vi.fn();

    render(<Shoes shoes={[{ id: "p1" }]} updateSize={() => {}} addShoe={() => {}} removeShoe={mockRemove} />);

    const removeButton = screen.getByRole("button", { name: "-" });
    await userEvent.click(removeButton);

    expect(mockRemove).toHaveBeenCalledWith("p1");
  });

  test("adds shoe input when '+' is clicked", async () => {
    const mockAdd = vi.fn();

    render(<Shoes shoes={[]} updateSize={() => {}} addShoe={mockAdd} removeShoe={() => {}} />);

    const addButton = screen.getByRole("button", { name: "+" });
    await userEvent.click(addButton);

    expect(mockAdd).toHaveBeenCalledWith("test-id");
  });
});
