import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  Flame,
  PlayCircle,
  Sparkles,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { examPreps, getExamPrep, type ExamPrep } from "@/lib/edufinder-extras";

export const Route = createFileRoute("/exam-prep/$slug")({
  loader: ({ params }) => {
    const e = getExamPrep(params.slug);
    if (!e) throw notFound();
    return e;
  },
  head: ({ loaderData }) => {
    const e = loaderData;
    if (!e) return { meta: [{ title: "Exam prep — EduFinder" }] };
    return {
      meta: [
        { title: `${e.name} practice & mock tests | EduFinder` },
        { name: "description", content: `${e.tagline} ${e.acceptedBy}` },
        { property: "og:title", content: `${e.name} practice — EduFinder` },
        { property: "og:description", content: e.tagline },
      ],
    };
  },
  notFoundComponent: NotFound,
  component: ExamPrepDetailPage,
});

const resourceIcon: Record<string, typeof PlayCircle> = {
  Video: PlayCircle,
  PDF: FileText,
  Mock: Target,
  "Live class": Users,
};

function ExamPrepDetailPage() {
  const e = Route.useLoaderData() as ExamPrep;
  const related = examPreps.filter((x) => x.slug !== e.slug && x.category === e.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section
          className={`relative overflow-hidden border-b border-border bg-gradient-to-br text-brand-foreground ${e.heroAccent}`}
        >
          <div className="container-page relative py-14 lg:py-20">
            <Link
              to="/exam-prep"
              className="inline-flex items-center gap-2 text-xs font-semibold text-brand-foreground/80 hover:text-brand-foreground"
            >
              <ArrowLeft className="size-3.5" /> All exam prep
            </Link>
            <div className="mt-6 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
                  {e.category}
                </p>
                <h1 className="font-display mt-2 text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl">
                  {e.name}
                </h1>
                <p className="mt-3 text-base text-brand-foreground/90">{e.fullName}</p>
                <p className="mt-4 max-w-2xl text-base text-brand-foreground/85">{e.tagline}</p>
                <p className="mt-3 max-w-2xl text-sm text-brand-foreground/70">{e.acceptedBy}</p>
              </div>

              <div className="rounded-3xl bg-brand-foreground/10 p-6 backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                  Test snapshot
                </p>
                <dl className="mt-3 grid grid-cols-2 gap-3 text-xs">
                  <Stat label="Duration" value={e.duration.split("(")[0].trim()} />
                  <Stat label="Fee" value={e.feeRange} />
                  <Stat label="Score range" value={e.scoreRange} />
                  <Stat label="Validity" value={e.validity} />
                  <Stat label="Mocks" value={`${e.mockSeries}`} />
                  <Stat label="Practice" value={`${e.practiceTests}`} />
                </dl>
                <button
                  type="button"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-brand transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="size-4" /> Start free mock
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="container-page grid gap-10 py-14 lg:grid-cols-[1fr_320px]">
          <article className="space-y-10">
            <Block title="Exam sections" icon={BookOpen}>
              <ul className="grid gap-3">
                {e.sections.map((s, i) => (
                  <li
                    key={s.name}
                    className="rounded-2xl border border-border bg-card p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="grid size-8 place-items-center rounded-xl bg-secondary text-xs font-bold">
                          {i + 1}
                        </span>
                        <p className="font-semibold text-foreground">{s.name}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3.5" /> {s.duration}
                      </span>
                    </div>
                    <p className="mt-2 pl-11 text-sm text-muted-foreground">{s.details}</p>
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Top tips from coaches" icon={Target}>
              <ul className="space-y-2">
                {e.tips.map((t) => (
                  <li
                    key={t}
                    className="flex items-start gap-2 rounded-2xl bg-card p-4 text-sm"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-academic" />
                    {t}
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Free resources" icon={Flame}>
              <ul className="grid gap-3 md:grid-cols-2">
                {e.resources.map((r) => {
                  const Icon = resourceIcon[r.type] ?? FileText;
                  return (
                    <li
                      key={r.title}
                      className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-brand"
                    >
                      <span className="grid size-10 place-items-center rounded-xl bg-secondary text-foreground">
                        <Icon className="size-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gold">
                          {r.type}
                        </p>
                        <p className="truncate font-semibold text-foreground">{r.title}</p>
                      </div>
                      <ArrowRight className="ml-auto size-4 text-muted-foreground" />
                    </li>
                  );
                })}
              </ul>
            </Block>

            <Block title="Top scorers say" icon={Trophy}>
              <ul className="grid gap-3 md:grid-cols-2">
                {e.topScorers.map((t) => (
                  <li
                    key={t.name}
                    className="rounded-2xl border border-border bg-card p-5"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-foreground">{t.name}</p>
                      <span className="rounded-full bg-gold-soft px-2.5 py-1 text-[11px] font-bold text-brand">
                        {t.score}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{t.story}</p>
                  </li>
                ))}
              </ul>
            </Block>

            {related.length > 0 && (
              <Block title="Related prep" icon={Award}>
                <ul className="grid gap-3 md:grid-cols-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        to="/exam-prep/$slug"
                        params={{ slug: r.slug }}
                        className="block rounded-2xl border border-border bg-card p-4 transition-colors hover:border-brand"
                      >
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gold">
                          {r.category}
                        </p>
                        <p className="mt-1 font-semibold text-foreground">{r.name}</p>
                        <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                          {r.tagline}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Block>
            )}
          </article>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/60">
                Difficulty
              </p>
              <div className="mt-3 flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-2.5 flex-1 rounded-full ${
                      i < e.difficulty ? "bg-gold" : "bg-secondary"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {e.difficulty}/5 — based on average prep hours required
              </p>
            </div>

            <div className="rounded-3xl bg-brand p-5 text-brand-foreground">
              <p className="font-display text-lg font-semibold">Personal study plan</p>
              <p className="mt-1 text-sm text-brand-foreground/75">
                Tell us your target score & date — we'll build a week-by-week plan.
              </p>
              <Link
                to="/counseling"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-bold text-brand"
              >
                Build my plan <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Block({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <span className="grid size-8 place-items-center rounded-xl bg-secondary text-foreground">
          <Icon className="size-4" />
        </span>
        <h2 className="font-display text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-brand-foreground/5 p-3">
      <p className="text-[10px] uppercase tracking-wider text-brand-foreground/60">{label}</p>
      <p className="mt-1 text-sm font-bold text-brand-foreground">{value}</p>
    </div>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container-page py-24 text-center">
        <h1 className="font-display text-4xl">Prep series not found</h1>
        <Link
          to="/exam-prep"
          className="mt-6 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground"
        >
          All exam prep
        </Link>
      </section>
      <SiteFooter />
    </div>
  );
}
