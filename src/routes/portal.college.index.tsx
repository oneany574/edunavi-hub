import { createFileRoute, Link } from "@tanstack/react-router";
import { KpiGrid, PageHeader } from "@/components/panel/module-page";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { collegeKpis } from "@/lib/panel-data";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/portal/college/")({ component: PortalHome });

function PortalHome() {
  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="Welcome back, Dr. Kumar"
        description="Manipal Institute of Technology · claimed since Mar 2024. Here's how your institution is performing."
      />
      <KpiGrid items={collegeKpis} />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="text-sm font-bold">Profile completeness</h3>
            <div className="mt-3 flex items-end gap-4">
              <p className="font-display text-4xl">86%</p>
              <p className="pb-1 text-xs text-muted-foreground">4 tasks left to hit 100% and unlock “Editor's Pick” tag.</p>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
              <div className="h-full rounded-full bg-gradient-to-r from-brand to-academic" style={{ width: "86%" }} />
            </div>
            <ul className="mt-5 space-y-2 text-sm">
              {[
                ["Add 4 more campus photos", false],
                ["Update B.Tech CSE syllabus (2027)", false],
                ["Publish placement report FY26", false],
                ["Enable virtual tour", false],
                ["Verify accreditation documents", true],
                ["Add 3 signature courses", true],
              ].map(([t, done]) => (
                <li key={t as string} className="flex items-center gap-2">
                  <CheckCircle2 className={`size-4 ${done ? "text-success" : "text-muted-foreground/40"}`} />
                  <span className={done ? "text-muted-foreground line-through" : ""}>{t}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-brand to-academic text-brand-foreground">
          <CardContent className="p-6">
            <Badge className="border-0 bg-white/20 text-brand-foreground">This week</Badge>
            <h3 className="font-display mt-3 text-2xl">112 new applications</h3>
            <p className="mt-1 text-xs text-brand-foreground/80">Top program: B.Tech Computer Science · 48 applications</p>

            <div className="mt-6 grid gap-2">
              {[
                { label: "Reply to 3 flagged reviews", to: "/portal/college/reviews" },
                { label: "Approve gallery uploads (5)", to: "/portal/college/gallery" },
                { label: "Publish new scholarship", to: "/portal/college/scholarships" },
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

            <Button variant="secondary" className="mt-4 w-full">Open live listing</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
