import type { ComponentType } from "react";
import { Switch } from "@/components/ui/switch";

export function ProductFeatureToggle({
  icon: Icon,
  label,
  defaultOn = true,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  defaultOn?: boolean;
}) {
  const on = defaultOn;
  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-md border px-2.5 py-2 text-sm transition-colors ${
        on ? "border-emerald-500/30 bg-emerald-500/5" : "border-border bg-muted/30"
      }`}
    >
      <div className="flex min-w-0 items-center gap-2 text-foreground">
        <Icon className={`h-4 w-4 shrink-0 ${on ? "text-emerald-600" : "text-muted-foreground"}`} />
        <span className="truncate font-medium">{label}</span>
      </div>
      <Switch
        checked={on}
        disabled
        aria-readonly
        title="Información de solo lectura"
        className="pointer-events-none data-[state=checked]:bg-emerald-500 disabled:cursor-default disabled:opacity-100"
      />
    </div>
  );
}