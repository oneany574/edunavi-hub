import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/edufinder/coming-soon";

export const Route = createFileRoute("/reviews")({
  head: () => ({ meta: [{ title: "Student reviews — EduFinder" }] }),
  component: () => (
    <ComingSoon
      eyebrow="Reviews"
      title="Honest, verified student reviews."
      blurb="Every review tied to an institutional email. No paid placements, ever. Browsable feed coming next."
    />
  ),
});
