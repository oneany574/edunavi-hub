import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/edufinder/coming-soon";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "Articles & guides — EduFinder" },
      { name: "description", content: "Admissions guides, scholarship breakdowns, and exam news." },
    ],
  }),
  component: () => (
    <ComingSoon
      eyebrow="Insights"
      title="Editorial, coming soon."
      blurb="Guides, exam news, scholarship breakdowns, and ranking deep-dives — written by editors and ex-admissions officers."
    />
  ),
});
