export function StatCard({
  label,
  value,
  hint,
  warning = false,
}: {
  label: string;
  value: string | number;
  hint?: string;
  warning?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm ${
        warning ? "border-amber-300/60 bg-amber-50/60" : "border-border bg-muted/30"
      }`}
    >
      <p className="min-w-0 flex-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="flex shrink-0 items-baseline gap-1.5">
        <span className={`text-base font-semibold ${warning ? "text-amber-700" : "text-primary"}`}>
          {value}
        </span>
        {hint ? <span className="text-[10px] font-medium text-muted-foreground">{hint}</span> : null}
      </div>
    </div>
  );
}