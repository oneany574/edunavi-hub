import { createFileRoute } from "@tanstack/react-router";
import { ListModule } from "@/components/panel/module-page";
import { adminClaimsRows } from "@/lib/panel-data";
import { slugify } from "@/lib/panel-detail-data";

export const Route = createFileRoute("/admin/claims")({ component: () => (
  <ListModule
    eyebrow="Trust & safety"
    title="Claim requests"
    description="College and consultancy claim flows in one pipeline. Verify identity, review documents, and approve access."
    primaryLabel="New claim"
    rows={adminClaimsRows}
    getEditHref={(row) => `/admin/claims/${slugify(row.entity as string)}`}
    rowActions={(row) => [
      { label: "Open review", href: `/admin/claims/${slugify(row.entity as string)}` },
      { label: "Approve" },
      { label: "Request more info" },
      { label: "Reject", destructive: true },
    ]}
  />
)});
