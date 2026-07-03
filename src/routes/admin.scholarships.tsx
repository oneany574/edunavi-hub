import { createFileRoute } from "@tanstack/react-router";
import { ListModule } from "@/components/panel/module-page";
import { adminScholarshipsRows } from "@/lib/panel-data";

export const Route = createFileRoute("/admin/scholarships")({ component: () => (
  <ListModule
    eyebrow="Programs"
    title="Scholarships"
    description="Provider-partnered awards with rolling and deadline-based cycles."
    primaryLabel="Publish scholarship"
    rows={adminScholarshipsRows}
  />
)});
