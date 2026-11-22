import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import type { ChatStatus, DynamicToolUIPart, UIMessage } from "ai";
import { ArrowLeft, ArrowUpRight, Check, Copy, Menu, MessageSquare, Plus, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputTextarea, PromptInputFooter, PromptInputSubmit } from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput } from "@/components/ai-elements/tool";
import { runAgentStep, type AgentEvent } from "@/lib/assistant/agent.functions";
import { createThread, deleteThread, getThread, loadThreads, newId, upsertThread, type Thread } from "@/lib/assistant/threads";
import { describeWrite, runTool, WRITE_TOOLS } from "@/lib/assistant/tools";
import { AtlasMark } from "./atlas-mark";
import { toast } from "sonner";

const suggestions = ["Compare engineering colleges", "Find scholarships for me", "How do I prepare for IELTS?", "Show pending college claims"];
export function AssistantBootstrap() {
  const [thread] = useState(() => loadThreads()[0] ?? createThread());
  const navigate = useNavigate();
  useEffect(() => { void navigate({ to: "/assistant/$threadId", params: { threadId: thread.id }, replace: true }); }, [navigate, thread.id]);
  return <div className="grid min-h-screen place-items-center"><AtlasMark /></div>;
}
export function AssistantPage({ threadId }: { threadId: string }) {
  const navigate = useNavigate();
  const callAgent = useServerFn(runAgentStep);
  const [thread, setThread] = useState<Thread>(() => getThread(threadId) ?? createThread(threadId));
  const threadRef = useRef(thread);
  const [threads, setThreads] = useState(loadThreads);
  const [status, setStatus] = useState<ChatStatus>("ready");
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [sidebar, setSidebar] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(null);
  const cancelled = useRef(false);
  const busyRef = useRef(false);
  const approvalRef = useRef<((approved: boolean) => void) | null>(null);
  const [approvalId, setApprovalId] = useState<string | null>(null);
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    const sync = () => setThreads(loadThreads());
    window.addEventListener("assistant-threads", sync);
    window.addEventListener("storage", sync);
    inputRef.current?.focus();
    return () => {
      window.removeEventListener("assistant-threads", sync);
      window.removeEventListener("storage", sync);
      cancelled.current = true;
      void readerRef.current?.cancel();
      approvalRef.current?.(false);
    };
  }, []);
  const persist = (next: Thread) => {
    threadRef.current = next;
    setThread(next);
    try { upsertThread(next); } catch { toast.error("Your browser could not save this conversation."); }
  };
  const changeMessages = (update: (messages: UIMessage[]) => UIMessage[]) => persist({ ...threadRef.current, messages: update(threadRef.current.messages), updatedAt: Date.now() });
  const updateTool = (callId: string, part: DynamicToolUIPart) => changeMessages((messages) => messages.map((message) => ({ ...message, parts: message.parts.map((p) => p.type === "dynamic-tool" && p.toolCallId === callId ? part : p) })));
  const stop = () => {
    cancelled.current = true;
    void readerRef.current?.cancel();
    approvalRef.current?.(false);
    setApprovalId(null);
    setStatus("ready");
    inputRef.current?.focus();
  };
  const send = async (text: string) => {
    if (!text.trim() || busyRef.current) return;
    busyRef.current = true;
    cancelled.current = false;
    setError("");
    setDraft("");
    const current = threadRef.current;
    persist({ ...current, title: current.messages.length ? current.title : text.slice(0, 48), updatedAt: Date.now(), messages: [...current.messages, { id: newId(), role: "user", parts: [{ type: "text", text }] }], items: [...current.items, { type: "message", role: "user", content: text }] });
    setStatus("submitted");
    inputRef.current?.focus();
    try {
      for (let step = 0; step < 10; step++) {
        if (cancelled.current) break;
        const assistantId = newId();
        const response = await callAgent({ data: { items: threadRef.current.items } });
        if (cancelled.current) { await response.body?.cancel(); break; }
        if (!response.ok || !response.body) throw new Error("Atlas is unavailable right now. Please try again.");
        const reader = response.body.getReader();
        readerRef.current = reader;
        const decoder = new TextDecoder();
        let buffer = "", answer = "";
        let completed: Extract<AgentEvent, { type: "complete" }> | null = null;
        changeMessages((messages) => [...messages, { id: assistantId, role: "assistant", parts: [] }]);
        while (!cancelled.current) {
          const { value, done } = await reader.read();
          buffer += decoder.decode(value, { stream: !done });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          for (const line of lines) {
            if (!line.trim()) continue;
            const event: AgentEvent = JSON.parse(line);
            if (event.type === "error") throw new Error(event.message);
            if (event.type === "complete") completed = event;
            if (event.type === "delta") {
              answer += event.text;
              setStatus("streaming");
              changeMessages((messages) => messages.map((m) => m.id === assistantId ? { ...m, parts: [{ type: "text", text: answer }] } : m));
            }
          }
          if (done) break;
        }
        readerRef.current = null;
        if (answer) persist({ ...threadRef.current, items: [...threadRef.current.items, { type: "message", role: "assistant", content: answer }] });
        if (cancelled.current) break;
        if (!completed) throw new Error("The reply was interrupted. Your messages are saved.");
        if (!completed.calls.length) break;
        for (const call of completed.calls) {
          if (cancelled.current) break;
          const parsed: unknown = JSON.parse(call.arguments);
          if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Atlas returned invalid action details.");
          const args = Object.fromEntries(Object.entries(parsed));
          const write = WRITE_TOOLS.has(call.name);
          const pending: DynamicToolUIPart = { type: "dynamic-tool", toolName: call.name, toolCallId: call.call_id, input: args, state: "input-available" };
          changeMessages((messages) => messages.map((m) => m.id === assistantId ? { ...m, parts: [...m.parts, pending] } : m));
          let output: unknown;
          let approved = !write;
          if (write) {
            setApprovalId(call.call_id);
            approved = await new Promise<boolean>((resolve) => { approvalRef.current = resolve; });
            approvalRef.current = null;
            setApprovalId(null);
          }
          if (cancelled.current) break;
          try {
            output = approved ? runTool(call.name, args, approved) : { declined: true, message: "The user declined this action. No data was changed." };
            updateTool(call.call_id, { ...pending, state: "output-available", output });
          } catch (failure) {
            const errorText = failure instanceof Error ? failure.message : "Action failed";
            output = { error: errorText };
            updateTool(call.call_id, { ...pending, state: "output-error", errorText });
          }
          persist({ ...threadRef.current, items: [...threadRef.current.items, { type: "function_call", call_id: call.call_id, name: call.name, arguments: call.arguments }, { type: "function_call_output", call_id: call.call_id, output: JSON.stringify(output) }] });
          setStatus("submitted");
        }
        if (step === 9) throw new Error("This request reached its action limit. Please continue with a smaller request.");
      }
    } catch (failure) {
      if (!cancelled.current) { setError(failure instanceof Error ? failure.message : "Atlas couldn't respond."); setStatus("error"); }
    } finally {
      busyRef.current = false;
      readerRef.current = null;
      setStatus((s) => s === "error" ? s : "ready");
      inputRef.current?.focus();
    }
  };
  const newConversation = () => {
    if (busy) stop();
    const next = createThread();
    void navigate({ to: "/assistant/$threadId", params: { threadId: next.id } });
    setSidebar(false);
  };
  const remove = (id: string) => {
    if (!window.confirm("Delete this conversation from this browser?")) return;
    deleteThread(id);
    if (id === threadId) { const next = loadThreads()[0] ?? createThread(); void navigate({ to: "/assistant/$threadId", params: { threadId: next.id }, replace: true }); }
  };
  return <div className="flex h-dvh overflow-hidden bg-background text-foreground">
    {sidebar && <div className="fixed inset-0 z-40 bg-foreground/30 md:hidden" onClick={() => setSidebar(false)} />}
    <aside className={`${sidebar ? "fixed inset-y-0 left-0 z-50 flex" : "hidden"} w-64 shrink-0 flex-col border-r border-border bg-secondary md:relative md:flex`}>
      <div className="flex items-center gap-3 px-5 py-6"><AtlasMark className="size-9" /><div><p className="font-display text-xl">Atlas</p><p className="text-xs text-muted-foreground">by EduFinder</p></div><Button variant="ghost" size="icon" aria-label="Close conversations" className="ml-auto md:hidden" onClick={() => setSidebar(false)}><X /></Button></div>
      <div className="px-4"><Button onClick={newConversation} className="w-full justify-start gap-2"><Plus className="size-4" />New conversation</Button><Input className="mt-4 bg-background" aria-label="Search conversations" placeholder="Search conversations" value={query} onChange={(e) => setQuery(e.target.value)} /></div>
      <p className="px-5 pb-2 pt-6 text-xs font-semibold text-muted-foreground">CONVERSATIONS</p>
      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3">{threads.filter((t) => t.title.toLowerCase().includes(query.toLowerCase())).map((t) => <div key={t.id} className={`group flex items-center rounded-md ${t.id === threadId ? "bg-background" : "hover:bg-background/60"}`}><Link to="/assistant/$threadId" params={{ threadId: t.id }} onClick={() => { stop(); setSidebar(false); }} className="flex min-w-0 flex-1 items-center gap-2 px-3 py-3 text-sm"><MessageSquare className="size-4 shrink-0 text-muted-foreground" /><span className="truncate">{t.title}</span></Link><Button variant="ghost" size="icon" className="size-8 shrink-0" aria-label={`Delete ${t.title}`} onClick={() => remove(t.id)}><Trash2 className="size-3.5" /></Button></div>)}</nav>
      <div className="border-t border-border p-4"><Button asChild variant="ghost" className="w-full justify-start gap-2"><Link to="/"><ArrowLeft className="size-4" />Back to EduFinder</Link></Button><p className="mt-2 px-3 text-xs text-muted-foreground">History · This browser</p></div>
    </aside>
    <main className="flex min-w-0 flex-1 flex-col">
      <header className="flex h-18 shrink-0 items-center gap-3 border-b border-border px-4 md:px-8"><Button variant="ghost" size="icon" aria-label="Open conversations" className="md:hidden" onClick={() => setSidebar(true)}><Menu /></Button><AtlasMark className="size-8 md:hidden" /><div className="min-w-0"><h1 className="truncate text-sm font-semibold">{thread.title === "New conversation" ? "Atlas · Education assistant" : thread.title}</h1><p className="mt-0.5 text-xs text-muted-foreground">EduFinder AI</p></div><Button variant="ghost" size="icon" aria-label="New conversation" title="New conversation" className="ml-auto" onClick={newConversation}><Plus /></Button><Button asChild variant="ghost" size="icon" title="Back to website"><Link to="/" aria-label="Back to website"><X /></Link></Button></header>
      <Conversation className="min-h-0">
        <ConversationContent className="mx-auto w-full max-w-3xl gap-6 px-5 py-8 md:px-8">
          {thread.messages.length === 0 && <div className="py-8 md:py-16"><AtlasMark className="mb-7 size-14" /><p className="mb-2 text-sm font-medium text-academic">YOUR NEXT CHAPTER</p><h2 className="font-display text-4xl leading-tight">Where do you want<br />to go next?</h2><p className="mt-5 text-base text-muted-foreground">Hi, I’m Atlas. What’s on your mind?</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{suggestions.map((s) => <Button key={s} variant="outline" className="h-auto min-h-16 justify-between whitespace-normal px-4 py-4 text-left text-sm" onClick={() => { void send(s); }}><span>{s}</span><ArrowUpRight className="ml-3 size-4 shrink-0 text-academic" /></Button>)}</div></div>}
          {thread.messages.map((message) => <Message key={message.id} from={message.role} className="max-w-full">
            {message.role === "assistant" && message.parts.length > 0 && <div className="mb-1 flex items-center gap-2 text-xs font-semibold"><AtlasMark className="size-5" />Atlas</div>}
            {message.parts.map((part, index) => part.type === "text" ? <MessageContent key={index} className={message.role === "user" ? "group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground" : "w-full overflow-visible"}><MessageResponse>{part.text}</MessageResponse></MessageContent> : part.type === "dynamic-tool" ? <div key={part.toolCallId} className="w-full"><Tool defaultOpen={false}><ToolHeader type="dynamic-tool" toolName={part.toolName} title={part.toolName.replaceAll("_", " ")} state={approvalId === part.toolCallId ? "approval-requested" : part.state === "input-available" && !busy ? "output-denied" : part.state} /><ToolContent><ToolInput input={part.input} /><ToolOutput output={part.output} errorText={part.errorText} /></ToolContent></Tool>{approvalId === part.toolCallId && <div className="mb-4 border-l-2 border-brand py-2 pl-4"><p className="text-sm font-semibold">{describeWrite(part.toolName, typeof part.input === "object" && part.input ? Object.fromEntries(Object.entries(part.input)) : {})}</p><p className="mt-2 break-words text-xs text-muted-foreground">{JSON.stringify(part.input)}</p><p className="mt-2 text-xs text-muted-foreground">This changes sample data for this session only.</p><div className="mt-3 flex gap-2"><Button size="sm" onClick={() => approvalRef.current?.(true)}><Check className="mr-1 size-4" />Confirm change</Button><Button size="sm" variant="outline" onClick={() => approvalRef.current?.(false)}>Decline</Button></div></div>}</div> : null)}
            {message.role === "assistant" && message.parts.some((p) => p.type === "text") && <Button variant="ghost" size="icon" className="size-7 text-muted-foreground" title="Copy answer" aria-label="Copy answer" onClick={() => { void navigator.clipboard.writeText(message.parts.flatMap((p) => p.type === "text" ? [p.text] : []).join("\n")).then(() => toast.success("Answer copied")); }}><Copy className="size-3.5" /></Button>}
          </Message>)}
          {busy && !approvalId && <div aria-live="polite" className="text-sm"><Shimmer>Atlas is thinking…</Shimmer></div>}
          {error && <div role="alert" className="border-l-2 border-destructive pl-4 text-sm text-destructive">{error}</div>}
        </ConversationContent><ConversationScrollButton />
      </Conversation>
      <div className="mx-auto w-full max-w-3xl shrink-0 px-4 pb-4 pt-2 md:px-8"><PromptInput onSubmit={async ({ text }) => { await send(text); }}><PromptInputTextarea ref={inputRef} aria-label="Message Atlas" placeholder="Ask Atlas anything…" value={draft} onChange={(e) => setDraft(e.target.value)} className="min-h-16" /><PromptInputFooter className="justify-between"><span className="text-xs text-muted-foreground">Atlas · EduFinder</span><PromptInputSubmit status={status} onStop={stop} disabled={!busy && !draft.trim()} /></PromptInputFooter></PromptInput><p className="mt-2 text-center text-[11px] text-muted-foreground">AI can make mistakes. Verify admissions information with the institution.</p></div>
    </main>
  </div>;
}
