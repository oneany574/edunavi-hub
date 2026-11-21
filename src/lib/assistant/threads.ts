// Browser-local chat threads for the admin assistant.
export type ToolEvent = {
  callId: string;
  name: string;
  args: Record<string, unknown>;
  state: "pending-approval" | "output-available" | "output-error" | "declined";
  output?: unknown;
  summary?: string;
};
export type ChatEntry =
  | { id: string; kind: "user"; text: string }
  | { id: string; kind: "assistant"; text: string }
  | { id: string; kind: "tool"; tool: ToolEvent };

export type Thread = {
  id: string;
  title: string;
  updatedAt: number;
  entries: ChatEntry[];
  /** Raw model conversation items, sent back on every turn. */
  items: unknown[];
};

const KEY = "edufinder-assistant-threads";

export function loadThreads(): Thread[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]") as Thread[]; } catch { return []; }
}

export function saveThreads(threads: Thread[]) {
  localStorage.setItem(KEY, JSON.stringify(threads));
  window.dispatchEvent(new Event("assistant-threads"));
}

export function getThread(id: string) { return loadThreads().find((t) => t.id === id); }

export function upsertThread(t: Thread) {
  const rest = loadThreads().filter((x) => x.id !== t.id);
  saveThreads([t, ...rest]);
}

export function deleteThread(id: string) { saveThreads(loadThreads().filter((t) => t.id !== id)); }

export const newId = () => Math.random().toString(36).slice(2, 10);
