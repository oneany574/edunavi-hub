import { createFileRoute } from "@tanstack/react-router";
import { ListModule } from "@/components/panel/module-page";
import { adminCollegesRows } from "@/lib/panel-data";

export const Route = createFileRoute("/admin/colleges")({ component: () => (
  <ListModule
    eyebrow="Catalog"
    title="Colleges"
    description="Manage the master directory of 4,218 institutions — including verified claims, ownership, courses, and public rating."
    primaryLabel="Add college"
    rows={adminCollegesRows}
  />
)});
