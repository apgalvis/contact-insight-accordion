import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Search, User } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DEFAULT_CONTACT,
  PCOM_ROWS,
  type ContactInfo,
} from "@/features/announcer/types";
import { ContactoBasicoSection } from "@/features/announcer/sections/ContactoBasicoSection";
import { PcomSection } from "@/features/announcer/sections/PcomSection";
import { ProductosExpirarSection } from "@/features/announcer/sections/ProductosExpirarSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Buscador de cliente" },
      { name: "description", content: "Consulta información del anunciante en Propiedades.com" },
    ],
  }),
  component: Index,
});

function Index() {
  const [query, setQuery] = useState("angiegalvis@habi.co");
  const [searched, setSearched] = useState<string | null>("angiegalvis@habi.co");
  const [contact, setContact] = useState<ContactInfo>(DEFAULT_CONTACT);
  const [feedOn, setFeedOn] = useState(true);
  const [openSection, setOpenSection] = useState<string>("contacto");

  const hasResults = !!searched;

  return (
    <div className="min-h-screen bg-muted/30 px-4 py-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-3">
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
                <Accordion
                  type="single"
                  collapsible
                  value={openSection}
                  onValueChange={setOpenSection}
                  className="flex flex-col gap-3 pt-2"
                >
                  <ContactoBasicoSection
                    contact={contact}
                    onSave={setContact}
                    feedOn={feedOn}
                    onFeedChange={setFeedOn}
                  />
                  <PcomSection />
                  <ProductosExpirarSection rows={PCOM_ROWS} />
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