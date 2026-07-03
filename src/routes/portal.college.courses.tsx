import { createFileRoute } from "@tanstack/react-router";
import { ListModule } from "@/components/panel/module-page";
import { collegeCoursesRows } from "@/lib/panel-data";

export const Route = createFileRoute("/portal/college/courses")({ component: () => (
  <ListModule
    eyebrow="Programs"
    title="Courses & syllabus"
    description="Manage program pages, syllabus PDFs, fees, intake and seats-left in real time."
    primaryLabel="Add course"
    rows={collegeCoursesRows}
    rowActions={() => [
      { label: "Edit course" },
      { label: "Upload syllabus" },
      { label: "Duplicate" },
      { label: "Archive", destructive: true },
    ]}
  />
)});
