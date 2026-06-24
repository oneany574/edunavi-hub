import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock, Newspaper, Share2, Tag } from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { getNewsItem, newsItems, type NewsItem } from "@/lib/edufinder-extras";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const n = getNewsItem(params.slug);
    if (!n) throw notFound();
    return n;
  },
  head: ({ loaderData }) => {
    const n = loaderData;
    if (!n) return { meta: [{ title: "News — EduFinder" }] };
    return {
      meta: [
        { title: `${n.title} | EduFinder News` },
        { name: "description", content: n.excerpt },
        { property: "og:title", content: n.title },
        { property: "og:description", content: n.excerpt },
      ],
    };
  },
  notFoundComponent: NotFound,
  component: NewsDetailPage,
});

function NewsDetailPage() {
  const n = Route.useLoaderData() as NewsItem;
  const related = newsItems
    .filter((x) => x.slug !== n.slug && (x.category === n.category || sharesTag(x.tags, n.tags)))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section
          className={`relative overflow-hidden border-b border-border bg-gradient-to-br text-brand-foreground ${n.heroAccent}`}
        >
          <div className="container-page py-14 lg:py-20">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-xs font-semibold text-brand-foreground/80 hover:text-brand-foreground"
            >
              <ArrowLeft className="size-3.5" /> All news
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-foreground/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                {n.category}
              </span>
              <span className="text-[11px] text-brand-foreground/70">
                {formatDate(n.publishedAt)} · {n.readTime} · {n.source}
              </span>
            </div>
            <h1 className="font-display mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              {n.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base text-brand-foreground/85">{n.excerpt}</p>
          </div>
        </section>

        <section className="container-page grid gap-10 py-14 lg:grid-cols-[1fr_320px]">
          <article className="prose-like space-y-5">
            {n.body.map((p, i) => (
              <p key={i} className="text-base leading-relaxed text-foreground/85">
                {p}
              </p>
            ))}

            <div className="flex flex-wrap items-center gap-2 border-t border-border pt-6">
              <Tag className="size-4 text-muted-foreground" />
              {n.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground/80"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-card p-4 text-sm">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  By
                </p>
                <p className="font-semibold text-foreground">{n.author}</p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-xs font-bold text-foreground/80 hover:bg-secondary/80"
              >
                <Share2 className="size-3.5" /> Share
              </button>
            </div>

            {related.length > 0 && (
              <div className="pt-4">
                <h2 className="font-display mb-4 text-2xl font-semibold tracking-tight">
                  More like this
                </h2>
                <ul className="grid gap-3 md:grid-cols-3">
                  {related.map((r) => (
                    <li key={r.slug}>
                      <Link
                        to="/news/$slug"
                        params={{ slug: r.slug }}
                        className="block rounded-2xl border border-border bg-card p-4 transition-colors hover:border-brand"
                      >
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gold">
                          {r.category}
                        </p>
                        <p className="mt-1 font-semibold text-foreground line-clamp-2">
                          {r.title}
                        </p>
                        <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="size-3" /> {r.readTime}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/60">
                Source
              </p>
              <p className="mt-2 font-semibold text-foreground">{n.source}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Published {formatDate(n.publishedAt)}
              </p>
            </div>

            <div className="rounded-3xl bg-brand p-5 text-brand-foreground">
              <p className="font-display text-lg font-semibold">Never miss a deadline.</p>
              <p className="mt-1 text-sm text-brand-foreground/75">
                Get a weekly digest of exam, admissions & visa updates.
              </p>
              <Link
                to="/join"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-bold text-brand"
              >
                Subscribe free <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/60">
                <Newspaper className="size-3.5" /> Browse by category
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {Array.from(new Set(newsItems.map((x) => x.category))).map((c) => (
                  <li key={c}>
                    <Link
                      to="/news"
                      className="flex items-center justify-between rounded-xl px-3 py-2 hover:bg-secondary"
                    >
                      <span className="font-semibold text-foreground/80">{c}</span>
                      <ArrowRight className="size-3.5 text-muted-foreground" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function sharesTag(a: string[], b: string[]) {
  return a.some((t) => b.includes(t));
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container-page py-24 text-center">
        <h1 className="font-display text-4xl">Story not found</h1>
        <Link
          to="/news"
          className="mt-6 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground"
        >
          Back to news
        </Link>
      </section>
      <SiteFooter />
    </div>
  );
}
