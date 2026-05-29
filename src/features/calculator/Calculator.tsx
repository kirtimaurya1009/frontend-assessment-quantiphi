"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useCalculatorStore } from "@/store/calculatorStore";
import type { AngleMode } from "@/types/calculator";
import { CalculatorDisplay } from "./CalculatorDisplay";
import { CalculatorKeypad } from "./CalculatorKeypad";
import { HistoryPanel } from "./HistoryPanel";
import { useCalculatorKeyboard } from "./useCalculatorKeyboard";

function AngleToggle({
  mode,
  onChange,
}: {
  mode: AngleMode;
  onChange: (mode: AngleMode) => void;
}) {
  return (
    <div
      className="flex rounded-lg border border-[var(--border)] p-0.5 text-xs"
      role="group"
      aria-label="Angle unit"
    >
      {(["deg", "rad"] as const).map((unit) => (
        <button
          key={unit}
          type="button"
          onClick={() => onChange(unit)}
          className={cn(
            "rounded-md px-2.5 py-1 font-medium uppercase transition",
            mode === unit
              ? "bg-cyan-500/25 font-medium text-cyan-900 dark:text-cyan-100"
              : "text-muted hover:text-foreground",
          )}
          aria-pressed={mode === unit}
        >
          {unit}
        </button>
      ))}
    </div>
  );
}

export function Calculator() {
  const setHistoryOpen = useCalculatorStore((s) => s.setHistoryOpen);
  const historyOpen = useCalculatorStore((s) => s.historyOpen);
  const toggleScientificOpen = useCalculatorStore((s) => s.toggleScientificOpen);
  const scientificOpen = useCalculatorStore((s) => s.scientificOpen);
  const angleMode = useCalculatorStore((s) => s.angleMode);
  const setAngleMode = useCalculatorStore((s) => s.setAngleMode);

  useCalculatorKeyboard();

  return (
    <div className="mx-auto max-w-md">
      <section className="glass rounded-3xl p-5 sm:p-6" aria-label="Calculator">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-xl font-semibold">Calculator</h1>
          <div className="flex flex-wrap items-center gap-2">
            {scientificOpen && (
              <AngleToggle mode={angleMode} onChange={setAngleMode} />
            )}
            <Button variant="secondary" type="button" onClick={toggleScientificOpen}>
              {scientificOpen ? "Basic" : "Sci"}
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={() => setHistoryOpen(!historyOpen)}
            >
              History
            </Button>
          </div>
        </div>

        <CalculatorDisplay />
        <CalculatorKeypad />

        <p className="mt-3 text-center text-xs text-muted">
          {scientificOpen
            ? `Trig: ${angleMode === "deg" ? "degrees" : "radians"} · `
            : ""}
          Keyboard: numbers, + - * /, Enter, Esc, Backspace
        </p>
      </section>

      <HistoryPanel />
    </div>
  );
}
