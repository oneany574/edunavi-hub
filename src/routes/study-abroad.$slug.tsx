import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  Coins,
  GraduationCap,
  HelpCircle,
  Languages,
  MapPin,
  Plane,
  Stamp,
} from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import {
  destinations,
  getDestination,
  getDestinationDetail,
  type Destination,
  type DestinationDetail,
} from "@/lib/edufinder-extras";

export const Route = createFileRoute("/study-abroad/$slug")({
  loader: ({ params }) => {
    const d = getDestination(params.slug);
    if (!d) throw notFound();
    return { d, detail: getDestinationDetail(params.slug) };
  },
  head: ({ loaderData }) => {
    const d = loaderData?.d;
    if (!d) return { meta: [{ title: "Destination — EduFinder" }] };
    return {
      meta: [
        { title: `Study in ${d.country} — Tuition, visa & top universities | EduFinder` },
        { name: "description", content: d.tagline },
        { property: "og:title", content: `Study in ${d.country}` },
        { property: "og:description", content: d.tagline },
      ],
    };
  },
  notFoundComponent: NotFound,
  component: DestinationPage,
});

function DestinationPage() {
  const { d, detail } = Route.useLoaderData() as {
    d: Destination;
    detail: DestinationDetail | undefined;
  };
  const related = destinations.filter((x) => x.slug !== d.slug && x.region === d.region).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section
          className={`relative overflow-hidden border-b border-border bg-gradient-to-br text-brand-foreground ${d.heroAccent}`}
        >
          <div className="container-page relative py-14 lg:py-20">
            <Link
              to="/study-abroad"
              className="inline-flex items-center gap-2 text-xs font-semibold text-brand-foreground/80 hover:text-brand-foreground"
            >
              <ArrowLeft className="size-3.5" /> All destinations
            </Link>
            <div className="mt-6 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
              <div>
                <p className="text-7xl">{d.flag}</p>
                <h1 className="font-display mt-4 text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl">
                  Study in {d.country}
                </h1>
                <p className="mt-4 max-w-2xl text-base text-brand-foreground/85">{d.tagline}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {d.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded-full bg-brand-foreground/10 px-3 py-1 text-xs font-semibold text-brand-foreground/90"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-brand-foreground/10 p-6 backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                  Quick facts
                </p>
                <dl className="mt-3 grid grid-cols-2 gap-3 text-xs">
                  <Stat label="Tuition" value={d.tuitionRange} />
                  <Stat label="Living / mo" value={d.liveCostMonthly} />
                  <Stat label="Post-study" value={d.postStudyWork} />
                  <Stat label="Visa" value={d.visaProcessing} />
                  <Stat label="Intl. students" value={d.internationalStudents} />
                  <Stat label="Cost index" value={d.costIndex} />
                </dl>
                <Link
                  to="/counseling"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-brand transition-transform hover:-translate-y-0.5"
                >
                  Plan my move <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="container-page grid gap-10 py-14 lg:grid-cols-[1fr_320px]">
          <article className="space-y-10">
            {detail?.overview && (
              <Block title="Overview" icon={Plane}>
                <p className="text-base leading-relaxed text-foreground/85">{detail.overview}</p>
              </Block>
            )}

            {detail?.whyStudy && (
              <Block title={`Why ${d.country}?`} icon={Award}>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {detail.whyStudy.map((w) => (
                    <li key={w} className="flex items-start gap-2 rounded-2xl bg-card p-4 text-sm">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-academic" />
                      {w}
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            <Block title="Top universities" icon={GraduationCap}>
              <ul className="grid gap-2 sm:grid-cols-2">
                {d.topUniversities.map((u) => (
                  <li
                    key={u}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-sm font-semibold"
                  >
                    <span className="grid size-8 place-items-center rounded-xl bg-secondary">
                      <Building2 className="size-4" />
                    </span>
                    {u}
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Popular exams" icon={Award}>
              <ul className="flex flex-wrap gap-2">
                {d.popularExams.map((e) => (
                  <li
                    key={e}
                    className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-foreground/80"
                  >
                    {e}
                  </li>
                ))}
              </ul>
            </Block>

            {detail?.costBreakdown && (
              <Block title="Cost breakdown" icon={Coins}>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {detail.costBreakdown.map((c) => (
                    <li
                      key={c.label}
                      className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 text-sm"
                    >
                      <span className="text-foreground/70">{c.label}</span>
                      <span className="font-semibold">{c.value}</span>
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {detail?.topCities && (
              <Block title="Top cities" icon={MapPin}>
                <ul className="grid gap-3 md:grid-cols-2">
                  {detail.topCities.map((c) => (
                    <li
                      key={c.name}
                      className="rounded-2xl border border-border bg-card p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-foreground">{c.name}</p>
                        <span className="text-[11px] font-bold text-gold">{c.costIndex}</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{c.vibe}</p>
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {detail?.scholarships && (
              <Block title="Top scholarships" icon={Award}>
                <ul className="space-y-2">
                  {detail.scholarships.map((s) => (
                    <li
                      key={s.name}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card p-4 text-sm"
                    >
                      <div>
                        <p className="font-semibold text-foreground">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.coverage}</p>
                      </div>
                      <span className="text-xs font-semibold text-academic">{s.deadline}</span>
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {detail?.visaSteps && (
              <Block title="Visa pathway" icon={Stamp}>
                <ol className="relative space-y-5 border-l border-border pl-6">
                  {detail.visaSteps.map((v, i) => (
                    <li key={v.step} className="relative">
                      <span className="absolute -left-[31px] grid size-7 place-items-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
                        {i + 1}
                      </span>
                      <p className="font-semibold text-foreground">{v.step}</p>
                      <p className="text-sm text-muted-foreground">{v.detail}</p>
                    </li>
                  ))}
                </ol>
              </Block>
            )}

            {detail?.faqs && (
              <Block title="Frequently asked" icon={HelpCircle}>
                <ul className="space-y-3">
                  {detail.faqs.map((f) => (
                    <li key={f.q} className="rounded-2xl border border-border bg-card p-4">
                      <p className="font-semibold text-foreground">{f.q}</p>
                      <p className="mt-1.5 text-sm text-muted-foreground">{f.a}</p>
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {related.length > 0 && (
              <Block title="Compare with" icon={Plane}>
                <ul className="grid gap-3 md:grid-cols-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        to="/study-abroad/$slug"
                        params={{ slug: r.slug }}
                        className="block rounded-2xl border border-border bg-card p-4 transition-colors hover:border-brand"
                      >
                        <p className="text-2xl">{r.flag}</p>
                        <p className="mt-2 font-semibold text-foreground">{r.country}</p>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
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
                At a glance
              </p>
              <ul className="mt-3 space-y-3 text-sm">
                <Row icon={CalendarDays} label="Intakes" value={d.intakes.join(", ")} />
                <Row icon={Briefcase} label="Work while study" value={d.workWhileStudying} />
                <Row
                  icon={Languages}
                  label="English-taught"
                  value={d.englishTaught ? "Yes" : "Mostly local language"}
                />
                <Row icon={Stamp} label="Visa processing" value={d.visaProcessing} />
              </ul>
            </div>

            <div className="rounded-3xl bg-brand p-5 text-brand-foreground">
              <p className="font-display text-lg font-semibold">Talk to a counselor</p>
              <p className="mt-1 text-sm text-brand-foreground/75">
                Free 15-minute call to map your shortlist, scholarships & visa plan.
              </p>
              <Link
                to="/counseling"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-bold text-brand"
              >
                Book a call <ArrowRight className="size-3.5" />
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

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4 text-muted-foreground" />
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </li>
  );
}

function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container-page py-24 text-center">
        <h1 className="font-display text-4xl">Destination not found</h1>
        <p className="mt-3 text-muted-foreground">Browse all 38 destinations below.</p>
        <Link
          to="/study-abroad"
          className="mt-6 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground"
        >
          All destinations
        </Link>
      </section>
      <SiteFooter />
    </div>
  );
}
