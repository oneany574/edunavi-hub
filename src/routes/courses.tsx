import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/edufinder/coming-soon";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Browse courses — EduFinder" },
      { name: "description", content: "Browse 2,000+ courses by stream, level, and duration." },
    ],
  }),
  component: () => (
    <ComingSoon
      eyebrow="Courses"
      title="Course discovery, coming next."
      blurb="We're wiring up 2,000+ programs across UG, PG, diplomas, and doctorates — filterable by level, duration, fees, and outcomes."
    />
  ),
});
