import { useState, type ReactNode } from "react";
import { User } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export type AnnouncerSection = {
  id: string;
  /** Optional override of the AccordionItem; when provided, `label`/`content` are ignored. */
  render?: () => ReactNode;
  label?: string;
  content?: ReactNode;
  /** Extra node rendered next to the trigger (e.g. action button). */
  trailing?: ReactNode;
  defaultOpen?: boolean;
};

export function AnnouncerAccordion({
  title,
  sections,
}: {
  title: ReactNode;
  sections: AnnouncerSection[];
}) {
  const [openItems, setOpenItems] = useState<string[]>(() =>
    sections.filter((s) => s.defaultOpen).map((s) => s.id),
  );

  return (
    <Accordion type="single" collapsible defaultValue="anunciante">
      <AccordionItem
        value="anunciante"
        className="rounded-lg border border-border bg-card px-4 shadow-sm"
      >
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            <span className="text-base font-semibold">{title}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Accordion
            type="multiple"
            value={openItems}
            onValueChange={setOpenItems}
            className="flex flex-col gap-3 pt-2"
          >
            {sections.map((s) =>
              s.render ? (
                <s.render key={s.id} />
              ) : (
                <AccordionItem
                  key={s.id}
                  value={s.id}
                  className="rounded-lg border border-border bg-card px-4 shadow-sm"
                >
                  {s.trailing ? (
                    <div className="flex items-center justify-between gap-2 pt-2">
                      <AccordionTrigger className="flex-1 hover:no-underline">
                        <span className="text-base font-semibold">{s.label}</span>
                      </AccordionTrigger>
                      <div onClick={(e) => e.stopPropagation()}>{s.trailing}</div>
                    </div>
                  ) : (
                    <AccordionTrigger className="hover:no-underline">
                      <span className="text-base font-semibold">{s.label}</span>
                    </AccordionTrigger>
                  )}
                  <AccordionContent>{s.content}</AccordionContent>
                </AccordionItem>
              ),
            )}
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}