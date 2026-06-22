import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Clock, Search } from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { articles, type Article } from "@/lib/edufinder-data";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "Articles & guides — EduFinder" },
      { name: "description", content: "Admissions guides, rankings, scholarship breakdowns, exam news, and career insights — written by editors and ex-admissions officers." },
      { property: "og:title", content: "Articles & guides — EduFinder" },
      { property: "og:description", content: "Editorial guides, rankings, and exam news for students." },
    ],
  }),
  component: ArticlesPage,
});

const categories = ["All", "Rankings", "Guides", "Scholarships", "Exams", "Careers"] as const;

function ArticlesPage() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [q, setQ] = useState("");

  const sorted = useMemo(
    () => [...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)),
    [],
  );

  const filtered = useMemo(() => {
    return sorted.filter((a) => {
      if (category !== "All" && a.category !== category) return false;
      if (q.trim()) {
        const s = q.toLowerCase();
        return (
          a.title.toLowerCase().includes(s) ||
          a.excerpt.toLowerCase().includes(s) ||
          a.tags?.some((t) => t.toLowerCase().includes(s))
        );
      }
      return true;
    });
  }, [sorted, category, q]);

  const featured = sorted[0];
  const rest = filtered.filter((a) => a.slug !== featured.slug);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-brand/5 via-background to-academic/5">
        <div className="container-page py-16 md:py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              EduFinder Editorial
            </span>
            <h1 className="font-display mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              Sharp, honest guides for the decision that shapes a decade.
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Written by editors, ex-admissions officers, and subject experts. No SEO mush, no listicle filler.
            </p>
          </div>

          {/* Search + categories */}
          <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search articles, topics, tags…"
                className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm outline-none ring-brand/30 transition focus:ring-2"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                    category === c
                      ? "border-brand bg-brand text-brand-foreground"
                      : "border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured */}
      {category === "All" && !q && featured && (
        <section className="container-page py-14">
          <FeaturedCard a={featured} />
        </section>
      )}

      {/* Grid */}
      <section className="container-page pb-24">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">
            {q || category !== "All" ? `${filtered.length} article${filtered.length === 1 ? "" : "s"}` : "Latest"}
          </h2>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center">
            <p className="text-muted-foreground">No articles match your filters yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(category === "All" && !q ? rest : filtered).map((a) => (
              <ArticleCard key={a.slug} a={a} />
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}

function FeaturedCard({ a }: { a: Article }) {
  return (
    <Link
      to="/articles/$slug"
      params={{ slug: a.slug }}
      className="group block overflow-hidden rounded-3xl border border-border bg-card transition hover:border-brand/40 hover:shadow-xl"
    >
      <div className="grid md:grid-cols-2">
        <div className={`relative min-h-64 bg-gradient-to-br ${a.heroAccent ?? "from-brand via-academic to-gold"} p-10`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white,transparent_55%)] opacity-20" />
          <div className="relative flex h-full flex-col justify-between text-brand-foreground">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-background/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur">
              Featured · {a.category}
            </span>
            <div className="font-display text-3xl font-semibold leading-tight md:text-4xl">
              {a.title}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-6 p-10">
          <div>
            <p className="text-lg leading-relaxed text-muted-foreground">{a.excerpt}</p>
            {a.tags && (
              <div className="mt-6 flex flex-wrap gap-2">
                {a.tags.map((t) => (
                  <span key={t} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between border-t border-border pt-5 text-sm">
            <div>
              <div className="font-semibold text-foreground">{a.author}</div>
              <div className="text-muted-foreground">{formatDate(a.publishedAt)} · {a.readMinutes} min read</div>
            </div>
            <span className="inline-flex items-center gap-2 font-semibold text-brand transition group-hover:gap-3">
              Read <ArrowRight className="size-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ArticleCard({ a }: { a: Article }) {
  return (
    <Link
      to="/articles/$slug"
      params={{ slug: a.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg"
    >
      <div className={`relative h-40 bg-gradient-to-br ${a.heroAccent ?? "from-brand via-academic to-gold"}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,white,transparent_60%)] opacity-15" />
        <span className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground backdrop-blur">
          {a.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="font-display text-xl font-semibold leading-snug text-foreground transition group-hover:text-brand">
          {a.title}
        </h3>
        <p className="line-clamp-3 text-sm text-muted-foreground">{a.excerpt}</p>
        <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{a.author}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" /> {a.readMinutes} min
          </span>
        </div>
      </div>
    </Link>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}
