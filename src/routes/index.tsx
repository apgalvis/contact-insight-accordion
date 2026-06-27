import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  IdCard,
  User,
  UserSquare2,
  Mail,
  Phone,
  MessageCircle,
  Rss,
  Building2,
  Briefcase,
  CheckCircle2,
  XCircle,
  Zap,
  Infinity as InfinityIcon,
  Star,
  Crown,
  Gem,
  AlertTriangle,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Buscador de cliente" },
      { name: "description", content: "Consulta información del anunciante en Propiedades.com" },
    ],
  }),
  component: Index,
});

type ContactInfo = {
  id: string;
  nombre: string;
  apellido: string;
  emailContacto: string;
  emailContactoOtp: boolean;
  emailCuenta: string;
  emailCuentaOtp: boolean;
  telContacto: string;
  telContactoOtp: boolean;
  whatsapp: string;
  whatsappOtp: boolean;
  nombreFeed: string;
  tipoBroker: string;
  gestorComercial: string;
};

type PcomRow = {
  mes: string;
  destacados: number | null;
  elite: "activo" | "no";
  prime: number | null;
  oi: "activo" | "no";
  estado: "adquirido" | "proximo" | "no_aplica";
};

const DEFAULT_CONTACT: ContactInfo = {
  id: "#1342345324",
  nombre: "Paola",
  apellido: "Galvis",
  emailContacto: "paola.galvis@propiedades.com",
  emailContactoOtp: true,
  emailCuenta: "angiegalvis@habi.co",
  emailCuentaOtp: true,
  telContacto: "3108605038",
  telContactoOtp: true,
  whatsapp: "3108605038",
  whatsappOtp: true,
  nombreFeed: "EasyBroker",
  tipoBroker: "Medium broker",
  gestorComercial: "lizzett.benitez@propiedades.com",
};

const PCOM_ROWS: PcomRow[] = [
  { mes: "Mayo 2025", destacados: null, elite: "no", prime: null, oi: "no", estado: "no_aplica" },
  { mes: "Junio 2025", destacados: 5, elite: "activo", prime: 3, oi: "activo", estado: "adquirido" },
  { mes: "Julio 2025", destacados: 8, elite: "no", prime: 2, oi: "activo", estado: "proximo" },
  { mes: "Agosto 2025", destacados: 4, elite: "no", prime: null, oi: "activo", estado: "adquirido" },
  { mes: "Septiembre 2025", destacados: 2, elite: "no", prime: 1, oi: "no", estado: "proximo" },
  { mes: "Octubre 2025", destacados: null, elite: "no", prime: null, oi: "no", estado: "no_aplica" },
];

function OtpBadge({ verified }: { verified: boolean }) {
  return verified ? (
    <span
      title="Verificado OTP"
      className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-600"
    >
      <CheckCircle2 className="h-3 w-3" /> OTP
    </span>
  ) : (
    <span
      title="Sin verificar OTP"
      className="inline-flex items-center gap-1 rounded-full border border-destructive/30 bg-destructive/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-destructive"
    >
      <XCircle className="h-3 w-3" /> OTP
    </span>
  );
}

function FieldRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
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

function EstadoBadge({ estado }: { estado: PcomRow["estado"] }) {
  if (estado === "adquirido")
    return <Badge className="bg-primary/15 text-primary hover:bg-primary/15">Adquirido</Badge>;
  if (estado === "proximo")
    return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Próximo a vencer</Badge>;
  return <Badge variant="secondary" className="text-muted-foreground">No aplica</Badge>;
}

function ActivoCell({ value }: { value: "activo" | "no" | "none" }) {
  if (value === "activo")
    return <Badge className="bg-primary/15 text-primary hover:bg-primary/15">Activo</Badge>;
  if (value === "no") return <span className="text-sm text-muted-foreground">No</span>;
  return <span className="text-sm text-muted-foreground">—</span>;
}

function QtyCell({ value }: { value: number | null }) {
  if (value === null || value === 0)
    return <span className="text-sm text-muted-foreground">—</span>;
  return (
    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/10">
      {value}
    </Badge>
  );
}

function ProductFeatureToggle({
  icon: Icon,
  label,
  defaultOn = true,
}: {
  icon: React.ComponentType<{ className?: string }>;
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

function StatCard({
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
        {hint ? (
          <span className="text-[10px] font-medium text-muted-foreground">{hint}</span>
        ) : null}
      </div>
    </div>
  );
}

function EditProfileDialog({
  contact,
  onSave,
}: {
  contact: ContactInfo;
  onSave: (c: ContactInfo) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(contact);

  const otpFields: {
    key: keyof ContactInfo;
    label: string;
    otpKey: keyof ContactInfo;
    colSpan?: boolean;
  }[] = [
    { key: "emailContacto", label: "Email contacto", otpKey: "emailContactoOtp", colSpan: true },
    { key: "emailCuenta", label: "Email de la cuenta", otpKey: "emailCuentaOtp", colSpan: true },
    { key: "telContacto", label: "Tel contacto", otpKey: "telContactoOtp" },
    { key: "whatsapp", label: "WhatsApp", otpKey: "whatsappOtp" },
  ];

  function renderOtpField(f: (typeof otpFields)[number]) {
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

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (o) setDraft(contact);
      }}
    >
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="gap-1.5 bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
        >
          <User className="h-4 w-4" />
          Editar perfil
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar contacto básico</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label>Nombre</Label>
            <Input value={draft.nombre} onChange={(e) => setDraft({ ...draft, nombre: e.target.value })} />
          </div>
          <div className="space-y-1">
            <Label>Apellido</Label>
            <Input value={draft.apellido} onChange={(e) => setDraft({ ...draft, apellido: e.target.value })} />
          </div>
          {otpFields.map(renderOtpField)}
          <div className="space-y-1">
            <Label>Nombre Feed</Label>
            <Input value={draft.nombreFeed} onChange={(e) => setDraft({ ...draft, nombreFeed: e.target.value })} />
          </div>
          <div className="space-y-1">
            <Label>Tipo de broker</Label>
            <Input value={draft.tipoBroker} onChange={(e) => setDraft({ ...draft, tipoBroker: e.target.value })} />
          </div>
          <div className="col-span-2 space-y-1">
            <Label>Gestor comercial</Label>
            <Input value={draft.gestorComercial} onChange={(e) => setDraft({ ...draft, gestorComercial: e.target.value })} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={() => {
              const next: ContactInfo = { ...draft };
              if (draft.emailContacto !== contact.emailContacto) next.emailContactoOtp = false;
              if (draft.emailCuenta !== contact.emailCuenta) next.emailCuentaOtp = false;
              if (draft.telContacto !== contact.telContacto) next.telContactoOtp = false;
              if (draft.whatsapp !== contact.whatsapp) next.whatsappOtp = false;
              onSave(next);
              setOpen(false);
            }}
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Index() {
  const [query, setQuery] = useState("angiegalvis@habi.co");
  const [searched, setSearched] = useState<string | null>("angiegalvis@habi.co");
  const [contact, setContact] = useState<ContactInfo>(DEFAULT_CONTACT);
  const [feedOn, setFeedOn] = useState(true);
  const [defaultSection, setDefaultSection] = useState<"contacto" | "pcom" | "productos">(
    "contacto",
  );
  const [openSection, setOpenSection] = useState<string>("contacto");

  function handleDefaultChange(v: "contacto" | "pcom" | "productos") {
    setDefaultSection(v);
    setOpenSection(v);
  }

  const hasResults = !!searched;
  const productosExpirar: PcomRow[] = PCOM_ROWS;

  return (
    <div className="min-h-screen bg-muted/30 px-4 py-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-3">
        {/* Search */}
        <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
            <Search className="h-4 w-4" />
            Buscar cliente
          </div>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setSearched(query.trim() || null);
            }}
          >
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="correo@cliente.com"
              className="h-11"
            />
            <Button type="submit" className="h-11 px-6">
              Buscar
            </Button>
          </form>
        </div>

        {!hasResults ? (
          <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
            Busca un correo para ver la información del anunciante.
          </div>
        ) : (
          <Accordion type="single" collapsible defaultValue="anunciante">
            <AccordionItem
              value="anunciante"
              className="rounded-lg border border-border bg-card px-4 shadow-sm"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-base font-semibold">
                    Información del anunciante · {searched}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="mb-3 flex flex-wrap items-center justify-end gap-2 pt-1 text-sm">
                  <Label className="text-xs font-medium text-muted-foreground">
                    Sección expandida por defecto
                  </Label>
                  <Select value={defaultSection} onValueChange={(v) => handleDefaultChange(v as typeof defaultSection)}>
                    <SelectTrigger className="h-8 w-[220px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contacto">Contacto básico</SelectItem>
                      <SelectItem value="pcom">Información PCOM</SelectItem>
                      <SelectItem value="productos">Productos a expirar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Accordion
                  type="single"
                  collapsible
                  value={openSection}
                  onValueChange={(v) => setOpenSection(v)}
                  className="flex flex-col gap-3"
                >
            {/* 1. Contacto básico */}
            <AccordionItem value="contacto" className="rounded-lg border border-border bg-card px-4 shadow-sm">
              <div className="flex items-center justify-between gap-2 pt-2">
                <AccordionTrigger className="flex-1 hover:no-underline">
                  <span className="text-base font-semibold">Contacto básico</span>
                </AccordionTrigger>
                <div onClick={(e) => e.stopPropagation()}>
                  <EditProfileDialog contact={contact} onSave={setContact} />
                </div>
              </div>
              <AccordionContent>
                <div className="grid grid-cols-1 gap-2 pt-2 md:grid-cols-2">
                  <FieldRow icon={IdCard} label="ID">
                    {contact.id}
                  </FieldRow>
                  <FieldRow icon={Phone} label="Tel contacto">
                    <span>{contact.telContacto}</span>
                    <OtpBadge verified={contact.telContactoOtp} />
                  </FieldRow>
                  <FieldRow icon={User} label="Nombre">
                    {contact.nombre}
                  </FieldRow>
                  <FieldRow icon={MessageCircle} label="Whatsapp">
                    <span>{contact.whatsapp}</span>
                    <OtpBadge verified={contact.whatsappOtp} />
                  </FieldRow>
                  <FieldRow icon={UserSquare2} label="Apellido">
                    {contact.apellido}
                  </FieldRow>
                  <FieldRow icon={Rss} label="Feed">
                    <span className="font-medium">
                      {feedOn ? contact.nombreFeed : "No aplica"}
                    </span>
                    <TooltipProvider delayDuration={150}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span tabIndex={0} className="inline-flex">
                            <Switch
                              checked={feedOn}
                              onCheckedChange={setFeedOn}
                              className="data-[state=checked]:bg-emerald-500"
                            />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          {feedOn
                            ? "Feed activo: se está sincronizando inventario"
                            : "Feed inactivo: no hay sincronización de inventario"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FieldRow>
                  <FieldRow icon={Mail} label="Email contacto">
                    <span className="truncate">{contact.emailContacto}</span>
                    <OtpBadge verified={contact.emailContactoOtp} />
                  </FieldRow>
                  <FieldRow icon={Building2} label="Tipo de broker">
                    {contact.tipoBroker}
                  </FieldRow>
                  <FieldRow icon={Mail} label="Email de la cuenta">
                    <span className="truncate">{contact.emailCuenta}</span>
                    <OtpBadge verified={contact.emailCuentaOtp} />
                  </FieldRow>
                  <FieldRow icon={Briefcase} label="Gestor comercial">
                    <span className="truncate">{contact.gestorComercial}</span>
                  </FieldRow>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 2. Información PCOM */}
            <AccordionItem value="pcom" className="rounded-lg border border-border bg-card px-4 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                <span className="text-base font-semibold">Información PCOM</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                  <ProductFeatureToggle icon={Zap} label="LI - Leads ilimitados" defaultOn={false} />
                  <ProductFeatureToggle icon={InfinityIcon} label="Oi - Oportunidades ilimitadas" />
                  <ProductFeatureToggle icon={Star} label="Destacados" />
                  <ProductFeatureToggle icon={Crown} label="Prime" defaultOn={false} />
                  <ProductFeatureToggle icon={Gem} label="Elite" defaultOn={false} />
                </div>

                <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
                  <StatCard label="Total propiedades" value={30} />
                  <StatCard label="Total propiedades activas" value={25} />
                  <StatCard label="Activas residenciales" value={23} />
                  <StatCard label="Slots vacíos sin asignación" value={4} />
                  <StatCard label="Total propiedades destacadas" value={17} />
                  <StatCard label="Fuera de mercado" value={1} />
                  <StatCard label="Score promedio" value="78%" hint="Meta ≥ 80%" warning />
                  <StatCard label="Promedio de inventario activo" value={200} />
                </div>

                <div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
                  <StatCard label="Zona principal de publicación" value="Polanco" />
                  <StatCard label="Fecha última publicación" value="23-06-2025" />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 3. Productos a expirar */}
            <AccordionItem value="productos" className="rounded-lg border border-border bg-card px-4 shadow-sm">
              <AccordionTrigger className="hover:no-underline">
                <span className="text-base font-semibold">Productos a expirar</span>
              </AccordionTrigger>
              <AccordionContent>
                {productosExpirar.length === 0 ? (
                  <p className="py-6 text-center text-sm text-muted-foreground">No aplica</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Mes</TableHead>
                          <TableHead>Destacados</TableHead>
                          <TableHead>Elite</TableHead>
                          <TableHead>Prime</TableHead>
                          <TableHead>Oi</TableHead>
                          <TableHead>Estado</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {productosExpirar.map((r) => (
                          <TableRow key={r.mes}>
                            <TableCell className="font-medium">{r.mes}</TableCell>
                            <TableCell>
                              <QtyCell value={r.destacados} />
                            </TableCell>
                            <TableCell>
                              <ActivoCell value={r.elite} />
                            </TableCell>
                            <TableCell>
                              <QtyCell value={r.prime} />
                            </TableCell>
                            <TableCell>
                              <ActivoCell value={r.oi} />
                            </TableCell>
                            <TableCell>
                              <EstadoBadge estado={r.estado} />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5" />
          La información mostrada corresponde al estado actual del anunciante en Propiedades.com.
        </p>
      </div>
    </div>
  );
}