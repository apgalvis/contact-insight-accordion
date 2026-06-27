import type { ComponentType, ReactNode } from "react";

export function FieldRow({
  icon: Icon,
  label,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-border bg-muted/30 px-3 py-2 text-sm">
      <div className="flex w-[140px] shrink-0 items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <span>{label}</span>
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-end gap-2 text-right text-foreground">
        {children}
      </div>
    </div>
  );
}