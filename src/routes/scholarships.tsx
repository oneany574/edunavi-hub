import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Award,
  CalendarDays,
  Filter,
  GraduationCap,
  Search,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { scholarships, type Scholarship } from "@/lib/edufinder-extras";

const regions = ["All", "Global", "Americas", "Europe", "Asia", "Oceania"] as const;
const types = ["All", "Merit", "Need", "Merit + Need", "Diversity", "Athletic", "Research"] as const;
const levels = ["All", "UG", "PG", "Doctorate", "Any"] as const;

export const Route = createFileRoute("/scholarships")({
  head: () => ({
    meta: [
      { title: "Scholarships — $2.4B indexed | EduFinder" },
      {
        name: "description",
        content:
          "Discover 800+ merit, need, diversity, and research scholarships. Filter by country, level, and stream.",
      },
      { property: "og:title", content: "Scholarships — EduFinder" },
      {
        property: "og:description",
        content: "Filterable directory of global scholarships for UG, PG and Doctorate.",
      },
    ],
  }),
  component: ScholarshipsPage,
});

function ScholarshipsPage() {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState<(typeof regions)[number]>("All");
  const [type, setType] = useState<(typeof types)[number]>("All");
  const [level, setLevel] = useState<(typeof levels)[number]>("All");
  const [sort, setSort] = useState<"deadline" | "amount" | "selective">("deadline");

  const filtered = useMemo(() => {
    let list = scholarships.filter((s) => {
      if (region !== "All" && s.region !== region) return false;
      if (type !== "All" && s.type !== type) return false;
      if (level !== "All" && s.level !== level) return false;
      if (q.trim()) {
        const needle = q.toLowerCase();
        return (
          s.name.toLowerCase().includes(needle) ||
          s.provider.toLowerCase().includes(needle) ||
          s.tags.some((t) => t.toLowerCase().includes(needle))
        );
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "deadline") return a.deadline.localeCompare(b.deadline);
      if (sort === "amount") return b.amountUSD - a.amountUSD;
      return a.acceptanceRate - b.acceptanceRate;
    });
    return list;
  }, [q, region, type, level, sort]);

  const totalValue = scholarships.reduce((acc, s) => acc + s.amountUSD * s.awardsPerYear, 0);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-brand text-brand-foreground">
          <div className="pointer-events-none absolute inset-0 -z-0 opacity-30">
            <div className="absolute -top-32 right-20 size-[480px] rounded-full bg-gold/40 blur-3xl" />
            <div className="absolute -bottom-24 -left-10 size-[420px] rounded-full bg-academic/40 blur-3xl" />
          </div>
          <div className="container-page relative grid gap-10 py-16 lg:grid-cols-[1.2fr_1fr] lg:py-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-foreground/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                <Sparkles className="size-3" />
                $2.4B indexed
              </span>
              <h1 className="font-display mt-5 text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl">
                Find the scholarship
                <br /> that funds your future.
              </h1>
              <p className="mt-4 max-w-xl text-base text-brand-foreground/75">
                Filter 800+ merit, need, diversity, athletic, and research awards across 38
                countries. No paywalls. No spam.
              </p>

              <div className="mt-8 flex items-center gap-2 rounded-full border border-brand-foreground/20 bg-brand-foreground/5 px-3 py-2">
                <Search className="ml-1 size-4 text-brand-foreground/60" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Try ‘MBA London’, ‘women in STEM’, ‘need-based MBBS’"
                  className="w-full bg-transparent py-2 text-sm text-brand-foreground placeholder:text-brand-foreground/50 focus:outline-none"
                />
              </div>
            </div>

            <ul className="grid grid-cols-2 gap-3 self-end">
              {[
                { label: "Scholarships indexed", value: "800+", icon: Award },
                {
                  label: "Total annual value",
                  value: `$${Math.round(totalValue / 1_000_000)}M`,
                  icon: TrendingUp,
                },
                { label: "Countries", value: "38", icon: GraduationCap },
                { label: "Recipients last year", value: "12,400", icon: Users },
              ].map(({ label, value, icon: Icon }) => (
                <li key={label} className="rounded-2xl bg-brand-foreground/5 p-4">
                  <Icon className="size-4 text-gold" />
                  <p className="font-display mt-3 text-2xl font-semibold">{value}</p>
                  <p className="text-xs text-brand-foreground/70">{label}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Filters + list */}
        <section className="container-page grid gap-8 py-14 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <FilterGroup title="Region" options={regions} value={region} onChange={setRegion} />
            <FilterGroup title="Type" options={types} value={type} onChange={setType} />
            <FilterGroup title="Level" options={levels} value={level} onChange={setLevel} />
          </aside>

          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
                scholarships match your filters
              </p>
              <label className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground">
                <Filter className="size-3.5 text-muted-foreground" />
                Sort:
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  className="bg-transparent outline-none"
                >
                  <option value="deadline">Closing soon</option>
                  <option value="amount">Highest amount</option>
                  <option value="selective">Most selective</option>
                </select>
              </label>
            </div>

            <ul className="grid gap-4">
              {filtered.map((s) => (
                <ScholarshipCard key={s.slug} s={s} />
              ))}
              {filtered.length === 0 && (
                <li className="rounded-3xl border border-dashed border-border bg-card p-10 text-center">
                  <p className="font-display text-xl">No matches — try widening filters.</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Or browse all 800+ awards by clearing the search.
                  </p>
                </li>
              )}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function FilterGroup<T extends string>({
  title,
  options,
  value,
  onChange,
}: {
  title: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/60">
        {title}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? "bg-brand text-brand-foreground"
                  : "bg-secondary text-foreground/80 hover:bg-secondary/80"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ScholarshipCard({ s }: { s: Scholarship }) {
  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(s.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
  );
  const urgent = daysLeft <= 30;
  return (
    <li>
      <Link
        to="/scholarships/$slug"
        params={{ slug: s.slug }}
        className="group block overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/5"
      >
        <div className="grid gap-0 sm:grid-cols-[180px_1fr]">
          <div
            className={`relative hidden bg-gradient-to-br p-5 text-brand-foreground sm:flex sm:flex-col sm:justify-between ${s.heroAccent}`}
          >
            <Award className="size-6 text-gold" />
            <div>
              <p className="font-display text-2xl font-semibold leading-none">{s.amount}</p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-brand-foreground/80">
                {s.type} · {s.level}
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                  {s.provider}
                </p>
                <h3 className="font-display mt-1 text-xl font-semibold leading-tight text-foreground group-hover:text-brand">
                  {s.name}
                </h3>
              </div>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold ${
                  urgent
                    ? "bg-destructive/10 text-destructive"
                    : "bg-academic/10 text-academic"
                }`}
              >
                {urgent ? `Closes in ${daysLeft}d` : `${daysLeft}d left`}
              </span>
            </div>

            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{s.about}</p>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
              <span className="inline-flex items-center gap-1.5 text-foreground/80">
                <CalendarDays className="size-3.5 text-muted-foreground" />
                Deadline {new Date(s.deadline).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
              </span>
              <span className="inline-flex items-center gap-1.5 text-foreground/80">
                <Users className="size-3.5 text-muted-foreground" />
                {s.awardsPerYear} awards · {s.acceptanceRate}% acceptance
              </span>
              <span className="inline-flex items-center gap-1.5 text-foreground/80">
                {s.country}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {s.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-foreground/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
