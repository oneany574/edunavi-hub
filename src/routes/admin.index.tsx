import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, FileCheck2, ShieldAlert, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KpiGrid, PageHeader } from "@/components/panel/module-page";
import { adminActivity, adminKpis } from "@/lib/panel-data";

export const Route = createFileRoute("/admin/")({
  component: AdminIndex,
});

function AdminIndex() {
  return (
    <>
      <PageHeader
        eyebrow="Command center"
        title="Good afternoon, Priya"
        description="You have 37 pending claims and 19 flagged posts across the platform. Here's the pulse today."
        actions={
          <>
            <Button variant="outline" className="gap-1.5"><ShieldAlert className="size-4" /> Moderation queue</Button>
            <Button className="gap-1.5 bg-brand text-brand-foreground hover:bg-brand/90">
              <FileCheck2 className="size-4" /> Review claims
            </Button>
          </>
        }
      />
      <KpiGrid items={adminKpis} />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-0">
            <div className="flex items-center justify-between border-b border-border p-5">
              <div>
                <h3 className="text-sm font-bold">Recent activity</h3>
                <p className="text-xs text-muted-foreground">Every action across the admin surface, in real time.</p>
              </div>
              <Button variant="ghost" size="sm" className="gap-1 text-xs">View all <ArrowUpRight className="size-3.5" /></Button>
            </div>
            <ul className="divide-y divide-border">
              {adminActivity.map((a) => (
                <li key={a.id} className="flex items-center gap-3 px-5 py-3 hover:bg-secondary/40">
                  <div className="grid size-8 place-items-center rounded-full bg-secondary text-[11px] font-bold">
                    {a.actor.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm">
                      <span className="font-semibold">{a.actor}</span>{" "}
                      <span className="text-muted-foreground">{a.action}</span>{" "}
                      <span className="font-semibold">{a.target}</span>
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-[10px] font-bold uppercase">{a.kind}</Badge>
                  <span className="w-8 text-right text-[11px] text-muted-foreground">{a.time}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-brand to-academic text-brand-foreground">
          <CardContent className="p-5">
            <Sparkles className="size-6" />
            <h3 className="font-display mt-3 text-2xl leading-tight">Quick actions</h3>
            <p className="mt-1 text-xs text-brand-foreground/80">Jump straight to the most-used flows.</p>
            <div className="mt-5 grid gap-2">
              {[
                { to: "/admin/colleges", label: "Add a college" },
                { to: "/admin/blogs", label: "Publish an article" },
                { to: "/admin/scholarships", label: "Open a scholarship" },
                { to: "/admin/claims", label: "Review claim #48" },
                { to: "/admin/settings", label: "Team & permissions" },
              ].map((a) => (
                <Link
                  key={a.to}
                  to={a.to}
                  className="flex items-center justify-between rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold backdrop-blur transition hover:bg-white/20"
                >
                  {a.label}
                  <ArrowUpRight className="size-4 opacity-70" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
