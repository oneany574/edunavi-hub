import { createFileRoute } from "@tanstack/react-router";
import { ListModule } from "@/components/panel/module-page";
import { adminStudyAbroadRows } from "@/lib/panel-data";
import { slugify } from "@/lib/panel-detail-data";

export const Route = createFileRoute("/admin/study-abroad")({ component: () => (
  <ListModule
    eyebrow="Global"
    title="Study Abroad destinations"
    description="Country-level guides — average tuition, living index, and trending demand from Indian students."
    primaryLabel="Add destination"
    rows={adminStudyAbroadRows}
    getEditHref={(row) => `/admin/study-abroad/${slugify(row.destination as string)}`}
  />
)});
