import { useState } from "react";
import { AlertTriangle, Loader2, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ContactInfo } from "../types";
import { OtpBadge } from "./badges";
import { saveContact } from "../api";

type OtpField = {
  key: keyof ContactInfo;
  label: string;
  otpKey: keyof ContactInfo;
  colSpan?: boolean;
};

const OTP_FIELDS: OtpField[] = [
  { key: "emailContacto", label: "Email contacto", otpKey: "emailContactoOtp", colSpan: true },
  { key: "telContacto", label: "Tel contacto", otpKey: "telContactoOtp" },
  { key: "whatsapp", label: "WhatsApp", otpKey: "whatsappOtp" },
];

const READONLY_FIELDS: { key: keyof ContactInfo; label: string; colSpan?: boolean; otpKey?: keyof ContactInfo }[] = [
  { key: "id", label: "ID", colSpan: true },
  { key: "emailCuenta", label: "Email de la cuenta", colSpan: true, otpKey: "emailCuentaOtp" },
  { key: "nombreFeed", label: "Nombre Feed" },
  { key: "tipoBroker", label: "Tipo de broker" },
];

function ReadonlyField({
  label,
  value,
  colSpan,
  otpVerified,
}: {
  label: string;
  value: string;
  colSpan?: boolean;
  otpVerified?: boolean;
}) {
  return (
    <div className={`${colSpan ? "col-span-2 " : ""}space-y-1`}>
      <div className="flex items-center justify-between gap-2">
        <Label className="flex items-center gap-1.5 text-muted-foreground">
          {label} <span className="text-[10px] uppercase tracking-wide">(no editable)</span>
        </Label>
        {otpVerified !== undefined ? <OtpBadge verified={otpVerified} /> : null}
      </div>
      <Input value={value} disabled className="bg-muted/40" />
    </div>
  );
}

export function EditProfileDialog({
  contact,
  onSave,
}: {
  contact: ContactInfo;
  onSave: (c: ContactInfo) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(contact);
  const [saving, setSaving] = useState(false);

  function renderOtpField(f: OtpField) {
    const currentValue = String(draft[f.key] ?? "");
    const originalValue = String(contact[f.key] ?? "");
    const originalVerified = Boolean(contact[f.otpKey]);
    const changed = currentValue !== originalValue;
    return (
      <div key={f.key} className={`${f.colSpan ? "col-span-2 " : ""}space-y-1`}>
        <div className="flex items-center justify-between gap-2">
          <Label>{f.label}</Label>
          {changed ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
              <AlertTriangle className="h-3 w-3" /> Requiere OTP
            </span>
          ) : (
            <OtpBadge verified={originalVerified} />
          )}
        </div>
        <Input
          value={currentValue}
          onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value } as ContactInfo)}
        />
        {changed ? (
          <p className="text-[11px] text-amber-700">
            Al cambiar este dato se enviará un nuevo código OTP para validar.
          </p>
        ) : null}
      </div>
    );
  }

  async function handleSave() {
    const next: ContactInfo = { ...draft };
    for (const f of OTP_FIELDS) {
      if (draft[f.key] !== contact[f.key]) (next[f.otpKey] as boolean) = false;
    }
    setSaving(true);
    try {
      const saved = await saveContact(next);
      onSave(saved);
      toast.success("Perfil actualizado correctamente.");
      setOpen(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "No se pudo guardar el perfil.";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (saving) return;
        setOpen(o);
        if (o) setDraft(contact);
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90">
          <User className="h-4 w-4" />
          Editar perfil
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar contacto básico</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3">
          <ReadonlyField label="ID" value={draft.id} colSpan />
          <div className="space-y-1">
            <Label>Nombre</Label>
            <Input value={draft.nombre} onChange={(e) => setDraft({ ...draft, nombre: e.target.value })} />
          </div>
          <div className="space-y-1">
            <Label>Apellido</Label>
            <Input value={draft.apellido} onChange={(e) => setDraft({ ...draft, apellido: e.target.value })} />
          </div>
          {OTP_FIELDS.map(renderOtpField)}
          <ReadonlyField
            label="Email de la cuenta"
            value={draft.emailCuenta}
            colSpan
            otpVerified={contact.emailCuentaOtp}
          />
          {READONLY_FIELDS.filter((f) => f.key !== "id" && f.key !== "emailCuenta").map((f) => (
            <ReadonlyField key={f.key} label={f.label} value={String(draft[f.key])} colSpan={f.colSpan} />
          ))}
          <div className="col-span-2 space-y-1">
            <Label>Gestor comercial</Label>
            <Input
              value={draft.gestorComercial}
              onChange={(e) => setDraft({ ...draft, gestorComercial: e.target.value })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={saving}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={saving} className="gap-1.5">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {saving ? "Guardando..." : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}