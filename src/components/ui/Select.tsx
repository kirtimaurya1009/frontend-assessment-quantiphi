import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(
        "w-full rounded-xl border border-[var(--border)] bg-slate-100 px-4 py-2.5 text-sm text-foreground backdrop-blur-sm transition focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/25 dark:bg-white/5 dark:focus:border-cyan-400/50 dark:focus:ring-cyan-400/20",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
});
