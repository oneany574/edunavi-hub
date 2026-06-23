import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  CheckCircle2,
  Eye,
  MessageCircle,
  Search,
  Send,
  Sparkles,
  ThumbsUp,
  Trophy,
} from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { qaQuestions, type QAQuestion } from "@/lib/edufinder-extras";

const categories = [
  "All",
  "Admissions",
  "Exams",
  "Placements",
  "Scholarships",
  "Study Abroad",
  "Campus Life",
] as const;

export const Route = createFileRoute("/questions")({
  head: () => ({
    meta: [
      { title: "Q&A — Ask anything, get real answers | EduFinder" },
      {
        name: "description",
        content:
          "Community Q&A moderated by counselors, alumni, and current students. Search 50,000+ answered questions.",
      },
      { property: "og:title", content: "EduFinder Q&A" },
      {
        property: "og:description",
        content: "Real answers from real counselors, alumni, and students.",
      },
    ],
  }),
  component: QAPage,
});

const askSchema = z.object({
  title: z.string().trim().min(10, "Add a bit more context (10+ characters)").max(140),
  body: z.string().trim().min(20, "Describe your situation (20+ characters)").max(2000),
  category: z.enum(categories.slice(1) as [string, ...string[]]),
});

function QAPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const [filter, setFilter] = useState<"recent" | "popular" | "unanswered">("popular");

  const filtered = useMemo(() => {
    let list = qaQuestions.filter((item) => {
      if (cat !== "All" && item.category !== cat) return false;
      if (q.trim()) {
        const needle = q.toLowerCase();
        return (
          item.title.toLowerCase().includes(needle) ||
          item.body.toLowerCase().includes(needle) ||
          item.tags.some((t) => t.toLowerCase().includes(needle))
        );
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      if (filter === "popular") return b.votes - a.votes;
      if (filter === "recent") return b.postedAt.localeCompare(a.postedAt);
      return (a.answers.length || 0) - (b.answers.length || 0);
    });
    return list;
  }, [q, cat, filter]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-card">
          <div className="pointer-events-none absolute inset-0 -z-0">
            <div className="absolute -top-20 left-1/3 size-[420px] rounded-full bg-brand/10 blur-3xl" />
            <div className="absolute -bottom-20 right-10 size-[360px] rounded-full bg-gold/10 blur-3xl" />
          </div>
          <div className="container-page relative grid gap-10 py-14 lg:grid-cols-[1.3fr_1fr] lg:py-20">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/70">
                <Sparkles className="size-3 text-gold" />
                Moderated community
              </span>
              <h1 className="font-display mt-5 text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl">
                Ask anything.
                <br /> Get real answers.
              </h1>
              <p className="mt-4 max-w-xl text-base text-muted-foreground">
                Real counselors, alumni, and current students respond. Average reply time under
                4 hours. No spam, no aggregator-bots.
              </p>

              <div className="mt-7 flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2">
                <Search className="ml-1 size-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search questions — e.g. ‘JEE strategy’, ‘MBBS Russia’, ‘DAAD’"
                  className="w-full bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
            </div>

            <AskCard />
          </div>
        </section>

        {/* List */}
        <section className="container-page grid gap-8 py-12 lg:grid-cols-[260px_1fr]">
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-4">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/60">
                Categories
              </p>
              <ul className="space-y-1">
                {categories.map((c) => {
                  const active = c === cat;
                  return (
                    <li key={c}>
                      <button
                        type="button"
                        onClick={() => setCat(c)}
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                          active
                            ? "bg-brand text-brand-foreground"
                            : "text-foreground/80 hover:bg-secondary"
                        }`}
                      >
                        {c}
                        <span
                          className={`text-[11px] font-bold ${
                            active ? "text-brand-foreground/70" : "text-muted-foreground"
                          }`}
                        >
                          {c === "All"
                            ? qaQuestions.length
                            : qaQuestions.filter((x) => x.category === c).length}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-gradient-to-br from-brand to-academic p-5 text-brand-foreground">
              <Trophy className="size-5 text-gold" />
              <p className="font-display mt-3 text-lg font-semibold">Top contributors</p>
              <ul className="mt-3 space-y-2 text-sm">
                {[
                  { name: "Ankit Verma", role: "Senior counselor", pts: "12.4k" },
                  { name: "Megha R.", role: "Admissions, Westmere", pts: "9.8k" },
                  { name: "Dr. R. Pillai", role: "Alumni, Marlowe", pts: "8.1k" },
                ].map((c) => (
                  <li key={c.name} className="flex items-center justify-between">
                    <span>
                      <span className="block font-semibold">{c.name}</span>
                      <span className="block text-[11px] text-brand-foreground/70">{c.role}</span>
                    </span>
                    <span className="text-xs font-bold text-gold">{c.pts}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filtered.length}</span> questions
              </p>
              <div className="inline-flex rounded-full border border-border bg-card p-1 text-xs font-semibold">
                {(["popular", "recent", "unanswered"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`rounded-full px-3 py-1.5 capitalize transition-colors ${
                      filter === f
                        ? "bg-brand text-brand-foreground"
                        : "text-foreground/70 hover:text-foreground"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <ul className="space-y-4">
              {filtered.map((item) => (
                <QuestionRow key={item.id} item={item} />
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function AskCard() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [category, setCategory] = useState<string>("Admissions");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = askSchema.safeParse({
      title: fd.get("title"),
      body: fd.get("body"),
      category,
    });
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const i of result.error.issues) {
        const k = i.path[0] as string;
        if (!next[k]) next[k] = i.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    (e.currentTarget as HTMLFormElement).reset();
    toast.success("Question posted for review", {
      description: "Our moderators publish within a few hours.",
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-border bg-card p-5 shadow-xl shadow-brand/5 lg:p-6"
    >
      <div className="flex items-center gap-2">
        <span className="grid size-8 place-items-center rounded-xl bg-brand text-brand-foreground">
          <MessageCircle className="size-4" />
        </span>
        <p className="font-display text-lg font-semibold">Ask the community</p>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-foreground/70">
            Your question
          </label>
          <input
            name="title"
            placeholder="e.g. Is a 3-year UK Bachelor's accepted for MS in the US?"
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand"
          />
          {errors.title && (
            <p className="mt-1 text-xs text-destructive">{errors.title}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-foreground/70">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand"
            >
              {categories.slice(1).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="grid place-items-center">
            <span className="rounded-full bg-secondary px-3 py-2 text-[11px] font-semibold text-foreground/70">
              Posts public · moderated
            </span>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-foreground/70">
            Details
          </label>
          <textarea
            name="body"
            rows={4}
            placeholder="Share your scores, target colleges, and what you've already tried."
            className="w-full resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-brand"
          />
          {errors.body && (
            <p className="mt-1 text-xs text-destructive">{errors.body}</p>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-brand-foreground transition-transform hover:-translate-y-0.5"
        >
          <Send className="size-4" /> Post question
        </button>
      </div>
    </form>
  );
}

function QuestionRow({ item }: { item: QAQuestion }) {
  const top = item.answers[0];
  return (
    <li className="overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/5">
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-foreground/70">
              {item.category}
            </span>
            <Link
              to="."
              className="block"
              onClick={(e) => e.preventDefault()}
            >
              <h3 className="font-display mt-2 text-xl font-semibold leading-tight text-foreground">
                {item.title}
              </h3>
            </Link>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.body}</p>
          </div>
          {item.solved && (
            <span className="inline-flex items-center gap-1 rounded-full bg-academic/10 px-2.5 py-1 text-[11px] font-bold text-academic">
              <CheckCircle2 className="size-3.5" /> Solved
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <ThumbsUp className="size-3.5" /> {item.votes}
          </span>
          <span className="inline-flex items-center gap-1">
            <MessageCircle className="size-3.5" /> {item.answers.length} answers
          </span>
          <span className="inline-flex items-center gap-1">
            <Eye className="size-3.5" /> {item.views.toLocaleString()} views
          </span>
          <span>· asked by {item.author}</span>
        </div>

        {top && (
          <div className="mt-4 rounded-2xl border border-border bg-background p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-foreground">{top.author}</p>
                <p className="text-[11px] text-muted-foreground">{top.role}</p>
              </div>
              {top.badge && (
                <span className="rounded-full bg-gold/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold">
                  {top.badge}
                </span>
              )}
            </div>
            <p className="mt-2 line-clamp-3 text-sm text-foreground/80">{top.body}</p>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-foreground/80"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
}
