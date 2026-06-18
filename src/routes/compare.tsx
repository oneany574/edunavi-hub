import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search, Star, X } from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import {
  type College,
  colleges,
  formatFees,
  formatPackage,
} from "@/lib/edufinder-data";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare colleges side by side — EduFinder" },
      {
        name: "description",
        content:
          "Compare up to 4 colleges by fees, placements, rankings, exams accepted, and student reviews.",
      },
      { property: "og:title", content: "Compare colleges — EduFinder" },
      { property: "og:description", content: "Side-by-side comparison of fees, placements, and rankings." },
    ],
    links: [{ rel: "canonical", href: "/compare" }],
  }),
  component: ComparePage,
});

const MAX = 4;

const rows: { label: string; render: (c: College) => React.ReactNode }[] = [
  { label: "Ownership", render: (c) => c.ownership },
  { label: "Established", render: (c) => c.established },
  { label: "Location", render: (c) => `${c.city}, ${c.country}` },
  {
    label: "Rating",
    render: (c) => (
      <span className="inline-flex items-center gap-1">
        <Star className="size-3.5 fill-gold text-gold" /> {c.rating}{" "}
        <span className="text-xs text-muted-foreground">({c.ratingCount})</span>
      </span>
    ),
  },
  { label: "Ranking", render: (c) => `#${c.ranking} ${c.rankingLabel}` },
  { label: "Annual fees", render: (c) => formatFees(c) },
  { label: "Avg package", render: (c) => formatPackage(c) },
  { label: "Placement rate", render: (c) => `${c.placementRate}%` },
  { label: "Student ratio", render: (c) => c.studentRatio },
  { label: "International", render: (c) => `${c.internationalShare}%` },
  { label: "Courses", render: (c) => c.courseCount },
  { label: "Exams accepted", render: (c) => c.examsAccepted.join(", ") },
  { label: "Top recruiters", render: (c) => c.topRecruiters.slice(0, 3).join(", ") },
];

function ComparePage() {
  const [selected, setSelected] = useState<string[]>([
    colleges[0].slug,
    colleges[1].slug,
    colleges[2].slug,
  ]);
  const [picker, setPicker] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const cols = selected.map((slug) => colleges.find((c) => c.slug === slug)!);
  const available = colleges.filter(
    (c) => !selected.includes(c.slug) && (!query || c.name.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="border-b border-border bg-surface">
        <div className="container-page py-14">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
            Compare
          </span>
          <h1 className="font-display mt-3 text-4xl tracking-tight md:text-5xl">
            Compare up to {MAX} colleges, side by side.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Fees, placements, rankings, exams, facilities — laid out cleanly
            so you can decide with clarity.
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        {/* Header row */}
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: `200px repeat(${MAX}, minmax(0, 1fr))` }}
        >
          <div />
          {Array.from({ length: MAX }).map((_, i) => {
            const c = cols[i];
            return c ? (
              <div
                key={i}
                className="relative overflow-hidden rounded-3xl border border-border bg-card p-5"
              >
                <button
                  onClick={() => setSelected((s) => s.filter((_, idx) => idx !== i))}
                  aria-label="Remove"
                  className="absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-secondary text-foreground/60 hover:bg-destructive hover:text-white"
                >
                  <X className="size-3.5" />
                </button>
                <div className={`aspect-[16/10] rounded-2xl bg-gradient-to-br ${c.heroAccent}`} />
                <p className="font-mono-tight mt-4 text-[10px] font-bold uppercase tracking-widest text-gold">
                  #{c.ranking} {c.rankingLabel}
                </p>
                <h3 className="mt-1 text-base font-bold text-foreground">{c.name}</h3>
                <p className="text-xs text-muted-foreground">
                  {c.city}, {c.country}
                </p>
              </div>
            ) : (
              <button
                key={i}
                onClick={() => setPicker(i)}
                className="flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-border bg-card text-muted-foreground transition-all hover:border-academic hover:text-academic"
              >
                <div className="grid size-12 place-items-center rounded-full bg-secondary">
                  <Plus className="size-5" />
                </div>
                <span className="text-sm font-bold">Add college</span>
              </button>
            );
          })}
        </div>

        {/* Comparison table */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card">
          {rows.map((row, idx) => (
            <div
              key={row.label}
              className={`grid items-center gap-4 px-5 py-4 text-sm ${idx % 2 === 0 ? "bg-card" : "bg-surface"}`}
              style={{ gridTemplateColumns: `200px repeat(${MAX}, minmax(0, 1fr))` }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {row.label}
              </span>
              {Array.from({ length: MAX }).map((_, i) => {
                const c = cols[i];
                return (
                  <div key={i} className="text-foreground font-semibold">
                    {c ? row.render(c) : <span className="text-muted-foreground/40">—</span>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* Picker */}
      {picker !== null && (
        <div className="fixed inset-0 z-[60] grid place-items-center px-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setPicker(null)} />
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-card">
            <div className="flex items-center justify-between border-b border-border p-5">
              <p className="font-display text-xl">Add a college</p>
              <button
                onClick={() => setPicker(null)}
                aria-label="Close"
                className="grid size-8 place-items-center rounded-full bg-secondary"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="flex items-center gap-2 border-b border-border px-5 py-3">
              <Search className="size-4 text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search colleges..."
                className="w-full bg-transparent py-2 text-sm outline-none"
              />
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {available.length === 0 ? (
                <p className="p-6 text-center text-sm text-muted-foreground">
                  No more colleges to add.
                </p>
              ) : (
                available.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => {
                      setSelected((s) => {
                        const next = [...s];
                        next[picker] = c.slug;
                        return next.filter(Boolean);
                      });
                      setPicker(null);
                      setQuery("");
                    }}
                    className="flex w-full items-center gap-3 rounded-2xl p-3 text-left transition-colors hover:bg-secondary"
                  >
                    <div className={`size-12 shrink-0 rounded-xl bg-gradient-to-br ${c.heroAccent}`} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">{c.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {c.city}, {c.country} • #{c.ranking}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
