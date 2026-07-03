import { createFileRoute } from "@tanstack/react-router";
import { ListModule } from "@/components/panel/module-page";
import { counselorSessionsRows } from "@/lib/panel-data";

export const Route = createFileRoute("/counselor/sessions")({ component: () => (
  <ListModule
    eyebrow="Calendar"
    title="Sessions"
    description="All upcoming and past 1:1 sessions — video, voice, and async chat. Manage rescheduling and no-shows."
    primaryLabel="Block time"
    rows={counselorSessionsRows}
    rowActions={() => [
      { label: "Join session" },
      { label: "Reschedule" },
      { label: "Mark complete" },
      { label: "Cancel", destructive: true },
    ]}
  />
)});
