"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCalculatorStore } from "@/store/calculatorStore";

const opClass =
  "bg-cyan-500/25 text-cyan-900 ring-1 ring-cyan-600/25 hover:bg-cyan-500/35 dark:text-cyan-100 dark:ring-cyan-400/20";
const numClass =
  "bg-slate-200/90 text-foreground hover:bg-slate-300/90 dark:bg-white/5 dark:hover:bg-white/10";
const memClass =
  "bg-amber-500/25 text-amber-950 hover:bg-amber-500/35 dark:text-amber-100";
const sciClass =
  "bg-violet-500/25 text-violet-950 hover:bg-violet-500/35 text-sm dark:text-violet-100";

type KeyDef = {
  label: string;
  action: () => void;
  className?: string;
  aria?: string;
  colSpan?: number;
};

function KeyButton({ keyDef }: { keyDef: KeyDef }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={keyDef.action}
      aria-label={keyDef.aria ?? keyDef.label}
      className={cn(
        "flex h-12 items-center justify-center rounded-xl font-medium sm:h-14 sm:rounded-2xl sm:text-lg",
        keyDef.colSpan === 2 && "col-span-2",
        keyDef.colSpan === 4 && "col-span-4",
        keyDef.className,
      )}
    >
      {keyDef.label}
    </motion.button>
  );
}

function KeyRow({ keys }: { keys: KeyDef[] }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {keys.map((key) => (
        <KeyButton key={key.label} keyDef={key} />
      ))}
    </div>
  );
}

export function CalculatorKeypad() {
  const store = useCalculatorStore();
  const scientificOpen = useCalculatorStore((s) => s.scientificOpen);

  const memoryRow: KeyDef[] = [
    { label: "MC", action: store.memoryClear, className: memClass },
    { label: "MR", action: store.memoryRecall, className: memClass },
    { label: "M+", action: store.memoryAdd, className: memClass },
    { label: "M-", action: store.memorySubtract, className: memClass },
  ];

  const scientificRows: KeyDef[][] = [
    [
      { label: "sin", action: () => store.insertScientific("sin"), className: sciClass },
      { label: "cos", action: () => store.insertScientific("cos"), className: sciClass },
      { label: "tan", action: () => store.insertScientific("tan"), className: sciClass },
      { label: "π", action: () => store.insertScientific("pi"), className: sciClass },
    ],
    [
      { label: "√", action: () => store.insertScientific("sqrt"), className: sciClass },
      { label: "x²", action: () => store.insertScientific("square"), className: sciClass },
      { label: "1/x", action: () => store.insertScientific("reciprocal"), className: sciClass },
    ],
  ];

  const topRow: KeyDef[] = [
    {
      label: "C",
      action: store.clear,
      className: "bg-rose-500/25 text-rose-900 hover:bg-rose-500/35 dark:text-rose-100",
    },
    { label: "⌫", action: store.backspace, aria: "Backspace", className: numClass },
    { label: "±", action: store.toggleSign, className: numClass },
    { label: "%", action: store.percentage, className: numClass },
  ];

  const numberPad: KeyDef[][] = [
    [
      { label: "7", action: () => store.inputDigit("7"), className: numClass },
      { label: "8", action: () => store.inputDigit("8"), className: numClass },
      { label: "9", action: () => store.inputDigit("9"), className: numClass },
      { label: "÷", action: () => store.chooseOperator("/"), className: opClass },
    ],
    [
      { label: "4", action: () => store.inputDigit("4"), className: numClass },
      { label: "5", action: () => store.inputDigit("5"), className: numClass },
      { label: "6", action: () => store.inputDigit("6"), className: numClass },
      { label: "×", action: () => store.chooseOperator("*"), className: opClass },
    ],
    [
      { label: "1", action: () => store.inputDigit("1"), className: numClass },
      { label: "2", action: () => store.inputDigit("2"), className: numClass },
      { label: "3", action: () => store.inputDigit("3"), className: numClass },
      { label: "−", action: () => store.chooseOperator("-"), className: opClass },
    ],
    [
      {
        label: "0",
        action: () => store.inputDigit("0"),
        className: numClass,
        colSpan: 2,
      },
      { label: ".", action: store.inputDecimal, className: numClass },
      { label: "+", action: () => store.chooseOperator("+"), className: opClass },
    ],
  ];

  const equalsRow: KeyDef[] = [
    {
      label: "=",
      action: store.calculateResult,
      className:
        "bg-gradient-to-r from-cyan-600 to-blue-700 text-white hover:from-cyan-500 hover:to-blue-600",
      colSpan: 4,
    },
  ];

  return (
    <div className="space-y-2">
      <KeyRow keys={memoryRow} />

      {scientificOpen &&
        scientificRows.map((row, i) => <KeyRow key={`sci-${i}`} keys={row} />)}

      <KeyRow keys={topRow} />

      {numberPad.map((row, i) => (
        <KeyRow key={`num-${i}`} keys={row} />
      ))}

      <KeyRow keys={equalsRow} />
    </div>
  );
}
