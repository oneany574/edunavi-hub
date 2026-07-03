import { createFileRoute } from "@tanstack/react-router";
import { KpiGrid, PageHeader, DataTable } from "@/components/panel/module-page";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { counselorEarningsRows, counselorKpis } from "@/lib/panel-data";
import { Wallet } from "lucide-react";

export const Route = createFileRoute("/counselor/earnings")({ component: Earnings });

function Earnings() {
  return (
    <>
      <PageHeader
        eyebrow="Money"
        title="Earnings & payouts"
        description="EduFinder holds funds for 24h post-session, then auto-payouts every Friday. Platform fee: 15%."
        actions={<Button className="gap-1.5 bg-brand text-brand-foreground hover:bg-brand/90"><Wallet className="size-4" /> Withdraw</Button>}
      />
      <KpiGrid items={counselorKpis} />

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {[
          { label: "Lifetime gross", value: "$68,240", note: "412 sessions" },
          { label: "Platform fee (15%)", value: "$10,236", note: "" },
          { label: "Net paid out", value: "$58,004", note: "38 payouts" },
        ].map((c) => (
          <Card key={c.label}>
            <CardContent className="p-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{c.label}</p>
              <p className="font-display mt-2 text-3xl leading-none">{c.value}</p>
              {c.note && <p className="mt-2 text-xs text-muted-foreground">{c.note}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-bold">Payout history</h3>
        <Badge variant="secondary" className="text-[10px] font-bold uppercase">Auto-payout: Fri, 11:59 PM IST</Badge>
      </div>
      <DataTable rows={counselorEarningsRows} actions={() => [{ label: "Download invoice" }, { label: "View breakdown" }]} />
    </>
  );
}
