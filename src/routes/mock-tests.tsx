import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Clock, Filter, PlayCircle, Star, Users } from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { mockTests } from "@/lib/edufinder-more";

export const Route = createFileRoute("/mock-tests")({
  head: () => ({
    meta: [
      { title: "Free Mock Tests — Practice IELTS, PTE, SAT, GRE | EduFinder" },
      { name: "description", content: "Take unlimited free mock tests for IELTS, PTE, SAT, GRE and more. Instant scoring, detailed answer keys, and progress tracking." },
      { property: "og:title", content: "Free Mock Tests — EduFinder" },
      { property: "og:description", content: "Practice IELTS, PTE, SAT and GRE with realistic mock tests. Free forever." },
    ],
  }),
  component: MockTestsPage,
});

const categories = ["All", "English Proficiency", "Graduate Tests", "Undergraduate Tests", "Engineering"] as const;

function MockTestsPage() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return mockTests.filter((t) => {
      if (cat !== "All" && t.category !== cat) return false;
      if (q && !`${t.title} ${t.exam}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [cat, q]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-gradient-to-br from-brand via-academic to-brand text-white">
        <div className="container-page py-16 md:py-20">
          <span className="font-mono-tight rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] backdrop-blur">
            100% free · unlimited attempts
          </span>
          <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.05] tracking-tight md:text-6xl">
            Free mock tests, real-exam feel.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">
            Timed, auto-scored practice papers for IELTS, PTE, SAT, GRE and more. See mistakes, review answers, retake as often as you need.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/90">
            <div><span className="font-display text-3xl text-gold">{mockTests.length}+</span> live tests</div>
            <div><span className="font-display text-3xl text-gold">60k+</span> attempts logged</div>
            <div><span className="font-display text-3xl text-gold">4.6★</span> average rating</div>
          </div>
        </div>
      </section>

      <div className="container-page py-10">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search IELTS, SAT, GRE…"
            className="w-full rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-academic/40 md:max-w-sm"
          />
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter className="size-4 shrink-0 text-muted-foreground" />
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                  cat === c ? "bg-brand text-brand-foreground" : "bg-secondary text-foreground/70 hover:bg-secondary/70"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <Link
              key={t.slug}
              to="/mock-tests/$slug"
              params={{ slug: t.slug }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/10"
            >
              <div className={`bg-gradient-to-br ${t.heroAccent} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <span className="font-mono-tight rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">
                    {t.exam}
                  </span>
                  <span className="rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold text-brand">FREE</span>
                </div>
                <p className="font-display mt-6 text-2xl leading-tight">{t.title}</p>
                <p className="mt-2 text-xs text-white/80">{t.category}</p>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm text-muted-foreground">{t.summary}</p>
                <div className="mt-5 grid grid-cols-3 gap-3 text-xs">
                  <div className="rounded-xl bg-secondary p-3">
                    <Clock className="mb-1 size-3.5 text-academic" />
                    <p className="font-bold">{t.durationMin} min</p>
                  </div>
                  <div className="rounded-xl bg-secondary p-3">
                    <PlayCircle className="mb-1 size-3.5 text-academic" />
                    <p className="font-bold">{t.totalQuestions} Qs</p>
                  </div>
                  <div className="rounded-xl bg-secondary p-3">
                    <Star className="mb-1 size-3.5 fill-gold text-gold" />
                    <p className="font-bold">{t.rating}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="size-3.5" /> {t.attempts.toLocaleString()} attempts
                  </span>
                  <span className="inline-flex items-center gap-1 font-bold text-brand group-hover:gap-2 transition-all">
                    Start test <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-sm text-muted-foreground">No mock tests match those filters.</p>
        )}
      </div>

      <SiteFooter />
    </div>
  );
}
