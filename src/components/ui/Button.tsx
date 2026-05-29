import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-cyan-600 text-white hover:bg-cyan-500",
  secondary:
    "border border-[var(--border)] bg-slate-100 text-foreground hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10",
  ghost: "text-foreground hover:bg-black/5 dark:hover:bg-white/5",
};

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }
>(function Button({ className, variant = "primary", ...props }, ref) {
  return (
    <button
      ref={ref}
      className={cn(
        "rounded-xl px-4 py-2 text-sm font-medium transition disabled:opacity-50",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
});
