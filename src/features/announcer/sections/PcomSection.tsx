import { Crown, Gem, Infinity as InfinityIcon, Star, Zap } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductFeatureToggle } from "../components/ProductFeatureToggle";
import { StatCard } from "../components/StatCard";

export function PcomSection() {
  return (
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
  );
}