"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCalculatorStore } from "@/store/calculatorStore";

export function HistoryPanel() {
  const historyOpen = useCalculatorStore((s) => s.historyOpen);
  const setHistoryOpen = useCalculatorStore((s) => s.setHistoryOpen);
  const history = useCalculatorStore((s) => s.history);

  return (
    <AnimatePresence>
      {historyOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close history"
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setHistoryOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col border-l border-[var(--border)] bg-surface/95 p-5 shadow-2xl backdrop-blur-xl"
            aria-label="Calculation history"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">History</h2>
              <button
                type="button"
                className="rounded-lg px-2 py-1 text-sm text-muted hover:text-foreground lg:hidden"
                onClick={() => setHistoryOpen(false)}
              >
                Close
              </button>
            </div>
            <ul className="flex-1 space-y-3 overflow-y-auto">
              {history.length === 0 ? (
                <li className="text-sm text-muted">No calculations yet</li>
              ) : (
                history.map((entry) => (
                  <li
                    key={entry.id}
                    className="rounded-xl border border-[var(--border)] bg-slate-100 p-3 dark:bg-white/5"
                  >
                    <p className="text-xs text-muted">{entry.expression}</p>
                    <p className="font-mono text-lg font-medium">= {entry.result}</p>
                  </li>
                ))
              )}
            </ul>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
