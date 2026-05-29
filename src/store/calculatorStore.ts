import { create } from "zustand";
import type { AngleMode, HistoryEntry, Operator } from "@/types/calculator";
import {
  appendDecimal,
  appendDigit,
  appendSquareToExpression,
  appendToExpression,
  replaceOrAppendOperator,
  applyPercentage,
  calculate,
  evaluateExpression,
  isExpressionString,
  parseDisplay,
  formatNumber,
  toggleSign,
} from "@/utils/calculator";

export type ScientificToken =
  | "sin"
  | "cos"
  | "tan"
  | "sqrt"
  | "square"
  | "reciprocal"
  | "pi";

interface CalculatorState {
  display: string;
  previousValue: string | null;
  operator: Operator;
  waitingForOperand: boolean;
  expressionMode: boolean;
  history: HistoryEntry[];

  historyOpen: boolean;
  scientificOpen: boolean;
  angleMode: AngleMode;

  memory: number;
  hasMemory: boolean;

  setHistoryOpen: (open: boolean) => void;
  toggleScientificOpen: () => void;
  setAngleMode: (mode: AngleMode) => void;
  toggleAngleMode: () => void;

  inputDigit: (digit: string) => void;
  inputDecimal: () => void;
  clear: () => void;
  backspace: () => void;
  chooseOperator: (op: Exclude<Operator, null>) => void;
  calculateResult: () => void;
  toggleSign: () => void;
  percentage: () => void;

  insertScientific: (token: ScientificToken) => void;

  memoryClear: () => void;
  memoryRecall: () => void;
  memoryAdd: () => void;
  memorySubtract: () => void;
}

const OP_SYMBOLS: Record<Exclude<Operator, null>, string> = {
  "+": "+",
  "-": "−",
  "*": "×",
  "/": "÷",
};

const SCIENTIFIC_DISPLAY: Record<ScientificToken, string> = {
  sin: "sin(",
  cos: "cos(",
  tan: "tan(",
  sqrt: "√(",
  square: "²",
  reciprocal: "1÷(",
  pi: "π",
};

function addHistory(
  history: HistoryEntry[],
  expression: string,
  result: string,
): HistoryEntry[] {
  return [
    {
      id: crypto.randomUUID(),
      expression,
      result,
      timestamp: Date.now(),
    },
    ...history,
  ].slice(0, 15);
}

/** Numeric value on screen (evaluates expressions when needed). */
function getDisplayNumericValue(state: CalculatorState): number | null {
  const { display, expressionMode, angleMode } = state;

  if (display === "Error") return null;

  if (expressionMode || isExpressionString(display)) {
    const { result, error } = evaluateExpression(display, angleMode);
    if (error || result === undefined) return null;
    return result;
  }

  const num = parseDisplay(display);
  return Number.isNaN(num) ? null : num;
}

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  display: "0",
  previousValue: null,
  operator: null,
  waitingForOperand: false,
  expressionMode: false,
  history: [],

  historyOpen: false,
  scientificOpen: false,
  angleMode: "deg",

  memory: 0,
  hasMemory: false,

  setHistoryOpen: (historyOpen) => set({ historyOpen }),
  toggleScientificOpen: () =>
    set((s) => ({ scientificOpen: !s.scientificOpen })),
  setAngleMode: (angleMode) => set({ angleMode }),
  toggleAngleMode: () =>
    set((s) => ({ angleMode: s.angleMode === "deg" ? "rad" : "deg" })),

  inputDigit: (digit) => {
    const { display, waitingForOperand, expressionMode } = get();
    const inExpr = expressionMode || isExpressionString(display);

    if (inExpr) {
      set({
        display: appendDigit(display, digit),
        expressionMode: true,
        waitingForOperand: false,
      });
      return;
    }

    if (waitingForOperand) {
      set({ display: digit, waitingForOperand: false });
      return;
    }
    set({ display: appendDigit(display, digit) });
  },

  inputDecimal: () => {
    const { display, waitingForOperand, expressionMode } = get();
    const inExpr = expressionMode || isExpressionString(display);

    if (inExpr) {
      set({
        display: appendDecimal(display),
        expressionMode: true,
        waitingForOperand: false,
      });
      return;
    }

    if (waitingForOperand) {
      set({ display: "0.", waitingForOperand: false });
      return;
    }
    set({ display: appendDecimal(display) });
  },

  clear: () =>
    set({
      display: "0",
      previousValue: null,
      operator: null,
      waitingForOperand: false,
      expressionMode: false,
    }),

  backspace: () => {
    const { display } = get();
    if (display === "Error" || display.length <= 1) {
      set({ display: "0", expressionMode: false });
      return;
    }
    const next = display.slice(0, -1);
    set({
      display: next || "0",
      expressionMode: isExpressionString(next),
    });
  },

  toggleSign: () => {
    const { display, expressionMode } = get();
    if (expressionMode || isExpressionString(display)) {
      set({
        display:
          display.startsWith("(") || display.startsWith("-")
            ? display
            : `(-${display})`,
        expressionMode: true,
      });
      return;
    }
    set((s) => ({ display: toggleSign(s.display) }));
  },

  percentage: () => set((s) => ({ display: applyPercentage(s.display) })),

  insertScientific: (token) => {
    const { display } = get();

    if (token === "square") {
      set({
        display: appendSquareToExpression(display),
        expressionMode: true,
        waitingForOperand: false,
        previousValue: null,
        operator: null,
      });
      return;
    }

    const text = SCIENTIFIC_DISPLAY[token];
    set({
      display: appendToExpression(display, text),
      expressionMode: true,
      waitingForOperand: false,
      previousValue: null,
      operator: null,
    });
  },

  chooseOperator: (op) => {
    const { display } = get();
    const symbol = OP_SYMBOLS[op];

    set({
      display: replaceOrAppendOperator(display, symbol),
      expressionMode: true,
      waitingForOperand: false,
      previousValue: null,
      operator: null,
    });
  },

  calculateResult: () => {
    const { display, previousValue, operator, history, expressionMode, angleMode } =
      get();
    const inExpr = expressionMode || isExpressionString(display);

    if (inExpr) {
      const { result, error } = evaluateExpression(display, angleMode);
      if (error || result === undefined) {
        set({
          display: "Error",
          expressionMode: false,
          waitingForOperand: true,
          history: addHistory(history, display, "Error"),
        });
        return;
      }
      const next = formatNumber(result);
      set({
        display: next,
        previousValue: null,
        operator: null,
        waitingForOperand: true,
        expressionMode: false,
        history: addHistory(history, display, next),
      });
      return;
    }

    if (previousValue === null || !operator) return;

    const a = parseDisplay(previousValue);
    const b = parseDisplay(display);
    const expression = `${previousValue} ${operator} ${display}`;
    const { result, error } = calculate(a, b, operator);

    if (error) {
      set({
        display: "Error",
        previousValue: null,
        operator: null,
        waitingForOperand: true,
        history: addHistory(history, expression, "Error"),
      });
      return;
    }

      const next = formatNumber(result);
      set({
        display: next,
        previousValue: null,
        operator: null,
        waitingForOperand: true,
        history: addHistory(history, expression, next),
      });
  },

  memoryClear: () => set({ memory: 0, hasMemory: false }),

  memoryRecall: () => {
    const { memory, hasMemory } = get();
    if (!hasMemory) {
      set({
        display: "0",
        waitingForOperand: false,
        expressionMode: false,
        previousValue: null,
        operator: null,
      });
      return;
    }
    set({
      display: formatNumber(memory),
      waitingForOperand: false,
      expressionMode: false,
      previousValue: null,
      operator: null,
    });
  },

  memoryAdd: () => {
    const state = get();
    const value = getDisplayNumericValue(state);
    if (value === null) return;

    const base = state.hasMemory ? state.memory : 0;
    set({
      memory: base + value,
      hasMemory: true,
      waitingForOperand: true,
    });
  },

  memorySubtract: () => {
    const state = get();
    const value = getDisplayNumericValue(state);
    if (value === null) return;

    const base = state.hasMemory ? state.memory : 0;
    set({
      memory: base - value,
      hasMemory: true,
      waitingForOperand: true,
    });
  },
}));
