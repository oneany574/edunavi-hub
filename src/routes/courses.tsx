import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Clock,
  Filter,
  GraduationCap,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { courses, streams, type Course } from "@/lib/edufinder-data";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Browse Courses — UG, PG, Diplomas, Doctorates | EduFinder" },
      {
        name: "description",
        content:
          "Discover 2,000+ courses across engineering, management, medical, design, law, and more. Filter by level, duration, mode, and fees.",
      },
      { property: "og:title", content: "Browse Courses — EduFinder" },
      { property: "og:description", content: "Filterable course catalog across UG, PG, diplomas, and doctorates." },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: CoursesPage,
});

const LEVELS = ["UG", "PG", "Diploma", "Doctorate"] as const;
const MODES = ["Full-time", "Online", "Hybrid"] as const;

function CoursesPage() {
  const [q, setQ] = useState("");
  const [stream, setStream] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [mode, setMode] = useState<string | null>(null);
  const [sort, setSort] = useState<"popular" | "rating" | "duration" | "fees">("popular");

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    let list = courses.filter((c) => {
      if (stream && c.stream !== stream) return false;
      if (level && c.level !== level) return false;
      if (mode && c.mode !== mode) return false;
      if (ql && !(`${c.name} ${c.shortName} ${c.description}`.toLowerCase().includes(ql))) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating;
      if (sort === "duration") return a.durationMonths - b.durationMonths;
      if (sort === "fees") return a.feesMin - b.feesMin;
      return b.collegesOffering - a.collegesOffering;
    });
    return list;
  }, [q, stream, level, mode, sort]);

  const clearAll = () => {
    setQ("");
    setStream(null);
    setLevel(null);
    setMode(null);
  };
  const activeCount = [stream, level, mode].filter(Boolean).length + (q ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand via-brand to-academic text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_90%,rgba(255,200,80,0.18),transparent_55%)]" />
        <div className="container-page relative py-14 md:py-20">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-white/70">
            <Sparkles className="size-3.5 text-gold" /> Course catalog
          </div>
          <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.05] tracking-tight md:text-6xl">
            Find a course that
            <span className="block text-gold">earns its place in your life.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/80 md:text-lg">
            {courses.length}+ programs across UG, PG, diplomas, and doctorates — with real fee bands, salary
            ranges, and the colleges that actually offer them.
          </p>

          <div className="mt-8 flex max-w-2xl items-center gap-2 rounded-full bg-white/95 p-2 text-foreground shadow-2xl">
            <Search className="ml-3 size-5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search BTech, MBA, design, data science…"
              className="flex-1 bg-transparent px-2 py-2 text-sm outline-none"
            />
            {q && (
              <button onClick={() => setQ("")} className="grid size-8 place-items-center rounded-full hover:bg-secondary">
                <X className="size-4" />
              </button>
            )}
            <button className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Sticky filter bar */}
      <div className="sticky top-[88px] z-30 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="container-page flex items-center gap-3 overflow-x-auto py-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Filter className="size-3.5" /> Filters
          </div>

          <Pill active={!level} onClick={() => setLevel(null)}>All levels</Pill>
          {LEVELS.map((l) => (
            <Pill key={l} active={level === l} onClick={() => setLevel(level === l ? null : l)}>
              {l}
            </Pill>
          ))}

          <div className="mx-1 h-5 w-px bg-border" />

          <Pill active={!mode} onClick={() => setMode(null)}>Any mode</Pill>
          {MODES.map((m) => (
            <Pill key={m} active={mode === m} onClick={() => setMode(mode === m ? null : m)}>
              {m}
            </Pill>
          ))}

          {activeCount > 0 && (
            <button
              onClick={clearAll}
              className="ml-auto shrink-0 inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-bold hover:bg-secondary"
            >
              <X className="size-3" /> Clear
            </button>
          )}
        </div>
      </div>

      <div className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          {/* Sidebar — streams */}
          <aside className="lg:sticky lg:top-[170px] lg:self-start">
            <p className="font-mono-tight text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              Browse by stream
            </p>
            <div className="mt-3 flex flex-col gap-1">
              <button
                onClick={() => setStream(null)}
                className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                  !stream ? "bg-brand text-brand-foreground" : "hover:bg-secondary"
                }`}
              >
                <span>All streams</span>
                <span className="font-mono-tight text-xs opacity-70">{courses.length}</span>
              </button>
              {streams.map((s) => {
                const count = courses.filter((c) => c.stream === s.slug).length;
                if (!count) return null;
                return (
                  <button
                    key={s.slug}
                    onClick={() => setStream(stream === s.slug ? null : s.slug)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                      stream === s.slug ? "bg-brand text-brand-foreground" : "hover:bg-secondary"
                    }`}
                  >
                    <span>{s.name}</span>
                    <span className="font-mono-tight text-xs opacity-70">{count}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">{filtered.length}</strong> courses
                {stream && ` in ${streams.find((s) => s.slug === stream)?.name}`}
              </p>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono-tight font-bold uppercase tracking-widest text-muted-foreground">
                  Sort
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold focus:border-academic focus:outline-none"
                >
                  <option value="popular">Most popular</option>
                  <option value="rating">Highest rated</option>
                  <option value="duration">Shortest first</option>
                  <option value="fees">Lowest fees</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="mt-12 rounded-3xl border border-dashed border-border p-12 text-center">
                <p className="font-display text-2xl">No courses match those filters</p>
                <p className="mt-2 text-sm text-muted-foreground">Try clearing a filter or broadening your search.</p>
                <button
                  onClick={clearAll}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {filtered.map((c, i) => (
                  <CourseCard key={c.slug} course={c} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

function Pill({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors ${
        active
          ? "bg-brand text-brand-foreground"
          : "bg-secondary text-foreground/70 hover:bg-secondary/70 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  const dur =
    course.durationMonths >= 12
      ? `${(course.durationMonths / 12).toFixed(course.durationMonths % 12 === 0 ? 0 : 1)} yrs`
      : `${course.durationMonths} mo`;
  return (
    <Link
      to="/courses/$slug"
      params={{ slug: course.slug }}
      className="group ef-fade-up flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-academic/30 hover:shadow-[0_30px_60px_-30px] hover:shadow-brand/30"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className={`relative h-32 overflow-hidden bg-gradient-to-br ${course.heroAccent} text-white`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_60%)]" />
        <div className="absolute left-5 top-5 flex items-center gap-2">
          <span className="font-mono-tight rounded-full bg-black/30 backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest">
            {course.level}
          </span>
          <span className="rounded-full bg-white/15 backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest">
            {course.mode}
          </span>
        </div>
        <div className="absolute bottom-4 left-5 right-5">
          <p className="font-display text-2xl leading-tight">{course.shortName}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-bold text-foreground group-hover:text-academic transition-colors">
            {course.name}
          </h3>
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-academic" />
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{course.description}</p>

        <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4">
          <Mini icon={Clock} label="Duration" value={dur} />
          <Mini icon={GraduationCap} label="Colleges" value={`${course.collegesOffering.toLocaleString()}`} />
          <Mini icon={TrendingUp} label="Avg salary" value={course.avgSalary} />
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-gold-soft px-2 py-0.5 text-[10px] font-bold text-brand">
            <Star className="size-3 fill-gold text-gold" /> {course.rating}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-foreground/70">
            <Users className="size-3" /> {course.studentsEnrolled}
          </span>
          {course.relatedExams.slice(0, 2).map((e) => (
            <span key={e} className="rounded-full bg-academic/10 px-2 py-0.5 text-[10px] font-semibold text-academic">
              {e}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <p className="font-mono-tight text-sm font-bold">{course.feesRange}</p>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-academic">
            <BookOpen className="size-3.5" /> Explore
          </span>
        </div>
      </div>
    </Link>
  );
}

function Mini({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="font-mono-tight flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
        <Icon className="size-3" /> {label}
      </p>
      <p className="mt-1 text-xs font-bold text-foreground">{value}</p>
    </div>
  );
}
