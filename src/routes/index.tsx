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
  destacados: "activo" | "no" | "none";
  elite: "activo" | "no";
  prime: "activo" | "no" | "none";
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
  { mes: "Mayo 2025", destacados: "none", elite: "no", prime: "none", oi: "no", estado: "no_aplica" },
  { mes: "Junio 2025", destacados: "activo", elite: "activo", prime: "activo", oi: "activo", estado: "adquirido" },
  { mes: "Julio 2025", destacados: "activo", elite: "no", prime: "activo", oi: "activo", estado: "proximo" },
  { mes: "Agosto 2025", destacados: "none", elite: "no", prime: "none", oi: "activo", estado: "adquirido" },
  { mes: "Septiembre 2025", destacados: "none", elite: "no", prime: "none", oi: "no", estado: "no_aplica" },
  { mes: "Octubre 2025", destacados: "none", elite: "no", prime: "none", oi: "no", estado: "no_aplica" },
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
    <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-card px-3 py-2.5 text-sm">
      <div className="flex min-w-[140px] items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
      <div className="flex flex-1 items-center justify-end gap-2 text-right text-foreground">
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

function ProductFeatureToggle({
  icon: Icon,
  label,
  defaultOn = true,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-border bg-card px-3 py-2.5 text-sm">
      <div className="flex items-center gap-2 text-foreground">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span>{label}</span>
      </div>
      <Switch checked={on} onCheckedChange={setOn} />
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
    <div className="rounded-md border border-border bg-card px-4 py-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className={`text-2xl font-semibold ${warning ? "text-amber-600" : "text-primary"}`}>
          {value}
        </span>
        {hint ? (
          <Badge variant="secondary" className="text-xs text-muted-foreground">
            {hint}
          </Badge>
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
          variant="outline"
          size="sm"
          className="border-primary text-primary hover:bg-primary/10 hover:text-primary"
        >
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
          <div className="col-span-2 space-y-1">
            <Label>Email contacto</Label>
            <Input value={draft.emailContacto} onChange={(e) => setDraft({ ...draft, emailContacto: e.target.value })} />
          </div>
          <div className="col-span-2 space-y-1">
            <Label>Email de la cuenta</Label>
            <Input value={draft.emailCuenta} onChange={(e) => setDraft({ ...draft, emailCuenta: e.target.value })} />
          </div>
          <div className="space-y-1">
            <Label>Tel contacto</Label>
            <Input value={draft.telContacto} onChange={(e) => setDraft({ ...draft, telContacto: e.target.value })} />
          </div>
          <div className="space-y-1">
            <Label>WhatsApp</Label>
            <Input value={draft.whatsapp} onChange={(e) => setDraft({ ...draft, whatsapp: e.target.value })} />
          </div>
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
              onSave(draft);
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

  const hasResults = !!searched;
  const productosExpirar: PcomRow[] = PCOM_ROWS;

  return (
    <div className="min-h-screen bg-muted/30 px-4 py-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-4">
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
          <Accordion
            type="multiple"
            defaultValue={["contacto", "pcom", "productos"]}
            className="flex flex-col gap-4"
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
                    <Switch checked={feedOn} onCheckedChange={setFeedOn} />
                    <span className="ml-3 text-xs text-muted-foreground">Nombre Feed</span>
                    <span className="font-medium">{feedOn ? contact.nombreFeed : "No aplica"}</span>
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
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
                  <ProductFeatureToggle icon={Zap} label="LI - Leads ilimitados" />
                  <ProductFeatureToggle icon={InfinityIcon} label="Oi - Oportunidades ilimitadas" />
                  <ProductFeatureToggle icon={Star} label="Destacados" />
                  <ProductFeatureToggle icon={Crown} label="Prime" />
                  <ProductFeatureToggle icon={Gem} label="Elite" />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
                  <StatCard label="Total propiedades" value={30} />
                  <StatCard label="Total propiedades activas" value={25} />
                  <StatCard label="Total propiedades activas de tipo residencial" value={23} />
                  <StatCard label="Total de slots vacíos sin asignación" value={4} />
                  <StatCard label="Total propiedades destacadas" value={17} />
                  <StatCard label="Total propiedades fuera de mercado" value={1} />
                  <StatCard label="Score promedio" value="78%" hint="> 80" warning />
                  <StatCard label="Promedio de inventario activo" value={200} />
                </div>

                <div className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
                  <div className="rounded-md border border-border bg-card px-4 py-3">
                    <p className="text-xs text-muted-foreground">Zona principal de publicación</p>
                    <p className="mt-1 text-base font-semibold text-primary">Polanco</p>
                  </div>
                  <div className="rounded-md border border-border bg-card px-4 py-3">
                    <p className="text-xs text-muted-foreground">Fecha de la última publicación</p>
                    <p className="mt-1 text-base font-semibold text-primary">23-06-2025</p>
                  </div>
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
                          <TableHead>Destacados [5]</TableHead>
                          <TableHead>Elite</TableHead>
                          <TableHead>Prime [3]</TableHead>
                          <TableHead>Oi</TableHead>
                          <TableHead>Estado</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {productosExpirar.map((r) => (
                          <TableRow key={r.mes}>
                            <TableCell className="font-medium">{r.mes}</TableCell>
                            <TableCell>
                              <ActivoCell value={r.destacados} />
                            </TableCell>
                            <TableCell>
                              <ActivoCell value={r.elite} />
                            </TableCell>
                            <TableCell>
                              <ActivoCell value={r.prime} />
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
        )}

        <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5" />
          La información mostrada corresponde al estado actual del anunciante en Propiedades.com.
        </p>
      </div>
    </div>
  );
}