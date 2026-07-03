import { createFileRoute } from "@tanstack/react-router";
import { ListModule } from "@/components/panel/module-page";
import { collegeReviewsRows } from "@/lib/panel-data";

export const Route = createFileRoute("/portal/college/reviews")({ component: () => (
  <ListModule
    eyebrow="Community"
    title="Reviews & ratings"
    description="Respond publicly to student reviews, escalate policy violations, and track sentiment over time."
    primaryLabel="Request review"
    rows={collegeReviewsRows}
    rowActions={() => [
      { label: "View full review" },
      { label: "Reply publicly" },
      { label: "Report to admin" },
    ]}
  />
)});
