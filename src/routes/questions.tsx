import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/edufinder/coming-soon";

export const Route = createFileRoute("/questions")({
  head: () => ({ meta: [{ title: "Q&A — EduFinder" }] }),
  component: () => (
    <ComingSoon
      eyebrow="Community Q&A"
      title="Ask anything. Get real answers."
      blurb="From current students, alumni, and admissions counselors. Moderated, helpful, and free."
    />
  ),
});
