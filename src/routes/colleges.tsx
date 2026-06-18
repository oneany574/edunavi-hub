import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Grid3x3,
  List,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { CollegeCard } from "@/components/edufinder/college-card";
import { colleges, streams } from "@/lib/edufinder-data";

export const Route = createFileRoute("/colleges")({
  head: () => ({
    meta: [
      { title: "Browse 4,000+ colleges — EduFinder" },
      {
        name: "description",
        content:
          "Filter colleges by stream, country, fees, ranking, exams, and placement package. Compare side by side and shortlist your top picks.",
      },
      { property: "og:title", content: "Browse colleges — EduFinder" },
      { property: "og:description", content: "Filter and compare 4,000+ colleges." },
    ],
    links: [{ rel: "canonical", href: "/colleges" }],
  }),
  component: CollegesPage,
});

const ownerships = ["Private", "Public", "Deemed", "Autonomous"] as const;
const sortOptions = ["Top ranked", "Highest package", "Lowest fees", "Most reviews"] as const;

function CollegesPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<(typeof sortOptions)[number]>("Top ranked");
  const [selectedStreams, setSelectedStreams] = useState<string[]>([]);
  const [selectedOwnerships, setSelectedOwnerships] = useState<string[]>([]);
  const [feeMax, setFeeMax] = useState(60000);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = colleges.filter((c) => {
      if (query) {
        const q = query.toLowerCase();
        if (
          !c.name.toLowerCase().includes(q) &&
          !c.city.toLowerCase().includes(q) &&
          !c.country.toLowerCase().includes(q)
        )
          return false;
      }
      if (selectedStreams.length && !c.streams.some((s) => selectedStreams.includes(s)))
        return false;
      if (selectedOwnerships.length && !selectedOwnerships.includes(c.ownership)) return false;
      // crude fee filter (USD-normalized)
      const feeUSD =
        c.feesCurrency === "USD"
          ? c.feesMin
          : c.feesCurrency === "GBP"
            ? c.feesMin * 1.27
            : c.feesMin / 83;
      if (feeUSD > feeMax) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "Top ranked":
          return a.ranking - b.ranking;
        case "Highest package":
          return b.avgPackage - a.avgPackage;
        case "Lowest fees":
          return a.feesMin - b.feesMin;
        case "Most reviews":
          return b.ratingCount - a.ratingCount;
      }
    });
    return list;
  }, [query, selectedStreams, selectedOwnerships, feeMax, sort]);

  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (v: string) => {
    setter((arr) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]));
  };

  const filtersContent = (
    <div className="space-y-8">
      <FilterGroup title="Stream">
        <div className="space-y-2">
          {streams.map((s) => (
            <label
              key={s.slug}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground/80 hover:text-foreground"
            >
              <input
                type="checkbox"
                checked={selectedStreams.includes(s.slug)}
                onChange={() => toggle(setSelectedStreams)(s.slug)}
                className="size-4 rounded border-border accent-brand"
              />
              <span>{s.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {colleges.filter((c) => c.streams.includes(s.slug)).length}
              </span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Ownership">
        <div className="space-y-2">
          {ownerships.map((o) => (
            <label
              key={o}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground/80 hover:text-foreground"
            >
              <input
                type="checkbox"
                checked={selectedOwnerships.includes(o)}
                onChange={() => toggle(setSelectedOwnerships)(o)}
                className="size-4 rounded border-border accent-brand"
              />
              <span>{o}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Max fees (USD / yr)">
        <input
          type="range"
          min={1000}
          max={80000}
          step={1000}
          value={feeMax}
          onChange={(e) => setFeeMax(Number(e.target.value))}
          className="w-full accent-brand"
        />
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>$1k</span>
          <span className="font-mono-tight font-bold text-foreground">
            ${feeMax.toLocaleString()}
          </span>
          <span>$80k</span>
        </div>
      </FilterGroup>

      <button
        onClick={() => {
          setSelectedStreams([]);
          setSelectedOwnerships([]);
          setFeeMax(60000);
          setQuery("");
        }}
        className="w-full rounded-full border border-border py-2 text-xs font-bold uppercase tracking-widest text-foreground/70 transition-colors hover:bg-secondary"
      >
        Reset filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Page header */}
      <section className="border-b border-border bg-surface">
        <div className="container-page py-14">
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
            Browse colleges
          </span>
          <h1 className="font-display mt-3 text-4xl tracking-tight text-foreground md:text-5xl">
            {filtered.length} institutions matching your search
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Premium colleges and universities across 38 countries — filtered
            and ranked for you.
          </p>

          {/* Search + sort bar */}
          <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-border bg-card px-4">
              <Search className="size-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by college, city, country..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as (typeof sortOptions)[number])}
                className="rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium outline-none focus:border-academic"
              >
                {sortOptions.map((s) => (
                  <option key={s} value={s}>
                    Sort: {s}
                  </option>
                ))}
              </select>
              <div className="flex items-center rounded-2xl border border-border bg-card p-1">
                <button
                  onClick={() => setView("grid")}
                  className={`grid size-9 place-items-center rounded-xl transition-colors ${view === "grid" ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  aria-label="Grid view"
                >
                  <Grid3x3 className="size-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`grid size-9 place-items-center rounded-xl transition-colors ${view === "list" ? "bg-brand text-brand-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  aria-label="List view"
                >
                  <List className="size-4" />
                </button>
              </div>
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-bold lg:hidden"
              >
                <SlidersHorizontal className="size-4" /> Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <div className="rounded-3xl border border-border bg-card p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                  Filters
                </p>
                <div className="mt-6">{filtersContent}</div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div>
            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border bg-card p-16 text-center">
                <Sparkles className="mx-auto size-8 text-gold" />
                <h3 className="font-display mt-4 text-2xl">No colleges match those filters</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try widening your fee range or removing a stream filter.
                </p>
              </div>
            ) : view === "grid" ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((c, i) => (
                  <CollegeCard key={c.slug} college={c} index={i} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filtered.map((c) => (
                  <Link
                    key={c.slug}
                    to="/colleges/$slug"
                    params={{ slug: c.slug }}
                    className="group grid grid-cols-[120px_minmax(0,1fr)_auto] items-center gap-6 rounded-3xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-academic/30 hover:shadow-lg"
                  >
                    <div className={`aspect-square rounded-2xl bg-gradient-to-br ${c.heroAccent}`} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono-tight rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                          #{c.ranking} {c.rankingLabel}
                        </span>
                        {c.claimed && (
                          <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-gold">
                            Claimed
                          </span>
                        )}
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-foreground group-hover:text-academic transition-colors">
                        {c.name}
                      </h3>
                      <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="size-3" /> {c.city}, {c.country} • {c.ownership}
                      </p>
                    </div>
                    <div className="hidden text-right md:block">
                      <p className="font-mono-tight text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                        Avg package
                      </p>
                      <p className="font-display text-2xl font-semibold text-foreground">
                        ${(c.avgPackage / 1000).toFixed(0)}k
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-card p-6">
            <div className="mb-6 flex items-center justify-between">
              <p className="font-display text-2xl">Filters</p>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close"
                className="grid size-9 place-items-center rounded-full bg-secondary"
              >
                <X className="size-4" />
              </button>
            </div>
            {filtersContent}
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full rounded-full bg-brand py-3.5 text-sm font-bold text-brand-foreground"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-foreground">
        {title}
      </p>
      {children}
    </div>
  );
}
