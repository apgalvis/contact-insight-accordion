import { CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { PcomRow } from "../types";

export function OtpBadge({ verified }: { verified: boolean }) {
  const base =
    "inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide";
  return verified ? (
    <span title="Verificado OTP" className={`${base} border-emerald-500/30 bg-emerald-500/10 text-emerald-600`}>
      <CheckCircle2 className="h-3 w-3" /> OTP
    </span>
  ) : (
    <span title="Sin verificar OTP" className={`${base} border-destructive/30 bg-destructive/10 text-destructive`}>
      <XCircle className="h-3 w-3" /> OTP
    </span>
  );
}

export function EstadoBadge({ estado }: { estado: PcomRow["estado"] }) {
  if (estado === "adquirido")
    return <Badge className="bg-primary/15 text-primary hover:bg-primary/15">Adquirido</Badge>;
  if (estado === "proximo")
    return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Próximo a vencer</Badge>;
  return (
    <Badge variant="secondary" className="text-muted-foreground">
      No aplica
    </Badge>
  );
}

export function ActivoCell({ value }: { value: "activo" | "no" | "none" }) {
  if (value === "activo")
    return <Badge className="bg-primary/15 text-primary hover:bg-primary/15">Activo</Badge>;
  if (value === "no") return <span className="text-sm text-muted-foreground">No</span>;
  return <span className="text-sm text-muted-foreground">—</span>;
}

export function QtyCell({ value }: { value: number | null }) {
  if (value === null || value === 0) return <span className="text-sm text-muted-foreground">—</span>;
  return (
    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10">
      {value}
    </Badge>
  );
}