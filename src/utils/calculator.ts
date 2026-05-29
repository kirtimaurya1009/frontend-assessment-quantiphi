import type { AngleMode, Operator } from "@/types/calculator";

const MAX_DISPLAY_LENGTH = 16;

export type UnaryOp = "sqrt" | "square" | "reciprocal" | "sin" | "cos" | "tan";

/** Format a numeric result as plain decimal text (never scientific notation). */
export function formatNumber(num: number): string {
  if (!Number.isFinite(num)) return "Error";
  if (Object.is(num, -0) || num === 0) return "0";

  const rounded = Math.round(num * 1e10) / 1e10;
  let text = Number.isInteger(rounded)
    ? String(rounded)
    : rounded.toFixed(10).replace(/\.?0+$/, "");

  if (/[eE]/.test(text)) {
    text = rounded
      .toLocaleString("en-US", {
        useGrouping: false,
        maximumFractionDigits: 10,
      })
      .replace(/,/g, "");
  }

  if (text.length > MAX_DISPLAY_LENGTH) {
    text = text.slice(0, MAX_DISPLAY_LENGTH);
  }

  return text;
}

export function sanitizeDisplay(value: string): string {
  if (value === "Error") return value;

  const num = parseFloat(value);
  if (!Number.isNaN(num) && /^-?[\d.eE+-]+$/.test(value.trim())) {
    return formatNumber(num);
  }

  if (value.length <= MAX_DISPLAY_LENGTH) return value;
  return value.slice(0, MAX_DISPLAY_LENGTH);
}

export function appendDigit(current: string, digit: string): string {
  if (current === "0" || current === "Error") return digit;
  if (current.includes(".") && digit === ".") return current;
  return current + digit;
}

export function appendDecimal(current: string): string {
  if (current === "Error") return "0.";
  if (current.includes(".")) return current;
  return `${current}.`;
}

export function toggleSign(current: string): string {
  if (current === "0" || current === "Error") return current;
  return current.startsWith("-") ? current.slice(1) : `-${current}`;
}

export function applyPercentage(current: string): string {
  const num = parseFloat(current);
  if (Number.isNaN(num)) return current;
  return sanitizeDisplay(String(num / 100));
}

export function calculate(
  a: number,
  b: number,
  operator: Operator,
): { result: number; error?: string } {
  switch (operator) {
    case "+":
      return { result: a + b };
    case "-":
      return { result: a - b };
    case "*":
      return { result: a * b };
    case "/":
      if (b === 0) return { result: 0, error: "Cannot divide by zero" };
      return { result: a / b };
    default:
      return { result: b };
  }
}

export function parseDisplay(value: string): number {
  const num = parseFloat(value);
  return Number.isNaN(num) ? 0 : num;
}

export function isExpressionString(value: string): boolean {
  if (value === "Error") return false;
  return /[a-zπ√²^()]|×|÷|−/.test(value);
}

export function appendToExpression(current: string, token: string): string {
  if (current === "Error") return token;
  if (current === "0" && !/^[\d.]/.test(token)) return token;
  if (current === "0" && /^[\d.]/.test(token)) return token;
  return current + token;
}

export function appendSquareToExpression(display: string): string {
  if (display === "0" || display === "Error") return "0²";
  if (/^[-+]?[\d.]+$/.test(display)) return `${display}²`;
  return `(${display})²`;
}

export function balanceParentheses(expr: string): string {
  const open = (expr.match(/\(/g) || []).length;
  const close = (expr.match(/\)/g) || []).length;
  if (close >= open) return expr;
  return expr + ")".repeat(open - close);
}

function normalizeExpression(expr: string): string {
  return balanceParentheses(expr)
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/−/g, "-")
    .replace(/π/g, String(Math.PI))
    .replace(/√\(/g, "sqrt(")
    .replace(/√/g, "sqrt")
    .replace(/²/g, "**2")
    .replace(/\^/g, "**")
    .replace(/sin\(/gi, "sinT(")
    .replace(/cos\(/gi, "cosT(")
    .replace(/tan\(/gi, "tanT(");
}

function trigHelpers(angleMode: AngleMode): string {
  if (angleMode === "rad") {
    return `
      const sinT = (x) => Math.sin(x);
      const cosT = (x) => Math.cos(x);
      const tanT = (x) => Math.tan(x);
    `;
  }
  return `
    const sinT = (x) => Math.sin((x * Math.PI) / 180);
    const cosT = (x) => Math.cos((x * Math.PI) / 180);
    const tanT = (x) => Math.tan((x * Math.PI) / 180);
  `;
}

export function evaluateExpression(
  expr: string,
  angleMode: AngleMode = "deg",
): { result?: number; error?: string } {
  const trimmed = expr.trim();
  if (!trimmed) return { error: "Empty expression" };

  const allowed = /^[0-9+\-*/().%\s×÷−^²πsincotanqrgl√]+$/i;
  if (!allowed.test(trimmed)) return { error: "Invalid expression" };

  try {
    const normalized = normalizeExpression(trimmed);
    const trig = trigHelpers(angleMode);

    // eslint-disable-next-line no-new-func
    const result = Function(
      `"use strict";
      ${trig}
      const sqrt = (x) => {
        if (x < 0) throw new Error("invalid");
        return Math.sqrt(x);
      };
      return (${normalized});`,
    )() as number;

    if (!Number.isFinite(result)) return { error: "Invalid result" };
    return { result };
  } catch {
    return { error: "Invalid expression" };
  }
}

export function applyUnary(value: number, op: UnaryOp): { result?: number; error?: string } {
  switch (op) {
    case "sqrt":
      if (value < 0) return { error: "Invalid input" };
      return { result: Math.sqrt(value) };
    case "square":
      return { result: value * value };
    case "reciprocal":
      if (value === 0) return { error: "Cannot divide by zero" };
      return { result: 1 / value };
    case "sin":
      return { result: Math.sin(value) };
    case "cos":
      return { result: Math.cos(value) };
    case "tan":
      return { result: Math.tan(value) };
    default:
      return { error: "Unknown op" };
  }
}