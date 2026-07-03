import { createFileRoute } from "@tanstack/react-router";
import { ListModule } from "@/components/panel/module-page";
import { counselorStudentsRows } from "@/lib/panel-data";

export const Route = createFileRoute("/counselor/students")({ component: () => (
  <ListModule
    eyebrow="Roster"
    title="My students"
    description="Long-term counseling engagements with milestones, next steps and admissions timelines."
    primaryLabel="Invite student"
    rows={counselorStudentsRows}
    rowActions={() => [
      { label: "Open profile" },
      { label: "Add note" },
      { label: "Schedule session" },
    ]}
  />
)});
