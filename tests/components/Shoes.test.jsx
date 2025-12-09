import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import Shoes from "../../src/components/Shoes/Shoes";

// Mockar nanoid
vi.mock("nanoid", () => ({
  nanoid: () => "test-id",
}));

// Helper för att slippa repetera render-koden
const renderShoes = (props) =>
  render(
    <Shoes
      shoes={props.shoes}
      updateSize={props.updateSize || (() => {})}
      addShoe={props.addShoe || (() => {})}
      removeShoe={props.removeShoe || (() => {})}
    />
  );

describe("Shoes Component", () => {
  test("renders one shoe size input per player", () => {
    // "Det ska vara möjligt att välja skostorlek för alla spelare."
    const shoes = [{ id: "p1" }, { id: "p2" }, { id: "p3" }];

    renderShoes({ shoes });

    const inputs = screen.getAllByLabelText(/Shoe size \/ person/i);
    expect(inputs).toHaveLength(3);
  });

  test("allows user to enter shoe size", async () => {
    // "Användaren ska kunna ange skostorlek."
    const mockUpdate = vi.fn();

    renderShoes({
      shoes: [{ id: "p1" }],
      updateSize: mockUpdate,
    });

    const input = screen.getByLabelText("Shoe size / person 1");
    await userEvent.type(input, "42");

    expect(mockUpdate).toHaveBeenCalled();
    const event = mockUpdate.mock.calls.at(-1)[0];

    expect(event.target.name).toBe("p1");
    expect(event.target.value).toBe("42");
  });

  test("allows changing shoe size", async () => {
    // "Användaren ska kunna ändra skostorlek."
    const mockUpdate = vi.fn();

    renderShoes({
      shoes: [{ id: "p1" }],
      updateSize: mockUpdate,
    });

    const input = screen.getByLabelText("Shoe size / person 1");

    await userEvent.type(input, "4");
    await userEvent.type(input, "3");

    const lastEvent = mockUpdate.mock.calls.at(-1)[0];
    expect(lastEvent.target.value).toBe("43");
  });

  test("removes shoe input when '-' is clicked", async () => {
    // "Användaren ska kunna ta bort en skostorlek."
    const mockRemove = vi.fn();

    renderShoes({
      shoes: [{ id: "p1" }],
      removeShoe: mockRemove,
    });

    const removeButton = screen.getByRole("button", { name: "-" });
    await userEvent.click(removeButton);

    expect(mockRemove).toHaveBeenCalledWith("p1");
  });

  test("adds new shoe input when '+' is clicked", async () => {
    // "Användaren ska kunna lägga till en skostorlek."
    const mockAdd = vi.fn();

    renderShoes({
      shoes: [],
      addShoe: mockAdd,
    });

    const addButton = screen.getByRole("button", { name: "+" });
    await userEvent.click(addButton);

    expect(mockAdd).toHaveBeenCalledWith("test-id");
  });
});
