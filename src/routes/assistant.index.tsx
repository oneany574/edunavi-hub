import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { AssistantBootstrap } from "@/components/assistant/assistant-page";
export const Route = createFileRoute("/assistant/")({
  head: () => ({ meta: [ { title: "Atlas AI Assistant — EduFinder" }, { name: "description", content: "Talk to Atlas about colleges, scholarships, exams and your next education decision." }, { property: "og:title", content: "Atlas AI Assistant — EduFinder" }, { property: "og:description", content: "Your EduFinder education conversation starts here." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" } ] }),
  component: () => <ClientOnly fallback={<div className="grid min-h-screen place-items-center">Opening Atlas…</div>}><AssistantBootstrap /></ClientOnly>,
});
