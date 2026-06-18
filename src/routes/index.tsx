import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BriefcaseBusiness,
  Calendar,
  CheckCircle2,
  Clapperboard,
  Cpu,
  FlaskConical,
  Globe2,
  GraduationCap,
  Palette,
  Quote,
  Scale,
  Search,
  Sparkles,
  Star,
  Stethoscope,
  TrendingUp,
} from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { CollegeCard } from "@/components/edufinder/college-card";
import {
  articles,
  colleges,
  exams,
  faqs,
  heroStats,
  popularSearches,
  reviews,
  streams,
} from "@/lib/edufinder-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EduFinder — Find your college, course, and career path" },
      {
        name: "description",
        content:
          "Explore 4,000+ colleges, compare fees and placements, track 120+ entrance exams, and predict your admissions in one place.",
      },
      { property: "og:title", content: "EduFinder — premium education discovery" },
      {
        property: "og:description",
        content: "Honest, data-backed discovery for students and parents.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const streamIcons = {
  Cpu,
  BriefcaseBusiness,
  Stethoscope,
  Palette,
  Scale,
  FlaskConical,
  BookOpen,
  Clapperboard,
} as const;

const searchTabs = ["Colleges", "Courses", "Exams", "Scholarships"] as const;

function Home() {
  const [activeTab, setActiveTab] = useState<(typeof searchTabs)[number]>("Colleges");
  const featured = colleges.slice(0, 6);
  const featuredExams = exams.slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(45,90,200,0.08),transparent_60%)]" />
          <div className="absolute -right-40 top-40 h-[500px] w-[500px] rounded-full bg-gold/10 blur-3xl" />
        </div>

        <div className="container-page pt-20 pb-24 text-center">
          <span className="ef-fade-up inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/70">
            <Sparkles className="size-3 text-gold" />
            The new way students discover education
          </span>

          <h1
            className="ef-fade-up mt-8 mx-auto max-w-5xl font-display text-5xl font-semibold leading-[0.98] tracking-tight md:text-7xl lg:text-[5.5rem]"
            style={{ animationDelay: "60ms" }}
          >
            Find the right college,{" "}
            <span className="italic text-academic">course</span>, and{" "}
            <span className="italic text-academic">career path.</span>
          </h1>

          <p
            className="ef-fade-up mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
            style={{ animationDelay: "120ms" }}
          >
            Explore colleges, compare fees, check placements, read verified
            reviews, track exams, and make smarter admission decisions — for
            free.
          </p>

          {/* Smart search */}
          <div
            className="ef-fade-up mx-auto mt-12 max-w-3xl rounded-3xl border border-border bg-card p-2 shadow-[0_30px_80px_-30px] shadow-brand/20"
            style={{ animationDelay: "180ms" }}
          >
            <div className="flex border-b border-border px-2">
              {searchTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] transition-colors ${
                    activeTab === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute inset-x-3 -bottom-px h-0.5 bg-gold" />
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-stretch gap-2 p-3">
              <div className="flex flex-1 items-center gap-3 rounded-2xl bg-surface px-4">
                <Search className="size-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={
                    activeTab === "Colleges"
                      ? "Search by college, city, or stream..."
                      : activeTab === "Courses"
                        ? "Search by course or specialization..."
                        : activeTab === "Exams"
                          ? "Search by exam or conducting body..."
                          : "Search by scholarship or country..."
                  }
                  className="w-full bg-transparent py-4 text-base outline-none placeholder:text-muted-foreground"
                />
              </div>
              <Link
                to="/colleges"
                className="flex items-center gap-2 rounded-2xl bg-brand px-6 py-4 text-sm font-bold text-brand-foreground transition-transform hover:-translate-y-px"
              >
                Search
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Popular */}
          <div
            className="ef-fade-up mt-8 flex flex-wrap items-center justify-center gap-2"
            style={{ animationDelay: "240ms" }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Popular:
            </span>
            {popularSearches.map((p) => (
              <Link
                key={p}
                to="/colleges"
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground/80 transition-all hover:border-brand hover:bg-brand hover:text-brand-foreground"
              >
                {p}
              </Link>
            ))}
          </div>

          {/* Stats */}
          <div
            className="ef-fade-up mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4"
            style={{ animationDelay: "300ms" }}
          >
            {heroStats.map((s) => (
              <div key={s.label} className="bg-card px-6 py-8 text-left">
                <p className="font-display text-4xl font-semibold tracking-tight text-foreground">
                  {s.value}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STREAMS */}
      <section className="container-page py-24">
        <SectionHeader
          eyebrow="Browse by stream"
          title="Where do you want to study?"
          subtitle="Eight major streams. Thousands of options. Filter and compare in seconds."
          link={{ to: "/colleges", label: "Explore all colleges" }}
        />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {streams.map((s, i) => {
            const Icon = streamIcons[s.icon as keyof typeof streamIcons] ?? Cpu;
            return (
              <Link
                key={s.slug}
                to="/colleges"
                className="ef-fade-up group flex flex-col rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-academic/30 hover:shadow-xl hover:shadow-brand/5"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <div className="grid size-12 place-items-center rounded-2xl bg-gold-soft text-gold transition-all group-hover:bg-brand group-hover:text-brand-foreground">
                  <Icon className="size-5" />
                </div>
                <p className="mt-5 text-base font-bold text-foreground">{s.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.blurb}</p>
                <p className="mt-6 font-mono-tight text-[11px] font-semibold uppercase tracking-widest text-academic">
                  {s.collegeCount.toLocaleString()} colleges →
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* TOP COLLEGES */}
      <section className="bg-surface py-24">
        <div className="container-page">
          <SectionHeader
            eyebrow="Featured institutions"
            title="Top colleges, ranked by what matters."
            subtitle="Placement outcomes, student outcomes, research output, and global recognition — weighted from five years of data."
            link={{ to: "/colleges", label: "View all rankings" }}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((c, i) => (
              <CollegeCard key={c.slug} college={c} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* EXAMS */}
      <section className="container-page py-24">
        <SectionHeader
          eyebrow="Entrance exams"
          title="Ace the entrance. Never miss a deadline."
          subtitle="Track 120+ exams worldwide with calibrated difficulty, key dates, and verified syllabi."
          link={{ to: "/exams", label: "All exams" }}
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {featuredExams.map((e, i) => (
            <Link
              key={e.slug}
              to="/exams"
              className="ef-fade-up group flex items-center gap-5 rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-academic/30 hover:shadow-xl hover:shadow-brand/5"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="grid size-16 shrink-0 place-items-center rounded-2xl bg-brand font-display text-lg font-bold text-brand-foreground">
                {e.name.slice(0, 4)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-foreground group-hover:text-academic transition-colors">
                    {e.fullName}
                  </h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest ${
                      e.registrationStatus === "Open"
                        ? "bg-success/15 text-success"
                        : e.registrationStatus === "Closing soon"
                          ? "bg-gold-soft text-gold"
                          : "bg-secondary text-foreground/60"
                    }`}
                  >
                    {e.registrationStatus}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {e.conductingBody} • {e.level} • {e.difficulty}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs">
                  <span className="flex items-center gap-1 text-foreground/70">
                    <Calendar className="size-3" /> Closes {e.applicationCloses}
                  </span>
                  <span className="flex items-center gap-1 text-foreground/70">
                    <CheckCircle2 className="size-3 text-academic" /> Exam {e.examDate}
                  </span>
                </div>
              </div>
              <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-academic" />
            </Link>
          ))}
        </div>
      </section>

      {/* COMPARE + PREDICTOR */}
      <section className="container-page pb-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="ef-fade-up relative overflow-hidden rounded-[2rem] bg-brand p-10 text-brand-foreground md:p-14">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-academic/40 blur-3xl" />
            <div className="absolute -bottom-20 -left-10 h-60 w-60 rounded-full bg-gold/20 blur-3xl" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                <Sparkles className="size-3" /> AI Predictor
              </span>
              <h3 className="font-display mt-6 text-4xl">Predict your admissions chances.</h3>
              <p className="mt-3 max-w-md text-sm text-brand-foreground/70">
                Built on five years of cutoff data across 500+ universities.
                Enter your scores and get a calibrated probability — not a
                guess.
              </p>
              <Link
                to="/college-predictor"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold text-brand transition-transform hover:-translate-y-px"
              >
                Try the predictor <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          <div className="ef-fade-up rounded-[2rem] border border-border bg-card p-10 md:p-14" style={{ animationDelay: "80ms" }}>
            <span className="inline-flex items-center gap-2 rounded-full bg-academic/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-academic">
              <Globe2 className="size-3" /> Side by side
            </span>
            <h3 className="font-display mt-6 text-4xl text-foreground">Compare up to 4 colleges.</h3>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">
              ROI, ranking, fees, placement, exams accepted, facilities — laid
              out cleanly so you can decide with confidence.
            </p>
            <Link
              to="/compare"
              className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-brand px-6 py-3 text-sm font-bold text-brand transition-colors hover:bg-brand hover:text-brand-foreground"
            >
              Start comparing <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-surface py-24">
        <div className="container-page">
          <SectionHeader
            eyebrow="Student voices"
            title="Real reviews from verified students."
            subtitle="No paid placements. Every review here is tied to a verified institutional email."
            link={{ to: "/reviews", label: "Browse all reviews" }}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.slice(0, 3).map((r, i) => (
              <article
                key={r.id}
                className="ef-fade-up flex flex-col rounded-3xl border border-border bg-card p-7"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <Quote className="size-6 text-gold" />
                <p className="mt-4 font-display text-xl leading-snug text-foreground">
                  "{r.title}"
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                <div className="mt-6 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`size-3.5 ${idx < r.rating ? "fill-gold text-gold" : "text-border"}`}
                    />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-sm font-bold text-foreground">{r.author}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.course} • {r.year}
                    </p>
                  </div>
                  {r.verified && (
                    <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-success">
                      <CheckCircle2 className="size-3" /> Verified
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="container-page py-24">
        <SectionHeader
          eyebrow="Insights"
          title="Trending guides and admissions news."
          link={{ to: "/articles", label: "All articles" }}
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {articles.map((a, i) => (
            <Link
              key={a.slug}
              to="/articles"
              className="ef-fade-up group flex flex-col"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-academic/20 via-card to-gold-soft">
                <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_60%)]" />
              </div>
              <span className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                {a.category} • {a.readMinutes} min
              </span>
              <h3 className="mt-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-academic">
                {a.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
              FAQ
            </span>
            <h2 className="font-display mt-4 text-4xl leading-tight text-foreground md:text-5xl">
              Questions students actually ask.
            </h2>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Can't find what you're looking for?{" "}
              <Link to="/questions" className="text-academic underline underline-offset-4">
                Ask the community →
              </Link>
            </p>
          </div>
          <div className="divide-y divide-border rounded-3xl border border-border bg-card">
            {faqs.map((f) => (
              <details key={f.q} className="group p-6">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-bold text-foreground">
                  {f.q}
                  <span className="grid size-7 shrink-0 place-items-center rounded-full border border-border text-foreground/60 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CLAIM CTA */}
      <section className="container-page py-24">
        <div className="overflow-hidden rounded-[2rem] border border-border bg-card p-10 md:flex md:items-center md:justify-between md:gap-10 md:p-14">
          <div className="max-w-xl">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-academic">
              For institutions
            </span>
            <h3 className="font-display mt-3 text-3xl text-foreground md:text-4xl">
              Run an institution? Claim your page in 2 minutes.
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Manage your profile, respond to reviews, publish accurate fees and
              placements, and reach students actively researching their next
              step.
            </p>
          </div>
          <Link
            to="/dashboard/college"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-foreground md:mt-0"
          >
            <GraduationCap className="size-4" /> Claim your college
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  link,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  link?: { to: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
          {eyebrow}
        </span>
        <h2 className="font-display mt-3 text-4xl leading-tight tracking-tight text-foreground md:text-5xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-base text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {link && (
        <Link
          to={link.to}
          className="group inline-flex items-center gap-2 text-sm font-bold text-academic"
        >
          {link.label}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

// Increase header height utility
