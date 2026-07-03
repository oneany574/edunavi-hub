import { createFileRoute } from "@tanstack/react-router";
import { KpiGrid, PageHeader } from "@/components/panel/module-page";
import { Card, CardContent } from "@/components/ui/card";
import { collegeKpis } from "@/lib/panel-data";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/portal/college/analytics")({ component: Analytics });

function Analytics() {
  const rows = [
    { source: "Organic search", views: 12801, apps: 480 },
    { source: "EduFinder homepage", views: 6402, apps: 214 },
    { source: "Comparison tool", views: 2801, apps: 188 },
    { source: "Scholarships page", views: 1620, apps: 96 },
    { source: "News mentions", views: 1178, apps: 42 },
  ];
  const max = Math.max(...rows.map((r) => r.views));

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Institution analytics"
        description="Traffic, conversion, and applicant funnel — 30-day window."
      />
      <KpiGrid items={collegeKpis} />

      <Card>
        <CardContent className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold">Traffic sources → applications</h3>
            <Badge variant="secondary" className="text-[10px] font-bold uppercase">Last 30 days</Badge>
          </div>
          <ul className="space-y-3">
            {rows.map((r) => (
              <li key={r.source} className="grid grid-cols-[1fr_auto] gap-3">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>{r.source}</span>
                    <span className="text-muted-foreground">{r.views.toLocaleString()} views · {r.apps} apps</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-brand" style={{ width: `${(r.views / max) * 100}%` }} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
