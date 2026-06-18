import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/edufinder/coming-soon";

export const Route = createFileRoute("/college-predictor")({
  head: () => ({
    meta: [
      { title: "College predictor — EduFinder" },
      { name: "description", content: "Predict your admission chances based on scores and profile." },
    ],
  }),
  component: () => (
    <ComingSoon
      eyebrow="AI Predictor"
      title="Predict your admission odds."
      blurb="Trained on five years of cutoff data across 500+ universities. Calibrated probabilities, not guesses. Coming in the next iteration."
    />
  ),
});
