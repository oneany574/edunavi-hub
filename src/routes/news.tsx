import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Clock, Newspaper, Pin, Search } from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { newsItems, type NewsItem } from "@/lib/edufinder-extras";

const categories = [
  "All",
  "Admissions",
  "Exam Updates",
  "Policy",
  "Scholarships",
  "Rankings",
  "Study Abroad",
] as const;

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Updates — Admissions, exams & policy | EduFinder" },
      {
        name: "description",
        content:
          "Latest education news: exam notifications, admission deadlines, scholarship launches, visa policy, and university rankings.",
      },
      { property: "og:title", content: "News & Updates — EduFinder" },
      {
        property: "og:description",
        content: "Stay ahead of every admissions cycle with daily news from EduFinder.",
      },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");

  const sorted = useMemo(() => {
    return [...newsItems].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });
  }, []);

  const list = useMemo(() => {
    return sorted.filter((n) => {
      if (cat !== "All" && n.category !== cat) return false;
      if (q.trim()) {
        const t = q.toLowerCase();
        return (
          n.title.toLowerCase().includes(t) ||
          n.excerpt.toLowerCase().includes(t) ||
          n.tags.some((tag) => tag.toLowerCase().includes(t))
        );
      }
      return true;
    });
  }, [q, cat, sorted]);

  const featured = list[0];
  const rest = list.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="border-b border-border bg-gradient-to-br from-brand via-brand to-academic text-brand-foreground">
          <div className="container-page py-14 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-foreground/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                  <Newspaper className="size-3" /> News & updates
                </span>
                <h1 className="font-display mt-5 text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl">
                  Today in education.
                </h1>
                <p className="mt-4 max-w-xl text-base text-brand-foreground/80">
                  Exam notifications, admission deadlines, scholarship launches, visa policy,
                  and rankings — one feed, no fluff.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-brand-foreground/20 bg-brand-foreground/5 px-3 py-2">
                <Search className="ml-1 size-4 text-brand-foreground/60" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Try ‘JEE’, ‘UK visa’, ‘scholarship’"
                  className="w-full bg-transparent py-2 text-sm text-brand-foreground placeholder:text-brand-foreground/50 focus:outline-none"
                />
              </div>
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
              {list.length} update{list.length === 1 ? "" : "s"}
            </span>
          </div>
        </section>

        {/* Featured */}
        {featured && (
          <section className="container-page py-12">
            <Link
              to="/news/$slug"
              params={{ slug: featured.slug }}
              className="group block overflow-hidden rounded-3xl border border-border"
            >
              <div
                className={`flex flex-col gap-6 bg-gradient-to-br p-8 text-brand-foreground md:flex-row md:items-end md:p-12 ${featured.heroAccent}`}
              >
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {featured.pinned && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand">
                        <Pin className="size-3" /> Featured
                      </span>
                    )}
                    <span className="rounded-full bg-brand-foreground/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                      {featured.category}
                    </span>
                    <span className="text-[11px] text-brand-foreground/70">
                      {formatDate(featured.publishedAt)} · {featured.readTime}
                    </span>
                  </div>
                  <h2 className="font-display mt-4 text-3xl font-semibold leading-tight md:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm text-brand-foreground/80">
                    {featured.excerpt}
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 self-start rounded-full bg-brand-foreground/15 px-4 py-2 text-xs font-bold transition-transform group-hover:-translate-y-0.5">
                  Read story <ArrowRight className="size-3.5" />
                </span>
              </div>
            </Link>
          </section>
        )}

        {/* Grid */}
        <section className="container-page pb-16">
          <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((n) => (
              <NewsCard key={n.slug} n={n} />
            ))}
            {list.length === 0 && (
              <li className="col-span-full rounded-3xl border border-dashed border-border bg-card p-10 text-center">
                <p className="font-display text-xl">No updates match.</p>
                <p className="mt-1 text-sm text-muted-foreground">Try clearing your filters.</p>
              </li>
            )}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function NewsCard({ n }: { n: NewsItem }) {
  return (
    <li>
      <Link
        to="/news/$slug"
        params={{ slug: n.slug }}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-xl"
      >
        <div
          className={`flex items-end justify-between bg-gradient-to-br p-5 text-brand-foreground ${n.heroAccent} min-h-[120px]`}
        >
          <span className="rounded-full bg-brand-foreground/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
            {n.category}
          </span>
          {n.pinned && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gold px-2 py-1 text-[10px] font-bold text-brand">
              <Pin className="size-3" />
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="font-display text-xl font-semibold leading-snug">{n.title}</h3>
          <p className="line-clamp-3 text-sm text-muted-foreground">{n.excerpt}</p>
          <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
            <span>{formatDate(n.publishedAt)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3" /> {n.readTime}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
