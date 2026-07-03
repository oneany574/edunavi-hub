import { createFileRoute } from "@tanstack/react-router";
import { ListModule } from "@/components/panel/module-page";
import { adminModerationRows } from "@/lib/panel-data";

export const Route = createFileRoute("/admin/moderation")({ component: () => (
  <ListModule
    eyebrow="Trust & safety"
    title="Content moderation"
    description="Reviews, Q&A posts and articles flagged by users or classifiers. Act within SLA to keep the community safe."
    primaryLabel="New rule"
    rows={adminModerationRows}
    rowActions={() => [
      { label: "View content" },
      { label: "Approve" },
      { label: "Warn author" },
      { label: "Remove", destructive: true },
    ]}
  />
)});
