import { createFileRoute } from "@tanstack/react-router";
import { ListModule } from "@/components/panel/module-page";
import { adminClaimsRows } from "@/lib/panel-data";

export const Route = createFileRoute("/admin/claims")({ component: () => (
  <ListModule
    eyebrow="Trust & safety"
    title="Claim requests"
    description="College and consultancy claim flows in one pipeline. Verify identity, review documents, and approve access."
    primaryLabel="New claim"
    rows={adminClaimsRows}
    rowActions={() => [
      { label: "Open review" },
      { label: "Approve" },
      { label: "Request more info" },
      { label: "Reject", destructive: true },
    ]}
  />
)});
