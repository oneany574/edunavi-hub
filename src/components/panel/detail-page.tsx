import { Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Clock, Edit3, ExternalLink, Save, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { EntityDetail } from "@/lib/panel-detail-data";
import type { Status } from "@/lib/panel-data";

const statusStyles: Record<Status, string> = {
  Active: "bg-success/15 text-success",
  Pending: "bg-gold-soft text-brand",
  Rejected: "bg-destructive/15 text-destructive",
  Draft: "bg-muted text-muted-foreground",
  Published: "bg-academic/10 text-academic",
  Flagged: "bg-destructive/15 text-destructive",
  Approved: "bg-success/15 text-success",
  Suspended: "bg-muted text-muted-foreground",
};

type Props = {
  backTo: string;
  backLabel: string;
  detail: EntityDetail;
};

export function AdminDetail({ backTo, backLabel, detail }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 text-xs text-muted-foreground">
        <Link to={backTo} className="inline-flex items-center gap-1.5 hover:text-foreground">
          <ArrowLeft className="size-3.5" /> {backLabel}
        </Link>
      </div>

      {/* Hero */}
      <Card className="overflow-hidden border-border">
        <CardContent className="p-0">
          <div className="bg-gradient-to-br from-brand to-academic p-6 text-brand-foreground md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">{detail.eyebrow}</p>
                <h1 className="font-display mt-2 text-3xl leading-tight tracking-tight md:text-4xl">{detail.title}</h1>
                {detail.subtitle && (
                  <p className="mt-2 max-w-2xl text-sm text-brand-foreground/80">{detail.subtitle}</p>
                )}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge className={`${statusStyles[detail.status]} border-0 font-semibold`}>{detail.status}</Badge>
                  <span className="rounded-full bg-brand-foreground/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest">
                    slug: {detail.slug}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="secondary" size="sm" className="gap-1.5">
                  <Edit3 className="size-3.5" /> Quick edit
                </Button>
                <Button size="sm" className="gap-1.5 bg-gold text-brand hover:bg-gold/90">
                  <Save className="size-3.5" /> Save changes
                </Button>
              </div>
            </div>
            {detail.hero.length > 0 && (
              <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                {detail.hero.map((h) => (
                  <div key={h.label} className="rounded-2xl bg-brand-foreground/10 p-4 backdrop-blur">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-foreground/70">{h.label}</p>
                    <p className="mt-1 text-lg font-bold">{h.value}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card className="border-border">
            <CardContent className="p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Summary</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{detail.summary}</p>
            </CardContent>
          </Card>

          {detail.sections.map((s) => (
            <Card key={s.title} className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-xl">{s.title}</h2>
                  <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                    <Edit3 className="size-3" /> Edit
                  </Button>
                </div>
                <Separator className="my-4" />
                {s.body && <p className="text-sm leading-relaxed text-foreground/90">{s.body}</p>}
                {s.bullets && (
                  <ul className="mt-2 space-y-2 text-sm">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.fields && (
                  <dl className="grid gap-3 sm:grid-cols-2">
                    {s.fields.map((f) => (
                      <div key={f.label} className="rounded-xl bg-secondary/50 p-3">
                        <dt className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          {f.label}
                        </dt>
                        <dd className="mt-1 text-sm font-semibold">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </CardContent>
            </Card>
          ))}

          {detail.related.map((group) => (
            <Card key={group.title} className="border-border">
              <CardContent className="p-6">
                <h2 className="font-display text-xl">{group.title}</h2>
                <Separator className="my-4" />
                <ul className="grid gap-2 sm:grid-cols-2">
                  {group.items.map((r) => (
                    <li
                      key={r.kind + r.name}
                      className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-3"
                    >
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          {r.kind}
                        </p>
                        <p className="mt-0.5 truncate text-sm font-semibold">{r.name}</p>
                        {r.hint && <p className="mt-0.5 text-xs text-muted-foreground">{r.hint}</p>}
                      </div>
                      <ExternalLink className="mt-1 size-3.5 shrink-0 text-muted-foreground" />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <aside className="space-y-6">
          <Card className="border-border">
            <CardContent className="p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Metadata</p>
              <dl className="mt-3 space-y-2 text-xs">
                {detail.meta.map((m) => (
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
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Activity</p>
              <ol className="mt-3 space-y-3">
                {detail.timeline.map((t, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-secondary">
                      <Clock className="size-3 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold">{t.event}</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        {t.actor} · {t.at}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card className="border-destructive/40 bg-destructive/5">
            <CardContent className="p-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-destructive">Danger zone</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Archiving hides this record from public listings. Deletion is permanent.
              </p>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm">
                  Archive
                </Button>
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
