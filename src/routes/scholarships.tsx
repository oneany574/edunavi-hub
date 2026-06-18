import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/edufinder/coming-soon";

export const Route = createFileRoute("/scholarships")({
  head: () => ({ meta: [{ title: "Scholarships — EduFinder" }] }),
  component: () => (
    <ComingSoon
      eyebrow="Scholarships"
      title="$2.4B in scholarships, indexed."
      blurb="From Rhodes to lesser-known endowments — filterable by country, level, and merit/need. Shipping next."
    />
  ),
});
