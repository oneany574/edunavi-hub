import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, Mail, MapPin, Phone, FileText, MessageSquare, PhoneCall, StickyNote, CalendarClock, Save, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { getLeadDetail, type LeadDetail } from "@/lib/panel-leads";

export const Route = createFileRoute("/admin/leads/$slug")({
  loader: ({ params }) => {
    const d = getLeadDetail(params.slug);
    if (!d) throw notFound();
    return d;
  },
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.name ?? "Lead"} · Admin` }] }),
  notFoundComponent: () => (
    <div className="space-y-4">
      <Link to="/admin/leads" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-3.5" /> All leads
      </Link>
      <p className="text-sm">Lead not found.</p>
    </div>
  ),
  component: LeadDetailPage,
});

const activityIcons = {
  call: PhoneCall,
  email: Mail,
  note: StickyNote,
  meeting: CalendarClock,
} as const;

function LeadDetailPage() {
  const lead = Route.useLoaderData() as LeadDetail;
  return (
    <div className="space-y-6">
      <Link to="/admin/leads" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-3.5" /> All leads
      </Link>

      {/* Hero */}
      <Card className="overflow-hidden border-border">
        <CardContent className="p-0">
          <div className="bg-gradient-to-br from-brand to-academic p-6 text-brand-foreground md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">Lead · {lead.source}</p>
                <h1 className="font-display mt-2 text-3xl leading-tight tracking-tight md:text-4xl">{lead.name}</h1>
                <p className="mt-1 text-sm text-brand-foreground/80">{lead.interest} · intake {lead.intake}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge className="border-0 bg-success/20 font-semibold text-success">{lead.status}</Badge>
                  <span className="rounded-full bg-brand-foreground/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest">
                    Score {lead.score}/100
                  </span>
                  <span className="rounded-full bg-brand-foreground/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest">
                    Owner · {lead.assignedTo}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm" className="gap-1.5">
                  <PhoneCall className="size-3.5" /> Log call
                </Button>
                <Button size="sm" className="gap-1.5 bg-gold text-brand hover:bg-gold/90">
                  <Save className="size-3.5" /> Save changes
                </Button>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              <HeroStat icon={Mail} label="Email" value={lead.email} />
              <HeroStat icon={Phone} label="Phone" value={lead.phone} />
              <HeroStat icon={MapPin} label="Location" value={lead.location} />
              <HeroStat icon={Clock} label="Created" value={lead.createdAt} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card className="border-border">
            <CardContent className="p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Notes</p>
              <p className="mt-2 text-sm leading-relaxed">{lead.notes}</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-xl">Log activity</h2>
                <Button size="sm" className="gap-1.5 bg-brand text-brand-foreground hover:bg-brand/90">
                  <MessageSquare className="size-3.5" /> Send
                </Button>
              </div>
              <Separator className="my-4" />
              <Textarea placeholder="Write a note, log a call outcome, or draft an email…" className="min-h-24" />
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <h2 className="font-display text-xl">Activity feed</h2>
              <Separator className="my-4" />
              <ol className="space-y-4">
                {lead.activities.map((a, i) => {
                  const Icon = activityIcons[a.kind];
                  return (
                    <li key={i} className="flex gap-3">
                      <div className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-secondary">
                        <Icon className="size-4 text-brand" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          {a.kind} · {a.at}
                        </p>
                        <p className="mt-1 text-sm">{a.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <h2 className="font-display text-xl">Documents</h2>
              <Separator className="my-4" />
              <ul className="grid gap-2 sm:grid-cols-2">
                {lead.documents.map((d) => (
                  <li key={d.name} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-secondary">
                        <FileText className="size-4 text-brand" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">{d.name}</p>
                        <p className="text-[10px] text-muted-foreground">{d.size} · {d.uploadedAt}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs">View</Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card className="border-border">
            <CardContent className="p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Lead details</p>
              <dl className="mt-3 space-y-2 text-xs">
                {[
                  { label: "Interest", value: lead.interest },
                  { label: "Budget", value: lead.budget },
                  { label: "Intake", value: lead.intake },
                  { label: "Source", value: lead.source },
                  { label: "Assigned to", value: lead.assignedTo },
                  { label: "Lead score", value: `${lead.score}/100` },
                ].map((m) => (
                  <div key={m.label} className="flex items-start justify-between gap-3 border-b border-border/50 pb-2 last:border-0 last:pb-0">
                    <dt className="text-muted-foreground">{m.label}</dt>
                    <dd className="text-right font-semibold text-foreground">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Timeline</p>
              <ol className="mt-3 space-y-3">
                {lead.timeline.map((t, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-secondary">
                      <Clock className="size-3 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold">{t.event}</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">{t.actor} · {t.at}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card className="border-destructive/40 bg-destructive/5">
            <CardContent className="p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-destructive">Danger zone</p>
              <p className="mt-2 text-xs text-muted-foreground">Deleting a lead removes all associated activity permanently.</p>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm">Archive</Button>
                <Button variant="destructive" size="sm" className="gap-1.5">
                  <Trash2 className="size-3.5" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function HeroStat({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-brand-foreground/10 p-4 backdrop-blur">
      <div className="flex items-center gap-2">
        <Icon className="size-3.5 text-brand-foreground/70" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-foreground/70">{label}</p>
      </div>
      <p className="mt-1 truncate text-sm font-bold">{value}</p>
    </div>
  );
}
