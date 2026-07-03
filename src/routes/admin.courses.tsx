import { createFileRoute } from "@tanstack/react-router";
import { ListModule } from "@/components/panel/module-page";
import { adminCoursesRows } from "@/lib/panel-data";

export const Route = createFileRoute("/admin/courses")({ component: () => (
  <ListModule
    eyebrow="Catalog"
    title="Courses"
    description="Global course catalog with syllabus, levels, streams and college coverage."
    primaryLabel="Add course"
    rows={adminCoursesRows}
  />
)});
