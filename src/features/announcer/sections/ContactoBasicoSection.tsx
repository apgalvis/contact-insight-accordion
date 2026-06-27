import {
  Briefcase,
  Building2,
  IdCard,
  Mail,
  MessageCircle,
  Phone,
  Rss,
  User,
  UserSquare2,
} from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { OtpBadge } from "../components/badges";
import { EditProfileDialog } from "../components/EditProfileDialog";
import { FieldRow } from "../components/FieldRow";
import type { ContactInfo } from "../types";

export function ContactoBasicoSection({
  contact,
  onSave,
  feedOn,
  onFeedChange,
}: {
  contact: ContactInfo;
  onSave: (c: ContactInfo) => void;
  feedOn: boolean;
  onFeedChange: (v: boolean) => void;
}) {
  return (
    <AccordionItem value="contacto" className="rounded-lg border border-border bg-card px-4 shadow-sm">
      <div className="flex items-center justify-between gap-2 pt-2">
        <AccordionTrigger className="flex-1 hover:no-underline">
          <span className="text-base font-semibold">Contacto básico</span>
        </AccordionTrigger>
        <div onClick={(e) => e.stopPropagation()}>
          <EditProfileDialog contact={contact} onSave={onSave} />
        </div>
      </div>
      <AccordionContent>
        <div className="grid grid-cols-1 gap-2 pt-2 md:grid-cols-2">
          <FieldRow icon={IdCard} label="ID">{contact.id}</FieldRow>
          <FieldRow icon={Phone} label="Tel contacto">
            <span>{contact.telContacto}</span>
            <OtpBadge verified={contact.telContactoOtp} />
          </FieldRow>
          <FieldRow icon={User} label="Nombre">{contact.nombre}</FieldRow>
          <FieldRow icon={MessageCircle} label="Whatsapp">
            <span>{contact.whatsapp}</span>
            <OtpBadge verified={contact.whatsappOtp} />
          </FieldRow>
          <FieldRow icon={UserSquare2} label="Apellido">{contact.apellido}</FieldRow>
          <FieldRow icon={Rss} label="Feed">
            <span className="font-medium">{feedOn ? contact.nombreFeed : "No aplica"}</span>
            <TooltipProvider delayDuration={150}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span tabIndex={0} className="inline-flex">
                    <Switch
                      checked={feedOn}
                      onCheckedChange={onFeedChange}
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
          <FieldRow icon={Building2} label="Tipo de broker">{contact.tipoBroker}</FieldRow>
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
  );
}