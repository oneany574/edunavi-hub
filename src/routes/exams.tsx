import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Award, Calendar, Clock, Filter, Search } from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { exams } from "@/lib/edufinder-data";

export const Route = createFileRoute("/exams")({
  head: () => ({
    meta: [
      { title: "Entrance exams — Track every test in one place | EduFinder" },
      {
        name: "description",
        content:
          "Track entrance exams worldwide — application dates, exam patterns, syllabi, and participating colleges. SAT, GRE, GMAT, JEE, NEET, CUET, LSAT, CLAT and more.",
      },
      { property: "og:title", content: "Entrance exams — EduFinder" },
      { property: "og:description", content: "120+ exams. Calendars, patterns, prep guidance." },
    ],
  }),
  component: ExamsPage,
});

const statusColors: Record<string, string> = {
  Open: "bg-success/15 text-success",
  "Closing soon": "bg-gold-soft text-brand",
  Closed: "bg-secondary text-muted-foreground",
  Upcoming: "bg-academic/15 text-academic",
};

const streamFilters = ["All", "Engineering", "Medical", "Management", "Law"] as const;
const levelFilters = ["All", "National", "International", "State"] as const;

function ExamsPage() {
  const [query, setQuery] = useState("");
  const [stream, setStream] = useState<(typeof streamFilters)[number]>("All");
  const [level, setLevel] = useState<(typeof levelFilters)[number]>("All");

  const filtered = useMemo(() => {
    return exams.filter((e) => {
      if (stream !== "All" && e.stream !== stream && e.stream !== "All") return false;
      if (level !== "All" && e.level !== level) return false;
      if (
        query &&
        !`${e.name} ${e.fullName} ${e.conductingBody}`.toLowerCase().includes(query.toLowerCase())
      )
        return false;
      return true;
    });
  }, [query, stream, level]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-gradient-to-br from-brand via-academic to-brand text-white">
        <div className="container-page py-16 md:py-20">
          <span className="font-mono-tight rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] backdrop-blur">
            Entrance exams
          </span>
          <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.05] tracking-tight md:text-6xl">
            Every entrance exam, one calendar.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">
            Dates, patterns, syllabi, eligibility, fees, and participating colleges — for {exams.length}+ exams across regions.
          </p>

          {/* Search bar */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <label className="flex flex-1 items-center gap-3 rounded-full bg-white px-5 py-3 text-sm text-foreground shadow-xl">
              <Search className="size-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search SAT, JEE, NEET, GMAT…"
                className="flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
              />
            </label>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="sticky top-[88px] z-30 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="container-page flex flex-wrap items-center gap-3 py-3">
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <Filter className="size-3" /> Filters
          </span>
          <FilterRow label="Stream" values={streamFilters} current={stream} onChange={setStream} />
          <FilterRow label="Level" values={levelFilters} current={level} onChange={setLevel} />
          <span className="ml-auto text-xs font-bold text-muted-foreground">
            {filtered.length} exam{filtered.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      <div className="container-page py-12">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => (
            <Link
              key={e.slug}
              to="/exams/$slug"
              params={{ slug: e.slug }}
              className="group rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-academic/40 hover:shadow-xl"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand to-academic text-white">
                  <Award className="size-5" />
                </div>
                <span
                  className={`font-mono-tight rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${
                    statusColors[e.registrationStatus]
                  }`}
                >
                  {e.registrationStatus}
                </span>
              </div>
              <h3 className="font-display mt-5 text-2xl leading-tight">{e.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{e.fullName}</p>

              <div className="mt-5 grid gap-2 text-xs">
                <Row icon={Calendar} label="Exam date" value={e.examDate} />
                <Row icon={Clock} label="Applications close" value={e.applicationCloses} />
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {e.conductingBody}
                </span>
                <span className="flex items-center gap-1 text-xs font-bold text-academic group-hover:gap-2 transition-all">
                  View details <ArrowRight className="size-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-3xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
            No exams match the current filters.
          </div>
        )}
      </div>

      <SiteFooter />
    </div>
  );
}

function FilterRow<T extends string>({
  label,
  values,
  current,
  onChange,
}: {
  label: string;
  values: readonly T[];
  current: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/60">
        {label}
      </span>
      <div className="flex flex-wrap gap-1">
        {values.map((v) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
              current === v
                ? "bg-brand text-brand-foreground"
                : "bg-secondary text-foreground/70 hover:bg-secondary/70"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
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
    <div className="flex items-center justify-between gap-3">
      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
        <Icon className="size-3.5" /> {label}
      </span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}
