import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActivoCell, EstadoBadge, QtyCell } from "../components/badges";
import type { PcomRow } from "../types";

export function ProductosExpirarSection({ rows }: { rows: PcomRow[] }) {
  return (
    <AccordionItem value="productos" className="rounded-lg border border-border bg-card px-4 shadow-sm">
      <AccordionTrigger className="hover:no-underline">
        <span className="text-base font-semibold">Productos a expirar</span>
      </AccordionTrigger>
      <AccordionContent>
        {rows.length === 0 ? (
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
                {rows.map((r) => (
                  <TableRow key={r.mes}>
                    <TableCell className="font-medium">{r.mes}</TableCell>
                    <TableCell><QtyCell value={r.destacados} /></TableCell>
                    <TableCell><ActivoCell value={r.elite} /></TableCell>
                    <TableCell><QtyCell value={r.prime} /></TableCell>
                    <TableCell><ActivoCell value={r.oi} /></TableCell>
                    <TableCell><EstadoBadge estado={r.estado} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}