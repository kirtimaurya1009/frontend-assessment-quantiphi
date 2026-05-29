"use client";

import { useEffect } from "react";
import { useCalculatorStore } from "@/store/calculatorStore";
import type { Operator } from "@/types/calculator";

const operatorMap: Record<string, Exclude<Operator, null>> = {
  "+": "+",
  "-": "-",
  "*": "*",
  "/": "/",
};

export function useCalculatorKeyboard(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const store = useCalculatorStore.getState();
      const key = e.key;

      if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        store.inputDigit(key);
        return;
      }

      if (key === ".") {
        e.preventDefault();
        store.inputDecimal();
        return;
      }

      if (key in operatorMap) {
        e.preventDefault();
        store.chooseOperator(operatorMap[key]);
        return;
      }

      if (key === "Enter" || key === "=") {
        e.preventDefault();
        store.calculateResult();
        return;
      }

      if (key === "Escape") {
        e.preventDefault();
        store.clear();
        return;
      }

      if (key === "Backspace") {
        e.preventDefault();
        store.backspace();
        return;
      }

      if (key === "%") {
        e.preventDefault();
        store.percentage();
        return;
      }

      if (key.toLowerCase() === "r") {
        e.preventDefault();
        store.memoryRecall(); // bonus shortcut, not shown in UI
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [enabled]);
}
