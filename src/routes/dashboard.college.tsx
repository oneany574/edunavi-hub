import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/edufinder/coming-soon";

export const Route = createFileRoute("/dashboard/college")({
  head: () => ({ meta: [{ title: "College dashboard — EduFinder" }] }),
  component: () => (
    <ComingSoon
      eyebrow="For institutions"
      title="Claim and manage your college."
      blurb="Edit your profile, publish accurate fees and placements, respond to reviews, and track admission leads — all in one place."
    />
  ),
});
