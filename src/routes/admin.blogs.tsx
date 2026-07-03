import { createFileRoute } from "@tanstack/react-router";
import { ListModule } from "@/components/panel/module-page";
import { adminBlogsRows } from "@/lib/panel-data";

export const Route = createFileRoute("/admin/blogs")({ component: () => (
  <ListModule
    eyebrow="Editorial"
    title="Blogs & articles"
    description="Long-form editorial content. Draft, schedule and publish across categories."
    primaryLabel="New article"
    rows={adminBlogsRows}
  />
)});
