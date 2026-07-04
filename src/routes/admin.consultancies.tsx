import { createFileRoute } from "@tanstack/react-router";
import { ListModule } from "@/components/panel/module-page";
import { adminConsultanciesRows } from "@/lib/panel-data";
import { slugify } from "@/lib/panel-detail-data";

export const Route = createFileRoute("/admin/consultancies")({ component: () => (
  <ListModule
    eyebrow="Partners"
    title="Consultancies"
    description="Study abroad and admissions consultancies — including claim status, counselor headcount and success ratings."
    primaryLabel="Add consultancy"
    rows={adminConsultanciesRows}
    getEditHref={(row) => `/admin/consultancies/${slugify(row.name as string)}`}
  />
)});
