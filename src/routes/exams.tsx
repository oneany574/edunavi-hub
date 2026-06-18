import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/edufinder/coming-soon";

export const Route = createFileRoute("/exams")({
  head: () => ({
    meta: [
      { title: "Entrance exams — EduFinder" },
      { name: "description", content: "Track 120+ entrance exams worldwide." },
    ],
  }),
  component: () => (
    <ComingSoon
      eyebrow="Exams"
      title="Track every entrance exam."
      blurb="120+ international and national exams with dates, syllabi, cutoffs, and participating colleges. Shipping next."
    />
  ),
});
