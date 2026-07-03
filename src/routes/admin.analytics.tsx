import { createFileRoute } from "@tanstack/react-router";
import { KpiGrid, PageHeader } from "@/components/panel/module-page";
import { Card, CardContent } from "@/components/ui/card";
import { adminKpis } from "@/lib/panel-data";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/admin/analytics")({ component: Analytics });

function Analytics() {
  const bars = [42, 61, 55, 78, 64, 82, 91, 74, 88, 96, 82, 104];
  const max = Math.max(...bars);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Analytics"
        description="Growth, engagement and revenue signals across the entire platform."
      />
      <KpiGrid items={adminKpis.slice(0, 4)} />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h3 className="text-sm font-bold">Monthly signups</h3>
                <p className="text-xs text-muted-foreground">Trailing 12 months, students only</p>
              </div>
              <Badge variant="secondary" className="text-[10px] font-bold uppercase">+24% YoY</Badge>
            </div>
            <div className="flex h-56 items-end gap-2">
              {bars.map((v, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-brand to-academic"
                    style={{ height: `${(v / max) * 100}%` }}
                  />
                  <span className="text-[10px] font-bold text-muted-foreground">{months[i]}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-bold">Top acquisition channels</h3>
            <ul className="mt-4 space-y-3">
              {[
                { name: "Organic search", pct: 46 },
                { name: "Direct", pct: 22 },
                { name: "Referral (blogs)", pct: 14 },
                { name: "Paid — Google", pct: 11 },
                { name: "Social", pct: 7 },
              ].map((c) => (
                <li key={c.name}>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>{c.name}</span>
                    <span className="text-muted-foreground">{c.pct}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-brand" style={{ width: `${c.pct}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
