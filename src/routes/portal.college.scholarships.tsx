import { createFileRoute } from "@tanstack/react-router";
import { ListModule } from "@/components/panel/module-page";
import { collegeScholarshipsRows } from "@/lib/panel-data";

export const Route = createFileRoute("/portal/college/scholarships")({ component: () => (
  <ListModule
    eyebrow="Financial aid"
    title="Institutional scholarships"
    description="Merit, need-based and category scholarships you offer directly. Deadlines auto-sync to your public page."
    primaryLabel="Add scholarship"
    rows={collegeScholarshipsRows}
  />
)});
