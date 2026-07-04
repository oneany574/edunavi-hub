import { createFileRoute } from "@tanstack/react-router";
import { ListModule } from "@/components/panel/module-page";
import { adminCollegesRows } from "@/lib/panel-data";
import { slugify } from "@/lib/panel-detail-data";

export const Route = createFileRoute("/admin/colleges")({
  component: () => (
    <ListModule
      eyebrow="Catalog"
      title="Colleges & universities"
      description="Complete college directory with claim state, courses and rating."
      primaryLabel="Add college"
      rows={adminCollegesRows}
      getEditHref={(row) => `/admin/colleges/${slugify(row.name as string)}`}
    />
  ),
});
