import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Award,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  FileCheck,
  Mail,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { getScholarship, scholarships, type Scholarship } from "@/lib/edufinder-extras";

export const Route = createFileRoute("/scholarships/$slug")({
  loader: ({ params }) => {
    const s = getScholarship(params.slug);
    if (!s) throw notFound();
    return s;
  },
  head: ({ loaderData }) => {
    const s = loaderData;
    if (!s) return { meta: [{ title: "Scholarship — EduFinder" }] };
    return {
      meta: [
        { title: `${s.name} — ${s.amount} | EduFinder` },
        { name: "description", content: s.about },
        { property: "og:title", content: `${s.name} — ${s.amount}` },
        { property: "og:description", content: s.about },
      ],
    };
  },
  notFoundComponent: ScholarshipNotFound,
  component: ScholarshipDetailPage,
});

function ScholarshipDetailPage() {
  const s = Route.useLoaderData() as Scholarship;
  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(s.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
  );
  const related = scholarships
    .filter((x) => x.slug !== s.slug && (x.region === s.region || x.type === s.type))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section
          className={`relative overflow-hidden border-b border-border bg-gradient-to-br text-brand-foreground ${s.heroAccent}`}
        >
          <div className="container-page relative py-14 lg:py-20">
            <Link
              to="/scholarships"
              className="inline-flex items-center gap-2 text-xs font-semibold text-brand-foreground/80 hover:text-brand-foreground"
            >
              <ArrowLeft className="size-3.5" /> All scholarships
            </Link>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold">
                  {s.provider}
                </p>
                <h1 className="font-display mt-2 text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
                  {s.name}
                </h1>
                <p className="mt-4 max-w-2xl text-base text-brand-foreground/85">{s.about}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-brand-foreground/10 px-3 py-1 text-xs font-semibold text-brand-foreground/90"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-brand-foreground/10 p-6 backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                  Award value
                </p>
                <p className="font-display mt-2 text-4xl font-semibold leading-none">{s.amount}</p>
                <p className="mt-1 text-xs text-brand-foreground/70">
                  {s.type} · {s.level} · {s.renewable ? "Renewable" : "One-time"}
                </p>
                <dl className="mt-5 grid grid-cols-2 gap-3 text-xs">
                  <Stat label="Deadline" value={`${daysLeft}d left`} />
                  <Stat label="Awards / yr" value={`${s.awardsPerYear}`} />
                  <Stat label="Acceptance" value={`${s.acceptanceRate}%`} />
                  <Stat label="Country" value={s.country} />
                </dl>
                <button
                  type="button"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-brand transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="size-4" /> Start application
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="container-page grid gap-10 py-14 lg:grid-cols-[1fr_320px]">
          <article className="space-y-10">
            <Block title="Coverage" icon={Award}>
              <ul className="grid gap-2 sm:grid-cols-2">
                {s.coverage.map((c) => (
                  <li key={c} className="flex items-start gap-2 rounded-2xl bg-card p-4 text-sm">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-academic" />
                    {c}
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Eligibility" icon={Target}>
              <ul className="space-y-2">
                {s.eligibility.map((e) => (
                  <li key={e} className="flex items-start gap-2 text-sm text-foreground/80">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gold" />
                    {e}
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Documents required" icon={FileCheck}>
              <ul className="flex flex-wrap gap-2">
                {s.documents.map((d) => (
                  <li
                    key={d}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground/80"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="How to apply" icon={ChevronRight}>
              <ol className="relative space-y-5 border-l border-border pl-6">
                {s.process.map((p, i) => (
                  <li key={p.step} className="relative">
                    <span className="absolute -left-[31px] grid size-7 place-items-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
                      {i + 1}
                    </span>
                    <p className="font-semibold text-foreground">{p.step}</p>
                    <p className="text-sm text-muted-foreground">{p.detail}</p>
                  </li>
                ))}
              </ol>
            </Block>

            {related.length > 0 && (
              <Block title="You may also qualify for" icon={Users}>
                <ul className="grid gap-3 md:grid-cols-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        to="/scholarships/$slug"
                        params={{ slug: r.slug }}
                        className="block rounded-2xl border border-border bg-card p-4 transition-colors hover:border-brand"
                      >
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gold">
                          {r.type}
                        </p>
                        <p className="mt-1 font-semibold text-foreground">{r.name}</p>
                        <p className="mt-2 text-xs text-muted-foreground">{r.amount}</p>
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
                Key dates
              </p>
              <ul className="mt-3 space-y-3 text-sm">
                <DateRow
                  icon={CalendarDays}
                  label="Applications open"
                  value={new Date(s.applicationsOpen).toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                />
                <DateRow
                  icon={CalendarDays}
                  label="Deadline"
                  value={new Date(s.deadline).toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                  highlight
                />
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/60">
                Contact
              </p>
              {s.contact?.email && (
                <a
                  href={`mailto:${s.contact.email}`}
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
                >
                  <Mail className="size-4" /> {s.contact.email}
                </a>
              )}
              {s.url && (
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground"
                >
                  <ExternalLink className="size-4" /> Provider site
                </a>
              )}
            </div>

            <div className="rounded-3xl bg-brand p-5 text-brand-foreground">
              <p className="font-display text-lg font-semibold">Need help applying?</p>
              <p className="mt-1 text-sm text-brand-foreground/75">
                Book a free 15-minute scholarship strategy call with a counselor.
              </p>
              <Link
                to="/counseling"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-bold text-brand"
              >
                Book a call <ChevronRight className="size-3.5" />
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

function DateRow({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <li className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4 text-muted-foreground" />
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p
          className={`text-sm font-semibold ${
            highlight ? "text-destructive" : "text-foreground"
          }`}
        >
          {value}
        </p>
      </div>
    </li>
  );
}

function ScholarshipNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container-page py-24 text-center">
        <h1 className="font-display text-4xl">Scholarship not found</h1>
        <p className="mt-3 text-muted-foreground">
          It may have closed for the year. Browse the full directory below.
        </p>
        <Link
          to="/scholarships"
          className="mt-6 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground"
        >
          All scholarships
        </Link>
      </section>
      <SiteFooter />
    </div>
  );
}
