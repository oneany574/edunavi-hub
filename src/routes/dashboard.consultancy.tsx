import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/edufinder/coming-soon";

export const Route = createFileRoute("/dashboard/consultancy")({
  head: () => ({ meta: [{ title: "Consultancy dashboard — EduFinder" }] }),
  component: () => (
    <ComingSoon
      eyebrow="For consultancies"
      title="Manage your consultancy on EduFinder."
      blurb="Update services, respond to reviews, track leads and access engagement analytics — all in one workspace."
    />
  ),
});
