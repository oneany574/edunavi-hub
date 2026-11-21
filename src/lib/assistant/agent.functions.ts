import { createServerFn } from "@tanstack/react-start";
import type { ResponsesInputItem } from "@lovable.dev/ai-gateway";
import { toolDefinitions } from "./tools";

const INSTRUCTIONS = `You are Atlas, the AI operations assistant inside the EduFinder admin panel (an education discovery platform for colleges, courses, exams, scholarships, study abroad, consultancies, blogs, news, claims, moderation and leads).
- Always use tools to read real data; never invent records. Call describe_collections first if unsure about field names.
- Combine multiple tool calls for multi-step questions. Present results as concise markdown tables or bullet summaries.
- For create/update/delete, ask for any missing required fields first, then call the tool; the admin confirms in the UI. If a write is declined, acknowledge and do not retry.
- Be brief and precise. Currency and dates should be shown as stored.`;

export const runAgentStep = createServerFn({ method: "POST" })
  .inputValidator((input: { items: unknown[] }) => {
    if (!Array.isArray(input.items) || input.items.length > 400) throw new Error("Invalid conversation");
    return input;
  })
  .handler(async ({ data }) => {
    const { generateResponse, GatewayError } = await import("@lovable.dev/ai-gateway");
    try {
      const res = await generateResponse({
        model: "openai/gpt-6.1-sol",
        instructions: INSTRUCTIONS,
        input: data.items as ResponsesInputItem[],
        tools: toolDefinitions,
        store: false,
      });
      return { ok: true as const, output: JSON.parse(JSON.stringify(res.output)) as unknown[] };
    } catch (e) {
      if (e instanceof GatewayError) {
        console.error("agent gateway error", e.code, e.message);
        const msg = e.code === "payment_required" ? "AI credits are exhausted. Please top up and try again."
          : e.code === "rate_limited" ? "The assistant is busy right now. Please wait a moment and try again."
          : "The assistant could not respond. Please try again.";
        return { ok: false as const, error: msg };
      }
      throw e;
    }
  });
