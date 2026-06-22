import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Clock, Share2, Bookmark, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { articles, getArticle, type Article } from "@/lib/edufinder-data";

export const Route = createFileRoute("/articles/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.article;
    if (!a) return { meta: [{ title: "Article not found — EduFinder" }] };
    return {
      meta: [
        { title: `${a.title} — EduFinder` },
        { name: "description", content: a.excerpt },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.excerpt },
        { property: "og:type", content: "article" },
        { property: "article:author", content: a.author },
        { property: "article:published_time", content: a.publishedAt },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container-page py-32 text-center">
        <h1 className="font-display text-3xl font-semibold">Article not found</h1>
        <p className="mt-3 text-muted-foreground">The piece you're looking for has moved or never existed.</p>
        <Link to="/articles" className="mt-6 inline-flex items-center gap-2 text-brand hover:underline">
          <ArrowLeft className="size-4" /> Back to articles
        </Link>
      </div>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container-page py-32 text-center">
        <h1 className="font-display text-3xl font-semibold">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">{error.message}</p>
        <button onClick={reset} className="mt-6 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-foreground">
          Try again
        </button>
      </div>
      <SiteFooter />
    </div>
  ),
  component: ArticleDetail,
});

function ArticleDetail() {
  const { article: a } = Route.useLoaderData() as { article: Article };
  const related = (a.relatedSlugs ?? [])
    .map((s: string) => articles.find((x) => x.slug === s))
    .filter((x): x is Article => Boolean(x));

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <article>
        <header className={`relative overflow-hidden border-b border-border bg-gradient-to-br ${a.heroAccent ?? "from-brand via-academic to-gold"} text-brand-foreground`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white,transparent_55%)] opacity-15" />
          <div className="container-page relative py-20 md:py-28">
            <Link to="/articles" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-foreground/80 hover:text-brand-foreground">
              <ArrowLeft className="size-3.5" /> All articles
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em]">
              <span className="rounded-full bg-background/15 px-3 py-1 backdrop-blur">{a.category}</span>
              <span className="opacity-80">{formatDate(a.publishedAt)}</span>
              <span className="opacity-80 inline-flex items-center gap-1.5"><Clock className="size-3" /> {a.readMinutes} min read</span>
            </div>
            <h1 className="font-display mt-6 max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">
              {a.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-brand-foreground/85 md:text-xl">{a.excerpt}</p>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-brand-foreground/15 pt-6">
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-full bg-background/20 text-base font-semibold backdrop-blur">
                  {initials(a.author)}
                </div>
                <div>
                  <div className="font-semibold">{a.author}</div>
                  {a.authorRole && <div className="text-xs opacity-80">{a.authorRole}</div>}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="inline-flex items-center gap-2 rounded-full border border-brand-foreground/25 bg-background/10 px-4 py-2 text-xs font-semibold backdrop-blur transition hover:bg-background/20">
                  <Bookmark className="size-3.5" /> Save
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-brand-foreground/25 bg-background/10 px-4 py-2 text-xs font-semibold backdrop-blur transition hover:bg-background/20">
                  <Share2 className="size-3.5" /> Share
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="container-page grid gap-12 py-16 md:py-20 lg:grid-cols-[1fr_280px]">
          <div className="max-w-[68ch]">
            {a.tldr && a.tldr.length > 0 && (
              <aside className="rounded-2xl border border-border bg-gradient-to-br from-brand/5 to-academic/5 p-6">
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">TL;DR</div>
                <ul className="mt-4 space-y-2.5">
                  {a.tldr.map((t, i) => (
                    <li key={i} className="flex gap-3 text-sm text-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            {a.sections?.map((s, i) => (
              <section key={i} className="mt-12 first:mt-12">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {s.heading}
                </h2>
                <p className="mt-4 text-lg leading-[1.8] text-foreground/85">{s.body}</p>
              </section>
            ))}

            {a.tags && a.tags.length > 0 && (
              <div className="mt-14 flex flex-wrap gap-2 border-t border-border pt-8">
                {a.tags.map((t) => (
                  <span key={t} className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
                    #{t.replace(/\s+/g, "")}
                  </span>
                ))}
              </div>
            )}

            {/* Author card */}
            <div className="mt-10 flex items-start gap-5 rounded-2xl border border-border bg-card p-6">
              <div className="grid size-14 place-items-center rounded-full bg-brand text-brand-foreground text-lg font-semibold">
                {initials(a.author)}
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Written by</div>
                <div className="mt-1 font-display text-xl font-semibold text-foreground">{a.author}</div>
                {a.authorRole && <p className="mt-1 text-sm text-muted-foreground">{a.authorRole}</p>}
              </div>
            </div>
          </div>

          {/* Sticky sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-6">
              {a.sections && (
                <nav className="rounded-2xl border border-border bg-card p-5">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">On this page</div>
                  <ul className="mt-3 space-y-2 text-sm">
                    {a.sections.map((s, i) => (
                      <li key={i}>
                        <a href={`#sec-${i}`} className="block text-muted-foreground transition hover:text-brand">
                          {s.heading}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              <div className="rounded-2xl border border-border bg-gradient-to-br from-brand/10 to-academic/5 p-5">
                <div className="font-display text-lg font-semibold text-foreground">Need 1:1 guidance?</div>
                <p className="mt-2 text-sm text-muted-foreground">Book a free 15-minute call with an admissions counselor.</p>
                <Link
                  to="/counseling"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-brand-foreground transition hover:opacity-90"
                >
                  Book a session <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="border-t border-border bg-muted/30">
            <div className="container-page py-16">
              <h2 className="font-display text-2xl font-semibold text-foreground md:text-3xl">Keep reading</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    to="/articles/$slug"
                    params={{ slug: r.slug }}
                    className="group rounded-2xl border border-border bg-card p-6 transition hover:border-brand/40 hover:shadow-lg"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">{r.category}</span>
                    <h3 className="font-display mt-3 text-xl font-semibold text-foreground transition group-hover:text-brand">
                      {r.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{r.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-brand">
                      Read article <ArrowRight className="size-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <SiteFooter />
    </div>
  );
}

function initials(name: string) {
  return name.split(/\s+/).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}
