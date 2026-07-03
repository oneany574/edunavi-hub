import { createFileRoute } from "@tanstack/react-router";
import { ListModule } from "@/components/panel/module-page";
import { adminNewsRows } from "@/lib/panel-data";

export const Route = createFileRoute("/admin/news")({ component: () => (
  <ListModule
    eyebrow="Editorial"
    title="News & updates"
    description="Cycle news, policy changes and admissions bulletins — surfaced across the homepage and detail pages."
    primaryLabel="Publish news"
    rows={adminNewsRows}
  />
)});
