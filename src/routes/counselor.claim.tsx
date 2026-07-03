import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/panel/module-page";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/counselor/claim")({ component: Claim });

const steps = [
  { n: 1, title: "Consultancy details", blurb: "Firm name, registration, HQ and destinations you serve." },
  { n: 2, title: "Identity verification", blurb: "Founder ID + firm registration certificate." },
  { n: 3, title: "Documents", blurb: "Upload MoUs, university partnerships and testimonials." },
  { n: 4, title: "Approval", blurb: "Reviewed within 3 business days by our compliance team." },
  { n: 5, title: "Consultancy dashboard", blurb: "Manage counselors, leads, and public listing." },
];

function Claim() {
  return (
    <>
      <PageHeader
        eyebrow="Upgrade"
        title="Claim your consultancy"
        description="Already run an agency with multiple counselors? Upgrade from independent to consultancy tier and manage your team."
        actions={
          <Button asChild className="gap-1.5 bg-brand text-brand-foreground hover:bg-brand/90">
            <Link to="/claim-consultancy">Start full claim <ArrowRight className="size-4" /></Link>
          </Button>
        }
      />

      <Card>
        <CardContent className="p-6">
          <h3 className="text-sm font-bold">Claim workflow — 5 steps</h3>
          <ol className="mt-5 space-y-3">
            {steps.map((s, i) => (
              <li key={s.n} className="flex items-start gap-3 rounded-lg border border-border p-4">
                <div className={`grid size-8 shrink-0 place-items-center rounded-full font-bold ${i === 0 ? "bg-brand text-brand-foreground" : "bg-secondary text-muted-foreground"}`}>
                  {i === 0 ? <CheckCircle2 className="size-4" /> : s.n}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{s.title}</p>
                    {i === 0 && <Badge className="border-0 bg-success/15 text-success">Draft saved</Badge>}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{s.blurb}</p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {[
          ["Manage a team of counselors", "Add sub-counselors, assign leads, share revenue with a split you control."],
          ["Public consultancy page", "Verified badge, testimonial section, and appointment booking widget."],
          ["Lead pipeline & CRM", "Track student enquiries from first message to enrolment."],
        ].map(([t, b]) => (
          <Card key={t}><CardContent className="p-5">
            <p className="text-sm font-bold">{t}</p>
            <p className="mt-1 text-xs text-muted-foreground">{b}</p>
          </CardContent></Card>
        ))}
      </div>
    </>
  );
}
