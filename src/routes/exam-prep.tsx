import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Flame,
  GraduationCap,
  Search,
  Target,
  Trophy,
} from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { examPreps, type ExamPrep } from "@/lib/edufinder-extras";

const categories = [
  "All",
  "English Proficiency",
  "Standardised Admissions",
  "Graduate Tests",
  "Subject Tests",
] as const;

export const Route = createFileRoute("/exam-prep")({
  head: () => ({
    meta: [
      { title: "Exam Preparation — PTE, IELTS, SAT, GRE & more | EduFinder" },
      {
        name: "description",
        content:
          "Free prep, full-length mocks, and curated resources for PTE, IELTS, SAT, GRE, GMAT, TOEFL, and JEE Main. Track your scores & climb the ranks.",
      },
      { property: "og:title", content: "Exam Preparation — EduFinder" },
      {
        property: "og:description",
        content: "Mock tests, masterclasses, and topper notes for every major entrance exam.",
      },
    ],
  }),
  component: ExamPrepPage,
});

function ExamPrepPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");

  const list = useMemo(() => {
    return examPreps.filter((e) => {
      if (cat !== "All" && e.category !== cat) return false;
      if (q.trim()) {
        const n = q.toLowerCase();
        return (
          e.name.toLowerCase().includes(n) ||
          e.fullName.toLowerCase().includes(n) ||
          e.tagline.toLowerCase().includes(n)
        );
      }
      return true;
    });
  }, [q, cat]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-brand via-academic to-brand text-brand-foreground">
          <div className="pointer-events-none absolute inset-0 -z-0 opacity-40">
            <div className="absolute -top-32 right-10 size-[520px] rounded-full bg-gold/30 blur-3xl" />
            <div className="absolute -bottom-32 left-10 size-[420px] rounded-full bg-academic/40 blur-3xl" />
          </div>
          <div className="container-page relative py-16 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-foreground/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                  <Flame className="size-3" /> Exam preparation
                </span>
                <h1 className="font-display mt-5 text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl">
                  Mock it.
                  <br /> Master it. Move on.
                </h1>
                <p className="mt-4 max-w-xl text-base text-brand-foreground/80">
                  Full-length mocks, AI-scored speaking, topper notes, and live correction —
                  for every major English & admissions exam.
                </p>
                <div className="mt-7 flex items-center gap-2 rounded-full border border-brand-foreground/20 bg-brand-foreground/5 px-3 py-2">
                  <Search className="ml-1 size-4 text-brand-foreground/60" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Try ‘PTE’, ‘IELTS speaking’, ‘SAT math’"
                    className="w-full bg-transparent py-2 text-sm text-brand-foreground placeholder:text-brand-foreground/50 focus:outline-none"
                  />
                </div>
              </div>

              <ul className="grid grid-cols-2 gap-3">
                {[
                  { label: "Exams covered", value: `${examPreps.length}`, icon: GraduationCap },
                  { label: "Free mocks", value: "154", icon: BookOpen },
                  { label: "Avg score lift", value: "+18%", icon: Target },
                  { label: "Top scorers", value: "1,200+", icon: Trophy },
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

        {/* Category pills */}
        <section className="border-b border-border bg-card">
          <div className="container-page flex flex-wrap items-center gap-2 py-4">
            <span className="mr-2 text-[11px] font-bold uppercase tracking-[0.22em] text-foreground/60">
              Category
            </span>
            {categories.map((c) => {
              const active = c === cat;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    active
                      ? "bg-brand text-brand-foreground"
                      : "bg-secondary text-foreground/80 hover:bg-secondary/80"
                  }`}
                >
                  {c}
                </button>
              );
            })}
            <span className="ml-auto text-xs font-bold text-muted-foreground">
              {list.length} exam{list.length === 1 ? "" : "s"}
            </span>
          </div>
        </section>

        {/* Grid */}
        <section className="container-page py-12">
          <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {list.map((e) => (
              <PrepCard key={e.slug} e={e} />
            ))}
            {list.length === 0 && (
              <li className="col-span-full rounded-3xl border border-dashed border-border bg-card p-10 text-center">
                <p className="font-display text-xl">No prep matches.</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try a different category or search term.
                </p>
              </li>
            )}
          </ul>
        </section>

        {/* CTA */}
        <section className="container-page py-14">
          <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/70">
                  <Trophy className="size-3 text-gold" /> Score guarantee
                </span>
                <h2 className="font-display mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
                  Hit your target score —<br /> or your next series is on us.
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  Every premium prep plan ships with a score-improvement guarantee. Don't hit
                  your target after 6 full mocks? Get the next series free.
                </p>
              </div>
              <Link
                to="/counseling"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-bold text-brand-foreground"
              >
                Talk to a prep coach <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function PrepCard({ e }: { e: ExamPrep }) {
  return (
    <li>
      <Link
        to="/exam-prep/$slug"
        params={{ slug: e.slug }}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/10"
      >
        <div
          className={`flex items-end justify-between bg-gradient-to-br p-5 text-brand-foreground ${e.heroAccent} min-h-[140px]`}
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
              {e.category}
            </p>
            <h3 className="font-display mt-2 text-3xl font-semibold leading-tight">
              {e.name}
            </h3>
            <p className="mt-1 max-w-[28ch] text-xs text-brand-foreground/80">{e.tagline}</p>
          </div>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`block size-1.5 rounded-full ${
                  i < e.difficulty ? "bg-gold" : "bg-brand-foreground/20"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5">
          <ul className="grid grid-cols-2 gap-3 text-xs">
            <Cell label="Duration" value={e.duration.split("(")[0].trim()} />
            <Cell label="Score range" value={e.scoreRange} />
            <Cell label="Fee" value={e.feeRange} />
            <Cell label="Validity" value={e.validity} />
          </ul>

          <div className="rounded-2xl bg-secondary/60 p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/60">
              What you get
            </p>
            <p className="mt-1.5 text-xs font-semibold text-foreground/80">
              {e.practiceTests} practice tests · {e.mockSeries} full mocks
            </p>
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="size-3" /> {e.format.split(",")[0]}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3.5 py-1.5 text-xs font-bold text-brand-foreground transition-transform group-hover:-translate-y-0.5">
              Start prep <ArrowRight className="size-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <li className="rounded-xl bg-background p-2.5">
      <p className="text-[10px] font-bold uppercase tracking-wider text-foreground/60">
        {label}
      </p>
      <p className="mt-1 text-xs font-semibold text-foreground">{value}</p>
    </li>
  );
}
