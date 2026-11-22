import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { AssistantPage } from "@/components/assistant/assistant-page";
export const Route = createFileRoute("/assistant/$threadId")({
  head: () => ({ meta: [ { title: "Your Conversation with Atlas — EduFinder" }, { name: "description", content: "Explore your education options with Atlas, EduFinder’s AI assistant." }, { property: "og:title", content: "Your Conversation with Atlas — EduFinder" }, { property: "og:description", content: "Personal education guidance and sample platform insights from Atlas." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" } ] }),
  component: ConversationRoute,
});
function ConversationRoute() { const { threadId } = Route.useParams(); return <ClientOnly fallback={<div className="grid min-h-screen place-items-center">Opening conversation…</div>}><AssistantPage key={threadId} threadId={threadId} /></ClientOnly>; }
