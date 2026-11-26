import type { UIMessage } from "ai";
import type { AgentItem } from "./agent.functions";
export type Thread = { id: string; title: string; updatedAt: number; messages: UIMessage[]; items: AgentItem[] };
const KEY = "edufinder-assistant-threads";
export const newId = () => crypto.randomUUID();
export function loadThreads(): Thread[] {
  if (typeof window === "undefined") return [];
  try {
    const value: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    if (!Array.isArray(value)) return [];
    return value.filter((t): t is Thread => Boolean(t && typeof t.id === "string" && typeof t.title === "string" && Array.isArray(t.messages) && Array.isArray(t.items)));
  } catch { return []; }
}
export function saveThreads(threads: Thread[]) {
  localStorage.setItem(KEY, JSON.stringify(threads));
  window.dispatchEvent(new Event("assistant-threads"));
}
export function getThread(id: string) { return loadThreads().find((t) => t.id === id); }
export function upsertThread(t: Thread) { saveThreads([t, ...loadThreads().filter((x) => x.id !== t.id)]); }
export function deleteThread(id: string) { saveThreads(loadThreads().filter((t) => t.id !== id)); }
export function createThread(id: string = newId()): Thread {
  const existing = getThread(id);
  if (existing) return existing;
  const thread: Thread = { id, title: "New conversation", updatedAt: Date.now(), messages: [], items: [] };
  upsertThread(thread);
  return thread;
}
