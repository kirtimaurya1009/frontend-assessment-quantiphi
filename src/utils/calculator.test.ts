import { describe, expect, it } from "vitest";
import {
  appendDigit,
  applyUnary,
  calculate,
  evaluateExpression,
  formatNumber,
  sanitizeDisplay,
  toggleSign,
} from "@/utils/calculator";

describe("calculator utils", () => {
  it("appends digits", () => {
    expect(appendDigit("12", "3")).toBe("123");
    expect(appendDigit("0", "5")).toBe("5");
  });

  it("toggles sign", () => {
    expect(toggleSign("42")).toBe("-42");
    expect(toggleSign("-42")).toBe("42");
  });

  it("calculates basic operations", () => {
    expect(calculate(10, 5, "+").result).toBe(15);
    expect(calculate(10, 5, "-").result).toBe(5);
    expect(calculate(10, 5, "*").result).toBe(50);
    expect(calculate(10, 5, "/").result).toBe(2);
  });

  it("handles division by zero", () => {
    const { error } = calculate(8, 0, "/");
    expect(error).toBe("Cannot divide by zero");
  });

  it("formats numbers without exponential notation", () => {
    expect(formatNumber(1000000)).toBe("1000000");
    expect(formatNumber(0.0000001)).toBe("0.0000001");
    expect(formatNumber(1234.5)).toBe("1234.5");
    expect(sanitizeDisplay("1e6")).toBe("1000000");
  });

  it("applies unary ops", () => {
    expect(applyUnary(9, "sqrt").result).toBe(3);
    expect(applyUnary(3, "square").result).toBe(9);
    expect(applyUnary(4, "reciprocal").result).toBeCloseTo(0.25);
  });

  it("evaluates trig in degrees", () => {
    expect(evaluateExpression("sin(30)", "deg").result).toBeCloseTo(0.5);
    expect(evaluateExpression("sin(90)", "deg").result).toBeCloseTo(1);
    expect(evaluateExpression("tan(45)", "deg").result).toBeCloseTo(1);
  });

  it("evaluates trig in radians", () => {
    expect(evaluateExpression("sin(0)", "rad").result).toBe(0);
    expect(evaluateExpression("sin(1.5707963267948966)", "rad").result).toBeCloseTo(
      1,
    );
  });

  it("evaluates other scientific expressions", () => {
    expect(evaluateExpression("√(9)").result).toBe(3);
    expect(evaluateExpression("5²").result).toBe(25);
    expect(evaluateExpression("(2+3)²").result).toBe(25);
    expect(evaluateExpression("1÷(4)").result).toBeCloseTo(0.25);
    expect(evaluateExpression("2×3+4").result).toBe(10);
  });
});
