import { createFileRoute } from "@tanstack/react-router";
import { ListModule } from "@/components/panel/module-page";
import { adminExamsRows } from "@/lib/panel-data";

export const Route = createFileRoute("/admin/exams")({ component: () => (
  <ListModule
    eyebrow="Programs"
    title="Exams & entrance tests"
    description="From JEE and GATE to IELTS and Digital SAT — manage session dates, syllabus and registrations."
    primaryLabel="Add exam"
    rows={adminExamsRows}
  />
)});
