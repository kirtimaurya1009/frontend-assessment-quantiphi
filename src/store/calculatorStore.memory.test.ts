import { beforeEach, describe, expect, it } from "vitest";
import { useCalculatorStore } from "./calculatorStore";

describe("calculator memory", () => {
  beforeEach(() => {
    useCalculatorStore.getState().clear();
    useCalculatorStore.getState().memoryClear();
  });

  it("stores value with M+ and recalls with MR", () => {
    const store = useCalculatorStore.getState();
    store.inputDigit("5");
    store.memoryAdd();

    expect(useCalculatorStore.getState().hasMemory).toBe(true);
    expect(useCalculatorStore.getState().memory).toBe(5);

    store.inputDigit("9");
    store.memoryRecall();

    expect(useCalculatorStore.getState().display).toBe("5");
  });

  it("accumulates with multiple M+", () => {
    const store = useCalculatorStore.getState();
    store.inputDigit("5");
    store.memoryAdd();
    store.inputDigit("3");
    store.memoryAdd();

    expect(useCalculatorStore.getState().memory).toBe(8);
  });

  it("subtracts with M-", () => {
    const store = useCalculatorStore.getState();
    store.inputDigit("1");
    store.inputDigit("0");
    store.memoryAdd();
    store.inputDigit("3");
    store.memorySubtract();

    expect(useCalculatorStore.getState().memory).toBe(7);
  });

  it("clears with MC", () => {
    const store = useCalculatorStore.getState();
    store.inputDigit("5");
    store.memoryAdd();
    store.memoryClear();

    expect(useCalculatorStore.getState().hasMemory).toBe(false);
    store.memoryRecall();
    expect(useCalculatorStore.getState().display).toBe("0");
  });

  it("M+ uses evaluated expression value", () => {
    const store = useCalculatorStore.getState();
    store.insertScientific("sin");
    store.inputDigit("3");
    store.inputDigit("0");
    store.memoryAdd();

    expect(useCalculatorStore.getState().memory).toBeCloseTo(0.5);
  });
});
