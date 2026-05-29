import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { Calculator } from "./Calculator";
import { useCalculatorStore } from "@/store/calculatorStore";

describe("Calculator", () => {
  beforeEach(() => {
    useCalculatorStore.getState().clear();
    useCalculatorStore.setState({ scientificOpen: true });
  });

  afterEach(() => {
    cleanup();
  });

  it("shows the full expression before equals", () => {
    render(<Calculator />);
    useCalculatorStore.setState({ scientificOpen: false });

    fireEvent.click(screen.getByRole("button", { name: "9" }));
    fireEvent.click(screen.getByRole("button", { name: "×" }));
    fireEvent.click(screen.getByRole("button", { name: "6" }));

    expect(screen.getByTestId("calc-display")).toHaveTextContent("9 × 6");
  });

  it("renders display and performs addition", () => {
    render(<Calculator />);

    fireEvent.click(screen.getByRole("button", { name: "2" }));
    fireEvent.click(screen.getByRole("button", { name: "+" }));
    fireEvent.click(screen.getByRole("button", { name: "3" }));
    fireEvent.click(screen.getByRole("button", { name: "=" }));

    expect(useCalculatorStore.getState().display).toBe("5");
  });

  it("shows error on division by zero", () => {
    render(<Calculator />);

    fireEvent.click(screen.getByRole("button", { name: "8" }));
    fireEvent.click(screen.getByRole("button", { name: "÷" }));
    fireEvent.click(screen.getByRole("button", { name: "0" }));
    fireEvent.click(screen.getByRole("button", { name: "=" }));

    expect(useCalculatorStore.getState().display).toBe("Error");
  });

  it("stores and recalls memory", () => {
    render(<Calculator />);

    fireEvent.click(screen.getByRole("button", { name: "5" }));
    fireEvent.click(screen.getByRole("button", { name: "M+" }));
    fireEvent.click(screen.getByRole("button", { name: "MR" }));

    expect(useCalculatorStore.getState().display).toBe("5");
    expect(screen.getByLabelText(/Memory value 5/i)).toBeInTheDocument();
  });

  it("shows scientific tokens on display when clicked", () => {
    render(<Calculator />);

    fireEvent.click(screen.getByRole("button", { name: "sin" }));
    expect(useCalculatorStore.getState().display).toBe("sin(");

    fireEvent.click(screen.getByRole("button", { name: "π" }));
    expect(useCalculatorStore.getState().display).toBe("sin(π");
  });
});
