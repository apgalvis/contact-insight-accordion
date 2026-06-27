import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnnouncerAccordion } from "@/features/announcer/AnnouncerAccordion";
import { searchClient } from "@/features/announcer/api";
import { PCOM_ROWS, type ContactInfo } from "@/features/announcer/types";
import { ContactoBasicoSection } from "@/features/announcer/sections/ContactoBasicoSection";
import { EditProfileDialog } from "@/features/announcer/components/EditProfileDialog";
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
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [searchedEmail, setSearchedEmail] = useState<string | null>(null);
  const [feedOn, setFeedOn] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await searchClient(query);
      setContact(result);
      setSearchedEmail(query.trim());
      toast.success("Cliente encontrado.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error al buscar el cliente.";
      setContact(null);
      setSearchedEmail(null);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-muted/30 px-4 py-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-3">
        <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
            <Search className="h-4 w-4" />
            Buscar cliente
          </div>
          <form className="flex gap-2" onSubmit={handleSearch}>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="correo@cliente.com"
              className="h-11"
              disabled={loading}
            />
            <Button type="submit" className="h-11 gap-1.5 px-6" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {loading ? "Buscando..." : "Buscar"}
            </Button>
          </form>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-card p-10 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Buscando información del anunciante...
          </div>
        ) : error ? (
          <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <div>
              <p className="font-medium">No se pudo cargar la información.</p>
              <p className="text-destructive/80">{error}</p>
            </div>
          </div>
        ) : !contact ? (
          <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
            Busca un correo para ver la información del anunciante.
          </div>
        ) : (
          <AnnouncerAccordion
            title={`Información del anunciante · ${searchedEmail}`}
            sections={[
              {
                id: "contacto",
                defaultOpen: true,
                render: () => (
                  <ContactoBasicoSection
                    contact={contact}
                    onSave={setContact}
                    feedOn={feedOn}
                    onFeedChange={setFeedOn}
                  />
                ),
              },
              {
                id: "pcom",
                render: () => <PcomSection />,
              },
              {
                id: "productos",
                render: () => <ProductosExpirarSection rows={PCOM_ROWS} />,
              },
            ]}
          />
        )}

        <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5" />
          La información mostrada corresponde al estado actual del anunciante en Propiedades.com.
        </p>
      </div>
    </div>
  );
}

// Silence unused import warning: EditProfileDialog is re-exported via section, kept for tree-shake clarity.
void EditProfileDialog;