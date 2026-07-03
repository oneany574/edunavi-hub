import { createFileRoute, Link } from "@tanstack/react-router";
import { KpiGrid, PageHeader } from "@/components/panel/module-page";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { counselorKpis, counselorSessionsRows } from "@/lib/panel-data";
import { ArrowUpRight, Video, Phone, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/counselor/")({ component: CounselorHome });

const sessionTypes = [
  { icon: Video, name: "Video call", duration: "30 / 45 / 60 min", price: "$40 – $95" },
  { icon: Phone, name: "Voice call", duration: "30 min", price: "$30" },
  { icon: MessageSquare, name: "Async chat", duration: "24-hour window", price: "$20" },
];

function CounselorHome() {
  return (
    <>
      <PageHeader
        eyebrow="Independent counselor"
        title="Namaste, Sneha 👋"
        description="You're booked 68% this week. Next session in 2h 14m with Ananya S. (US MS shortlisting)."
        actions={<Button className="bg-brand text-brand-foreground hover:bg-brand/90">Go live now</Button>}
      />
      <KpiGrid items={counselorKpis} />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-0">
            <div className="flex items-center justify-between border-b border-border p-5">
              <div>
                <h3 className="text-sm font-bold">Upcoming sessions</h3>
                <p className="text-xs text-muted-foreground">Auto-synced with your calendar</p>
              </div>
              <Link to="/counselor/sessions" className="text-xs font-semibold text-brand hover:underline">
                Manage all <ArrowUpRight className="ml-1 inline size-3" />
              </Link>
            </div>
            <ul className="divide-y divide-border">
              {counselorSessionsRows.slice(0, 4).map((s) => (
                <li key={String(s.student)} className="flex items-center gap-3 px-5 py-3 hover:bg-secondary/40">
                  <div className="grid size-9 place-items-center rounded-full bg-academic text-[11px] font-bold text-white">
                    {String(s.student).split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{s.student}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{s.topic}</p>
                  </div>
                  <Badge variant="secondary" className="text-[10px] font-bold">{s.type}</Badge>
                  <span className="hidden w-40 text-right text-[11px] text-muted-foreground sm:inline">{s.when}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-bold">Your session offerings</h3>
            <ul className="mt-4 space-y-3">
              {sessionTypes.map((t) => (
                <li key={t.name} className="flex items-start gap-3 rounded-lg border border-border p-3">
                  <div className="grid size-9 place-items-center rounded-lg bg-gold-soft text-brand">
                    <t.icon className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-[11px] text-muted-foreground">{t.duration}</p>
                  </div>
                  <span className="text-xs font-bold">{t.price}</span>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="mt-4 w-full">Edit pricing</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
