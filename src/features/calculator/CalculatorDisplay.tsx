"use client";

import { formatNumber } from "@/utils/calculator";
import { useCalculatorStore } from "@/store/calculatorStore";

export function CalculatorDisplay() {
  const display = useCalculatorStore((s) => s.display);
  const hasMemory = useCalculatorStore((s) => s.hasMemory);
  const memory = useCalculatorStore((s) => s.memory);
  const scientificOpen = useCalculatorStore((s) => s.scientificOpen);
  const angleMode = useCalculatorStore((s) => s.angleMode);

  return (
    <div
      className="glass mb-4 rounded-2xl p-4 text-right"
      aria-live="polite"
      aria-label="Calculator display"
    >
      <div className="min-h-5 flex items-center justify-end gap-2 text-xs text-muted">
        <span className="flex shrink-0 gap-2">
          {scientificOpen && (
            <span className="uppercase" aria-label="Angle unit">
              {angleMode}
            </span>
          )}
          {hasMemory && (
            <span aria-label={`Memory value ${formatNumber(memory)}`}>
              M&nbsp;{formatNumber(memory)}
            </span>
          )}
        </span>
      </div>
      <p
        data-testid="calc-display"
        className="break-all font-mono text-2xl font-semibold tabular-nums sm:text-3xl"
      >
        {display}
      </p>
    </div>
  );
}
