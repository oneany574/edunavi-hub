import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  ChevronRight,
  Coins,
  GraduationCap,
  Languages,
  Plane,
  Search,
  Sparkles,
  Stamp,
  Users,
} from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { destinations, type Destination } from "@/lib/edufinder-extras";

const regions = ["All", "Americas", "Europe", "Asia", "Oceania"] as const;

export const Route = createFileRoute("/study-abroad")({
  head: () => ({
    meta: [
      { title: "Study Abroad — 38 countries decoded | EduFinder" },
      {
        name: "description",
        content:
          "Compare tuition, living cost, exams, intakes, visas, and post-study work for top study-abroad destinations.",
      },
      { property: "og:title", content: "Study Abroad — EduFinder" },
      {
        property: "og:description",
        content: "Side-by-side comparison of the world's best study destinations.",
      },
    ],
  }),
  component: StudyAbroadPage,
});

function StudyAbroadPage() {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState<(typeof regions)[number]>("All");

  const list = useMemo(() => {
    return destinations.filter((d) => {
      if (region !== "All" && d.region !== region) return false;
      if (q.trim()) {
        const n = q.toLowerCase();
        return (
          d.country.toLowerCase().includes(n) ||
          d.topUniversities.some((u) => u.toLowerCase().includes(n)) ||
          d.popularExams.some((e) => e.toLowerCase().includes(n))
        );
      }
      return true;
    });
  }, [q, region]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-brand via-brand to-academic text-brand-foreground">
          <div className="pointer-events-none absolute inset-0 -z-0 opacity-50">
            <div className="absolute -top-32 right-10 size-[520px] rounded-full bg-gold/30 blur-3xl" />
            <div className="absolute -bottom-32 left-10 size-[420px] rounded-full bg-academic/40 blur-3xl" />
          </div>
          <div className="container-page relative py-16 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-foreground/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                  <Plane className="size-3" /> Study abroad
                </span>
                <h1 className="font-display mt-5 text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl">
                  Pick the country
                  <br /> that fits your future.
                </h1>
                <p className="mt-4 max-w-xl text-base text-brand-foreground/80">
                  Compare 38 destinations across tuition, living cost, visa speed, exams,
                  intakes, and post-study work in one normalized view.
                </p>
                <div className="mt-7 flex items-center gap-2 rounded-full border border-brand-foreground/20 bg-brand-foreground/5 px-3 py-2">
                  <Search className="ml-1 size-4 text-brand-foreground/60" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Try ‘Germany’, ‘Russell Group’, ‘DAAD’"
                    className="w-full bg-transparent py-2 text-sm text-brand-foreground placeholder:text-brand-foreground/50 focus:outline-none"
                  />
                </div>
              </div>

              <ul className="grid grid-cols-2 gap-3">
                {[
                  { label: "Destinations", value: "38", icon: Plane },
                  { label: "Universities", value: "4,280", icon: GraduationCap },
                  { label: "Visa types decoded", value: "120+", icon: Stamp },
                  { label: "Counselors on call", value: "230", icon: Users },
                ].map(({ label, value, icon: Icon }) => (
                  <li key={label} className="rounded-2xl bg-brand-foreground/5 p-4">
                    <Icon className="size-4 text-gold" />
                    <p className="font-display mt-3 text-2xl font-semibold">{value}</p>
                    <p className="text-xs text-brand-foreground/70">{label}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Region pills */}
        <section className="border-b border-border bg-card">
          <div className="container-page flex flex-wrap items-center gap-2 py-4">
            <span className="mr-2 text-[11px] font-bold uppercase tracking-[0.22em] text-foreground/60">
              Region
            </span>
            {regions.map((r) => {
              const active = r === region;
              return (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRegion(r)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-brand text-brand-foreground"
                      : "bg-secondary text-foreground/80 hover:bg-secondary/80"
                  }`}
                >
                  {r}
                </button>
              );
            })}
          </div>
        </section>

        {/* Grid of destinations */}
        <section className="container-page py-12">
          <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {list.map((d) => (
              <DestinationCard key={d.slug} d={d} />
            ))}
            {list.length === 0 && (
              <li className="col-span-full rounded-3xl border border-dashed border-border bg-card p-10 text-center">
                <p className="font-display text-xl">No destinations match.</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try clearing your filters or searching for a country.
                </p>
              </li>
            )}
          </ul>
        </section>

        {/* Step planner */}
        <section className="container-page py-14">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
            <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-start">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/70">
                  <Sparkles className="size-3 text-gold" /> Your 6-month plan
                </span>
                <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                  From shortlist to boarding pass.
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Every step laid out — so you never miss a deadline or a document.
                </p>
                <Link
                  to="/counseling"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-brand-foreground"
                >
                  Book free counseling <ArrowRight className="size-4" />
                </Link>
              </div>

              <ol className="relative space-y-5 border-l border-border pl-6">
                {[
                  { t: "Shortlist 8–12 universities", d: "Match programs to your scores, budget, and target outcome." },
                  { t: "Book & ace your exams", d: "TOEFL / IELTS / GRE / GMAT — plan attempts 3 months before deadlines." },
                  { t: "Polish your application", d: "SOPs, LORs, transcripts, financials, scholarship essays." },
                  { t: "Accept & apply for visa", d: "Deposit on best offer, gather visa docs, schedule appointment." },
                  { t: "Pre-departure", d: "Forex, accommodation, insurance, packing list — sorted." },
                ].map((s, i) => (
                  <li key={s.t} className="relative">
                    <span className="absolute -left-[33px] grid size-8 place-items-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
                      {i + 1}
                    </span>
                    <p className="font-semibold text-foreground">{s.t}</p>
                    <p className="text-sm text-muted-foreground">{s.d}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function DestinationCard({ d }: { d: Destination }) {
  return (
    <li>
      <article
        className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/10`}
      >
        <div
          className={`relative flex items-end justify-between bg-gradient-to-br p-5 text-brand-foreground ${d.heroAccent} min-h-[140px]`}
        >
          <div>
            <p className="text-5xl">{d.flag}</p>
            <h3 className="font-display mt-3 text-2xl font-semibold leading-tight">
              {d.country}
            </h3>
            <p className="mt-1 max-w-[28ch] text-xs text-brand-foreground/80">{d.tagline}</p>
          </div>
          <span className="rounded-full bg-brand-foreground/15 px-2.5 py-1 text-[11px] font-bold text-brand-foreground/90">
            {d.costIndex}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5">
          <ul className="grid grid-cols-2 gap-3 text-xs">
            <Cell icon={Coins} label="Tuition" value={d.tuitionRange} />
            <Cell icon={CalendarDays} label="Living / mo" value={d.liveCostMonthly} />
            <Cell icon={Briefcase} label="Post-study work" value={d.postStudyWork} />
            <Cell icon={Languages} label="English-taught" value={d.englishTaught ? "Yes" : "Mixed"} />
          </ul>

          <div className="rounded-2xl bg-secondary/60 p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/60">
              Popular exams
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {d.popularExams.slice(0, 4).map((e) => (
                <span
                  key={e}
                  className="rounded-full bg-background px-2 py-0.5 text-[11px] font-semibold text-foreground/80"
                >
                  {e}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/60">
              Top universities
            </p>
            <p className="mt-1 line-clamp-1 text-xs text-foreground/80">
              {d.topUniversities.join(" · ")}
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
            <span className="text-xs text-muted-foreground">
              {d.internationalStudents} intl. students
            </span>
            <Link
              to="/counseling"
              className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold text-brand-foreground transition-transform group-hover:-translate-y-0.5"
            >
              Plan my move <ChevronRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </article>
    </li>
  );
}

function Cell({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <li className="rounded-xl bg-background p-2.5">
      <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-foreground/60">
        <Icon className="size-3" /> {label}
      </span>
      <p className="mt-1 text-xs font-semibold text-foreground">{value}</p>
    </li>
  );
}
