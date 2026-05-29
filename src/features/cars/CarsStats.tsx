import { formatNumber } from "@/lib/utils";

export function CarsStats({
  total,
  showing,
}: {
  total: number;
  showing: number;
}) {
  return (
    <p className="text-sm text-muted">
      Showing <span className="text-foreground">{formatNumber(showing)}</span> of{" "}
      <span className="text-foreground">{formatNumber(total)}</span> vehicles
    </p>
  );
}
