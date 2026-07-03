import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/panel/module-page";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/counselor/messages")({ component: Messages });

const threads = [
  { name: "Ananya S.", last: "Perfect, I'll send the SOP draft by tonight.", unread: 2, active: true },
  { name: "Rohit B.", last: "Do I need GRE for LBS?", unread: 0 },
  { name: "Meera D.", last: "Mock #3 review please 🙏", unread: 0 },
  { name: "Kabir V.", last: "Sharing my resume — v3.", unread: 0 },
];

const messages = [
  { me: false, text: "Hi Sneha! Quick question about my MIT SOP intro.", time: "10:12" },
  { me: true, text: "Sure, share the doc — I'll add inline comments today.", time: "10:14" },
  { me: false, text: "Sent. Also, is 3 recommenders enough or should I add a 4th?", time: "10:18" },
  { me: true, text: "3 is fine if all three know your research work. Prioritise depth over count.", time: "10:20" },
  { me: false, text: "Perfect, I'll send the SOP draft by tonight.", time: "10:22" },
];

function Messages() {
  return (
    <>
      <PageHeader eyebrow="Communication" title="Messages" description="Async chat with your students — end-to-end confidential." />
      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <Card><CardContent className="p-0">
          <ul className="divide-y divide-border">
            {threads.map((t) => (
              <li key={t.name} className={`flex cursor-pointer items-center gap-3 p-3 hover:bg-secondary/40 ${t.active ? "bg-secondary/50" : ""}`}>
                <div className="grid size-9 place-items-center rounded-full bg-academic text-[11px] font-bold text-white">
                  {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{t.last}</p>
                </div>
                {t.unread > 0 && <Badge className="border-0 bg-brand text-brand-foreground">{t.unread}</Badge>}
              </li>
            ))}
          </ul>
        </CardContent></Card>

        <Card><CardContent className="flex h-[560px] flex-col p-0">
          <div className="flex items-center gap-3 border-b border-border p-4">
            <div className="grid size-9 place-items-center rounded-full bg-academic text-[11px] font-bold text-white">AS</div>
            <div>
              <p className="text-sm font-semibold">Ananya S.</p>
              <p className="text-[11px] text-success">● online</p>
            </div>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.me ? "justify-end" : ""}`}>
                <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${m.me ? "bg-brand text-brand-foreground" : "bg-secondary"}`}>
                  <p>{m.text}</p>
                  <p className={`mt-1 text-[10px] ${m.me ? "text-brand-foreground/70" : "text-muted-foreground"}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t border-border p-3">
            <Input placeholder="Type a message…" className="h-10" />
            <Button size="icon" className="size-10 bg-brand text-brand-foreground hover:bg-brand/90"><Send className="size-4" /></Button>
          </div>
        </CardContent></Card>
      </div>
    </>
  );
}
