import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  Download,
  GitCompareArrows,
  Globe2,
  GraduationCap,
  Heart,
  MapPin,
  Quote,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { CollegeCard } from "@/components/edufinder/college-card";
import {
  colleges,
  formatFees,
  formatPackage,
  getCollege,
  reviews as allReviews,
} from "@/lib/edufinder-data";

export const Route = createFileRoute("/colleges/$slug")({
  loader: ({ params }) => {
    const college = getCollege(params.slug);
    if (!college) throw notFound();
    return college;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Fees, Placements, Reviews | EduFinder` },
          {
            name: "description",
            content: `${loaderData.name}, ${loaderData.city}. Ranked #${loaderData.ranking}. Fees ${formatFees(loaderData)}. Avg package ${formatPackage(loaderData)}.`,
          },
          { property: "og:title", content: loaderData.name },
          { property: "og:description", content: loaderData.about.slice(0, 160) },
        ]
      : [{ title: "College — EduFinder" }],
    links: loaderData ? [{ rel: "canonical", href: `/colleges/${loaderData.slug}` }] : [],
  }),
  component: CollegeDetailPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container-page py-32 text-center">
        <h1 className="font-display text-5xl">College not found</h1>
        <p className="mt-3 text-muted-foreground">
          We couldn't find this college. It may have been renamed or removed.
        </p>
        <Link
          to="/colleges"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-brand-foreground"
        >
          <ArrowLeft className="size-4" /> Browse all colleges
        </Link>
      </div>
      <SiteFooter />
    </div>
  ),
});

const sections = [
  { id: "overview", label: "Overview" },
  { id: "courses", label: "Courses & Fees" },
  { id: "placements", label: "Placements" },
  { id: "facilities", label: "Facilities" },
  { id: "reviews", label: "Reviews" },
  { id: "similar", label: "Similar" },
] as const;

function CollegeDetailPage() {
  const college = Route.useLoaderData() as NonNullable<ReturnType<typeof getCollege>>;
  const reviews = allReviews.filter((r) => r.collegeSlug === college.slug);
  const similar = college.similar
    .map((s: string) => colleges.find((c) => c.slug === s))
    .filter(Boolean) as typeof colleges;
  const maxPackage = Math.max(...college.placementTrend.map((p) => p.package));
  const totalFees = college.feeBreakdown.reduce((a, b) => a + b.amount, 0);
  const feeSym = college.feesCurrency === "GBP" ? "£" : college.feesCurrency === "INR" ? "₹" : "$";

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${college.heroAccent} text-white`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.18),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_85%,rgba(0,0,0,0.3),transparent_60%)]" />
        <div className="container-page relative py-16 md:py-20">
          <Link
            to="/colleges"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80 hover:text-white"
          >
            <ArrowLeft className="size-3" /> All colleges
          </Link>

          <div className="mt-6 grid items-end gap-10 md:grid-cols-[1fr_auto]">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono-tight rounded-full bg-black/30 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">
                  Ranked #{college.ranking} {college.rankingLabel}
                </span>
                {college.claimed && (
                  <span className="flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
                    <CheckCircle2 className="size-3" /> Claimed
                  </span>
                )}
              </div>
              <h1 className="font-display mt-4 text-4xl leading-[1.05] tracking-tight md:text-6xl">
                {college.name}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4" /> {college.city}, {college.country}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="size-4" /> {college.ownership} • Est. {college.established}
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="size-4 fill-gold text-gold" />
                  <strong className="text-white">{college.rating}</strong>
                  <span className="text-white/60">({college.ratingCount.toLocaleString()} reviews)</span>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-brand">
                Apply now <ArrowRight className="size-4" />
              </button>
              <button className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-3 text-sm font-bold backdrop-blur">
                <Download className="size-4" /> Brochure
              </button>
              <Link
                to="/compare"
                className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-3 text-sm font-bold"
              >
                <GitCompareArrows className="size-4" /> Compare
              </Link>
              <button
                aria-label="Shortlist"
                className="grid size-12 place-items-center rounded-full border border-white/30"
              >
                <Heart className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick nav */}
      <div className="sticky top-[88px] z-30 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="container-page flex gap-2 overflow-x-auto py-3">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          {/* Main */}
          <main className="space-y-16">
            {/* Overview */}
            <section id="overview" className="scroll-mt-32">
              <SectionTitle eyebrow="Overview" title="About the institution" />
              <p className="mt-6 text-lg leading-relaxed text-foreground/85">{college.about}</p>

              <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Stat icon={Users} label="Student ratio" value={college.studentRatio} />
                <Stat icon={Globe2} label="International" value={`${college.internationalShare}%`} />
                <Stat icon={Award} label="Placement rate" value={`${college.placementRate}%`} />
                <Stat icon={GraduationCap} label="Courses" value={`${college.courseCount}`} />
              </div>
            </section>

            {/* Courses & Fees */}
            <section id="courses" className="scroll-mt-32">
              <SectionTitle eyebrow="Courses & Fees" title="Programs offered" />
              <div className="mt-6 overflow-hidden rounded-3xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-surface text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <tr>
                      <th className="px-5 py-4">Program</th>
                      <th className="px-5 py-4">Duration</th>
                      <th className="px-5 py-4">Fees</th>
                      <th className="px-5 py-4">Exams</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    {[
                      { name: "Bachelor's — Computer Science", dur: "4 yrs", fees: `${feeSym}${(college.feesMin / 1000).toFixed(0)}k`, exams: college.examsAccepted[0] },
                      { name: "Master's — Engineering", dur: "2 yrs", fees: `${feeSym}${(college.feesMax / 1000).toFixed(0)}k`, exams: college.examsAccepted[1] ?? college.examsAccepted[0] },
                      { name: "MBA", dur: "2 yrs", fees: `${feeSym}${((college.feesMin + college.feesMax) / 2000).toFixed(0)}k`, exams: "GMAT" },
                      { name: "PhD — Sciences", dur: "4 yrs", fees: "Stipend", exams: "Interview" },
                    ].map((row) => (
                      <tr key={row.name} className="transition-colors hover:bg-secondary/50">
                        <td className="px-5 py-4 font-semibold text-foreground">{row.name}</td>
                        <td className="px-5 py-4 text-muted-foreground">{row.dur}</td>
                        <td className="px-5 py-4 font-mono-tight font-semibold">{row.fees}</td>
                        <td className="px-5 py-4 text-muted-foreground">{row.exams}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Fee breakdown */}
              <div className="mt-8 rounded-3xl border border-border bg-card p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-foreground/70">
                  Annual fee breakdown
                </p>
                <div className="mt-4 space-y-3">
                  {college.feeBreakdown.map((f) => {
                    const pct = (f.amount / totalFees) * 100;
                    return (
                      <div key={f.label}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-foreground/80">{f.label}</span>
                          <span className="font-mono-tight font-bold">
                            {feeSym}
                            {f.amount.toLocaleString()}
                          </span>
                        </div>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-academic"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-base font-bold">
                    <span>Total / year</span>
                    <span className="font-mono-tight text-academic">
                      {feeSym}
                      {totalFees.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Placements */}
            <section id="placements" className="scroll-mt-32">
              <SectionTitle eyebrow="Placements" title="Career outcomes" />

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Stat label="Avg package" value={formatPackage(college)} accent />
                <Stat
                  label="Highest package"
                  value={`${feeSym === "₹" ? "₹" : "$"}${(college.highestPackage / 1000).toFixed(0)}k`}
                />
                <Stat label="Placement rate" value={`${college.placementRate}%`} />
              </div>

              <div className="mt-6 rounded-3xl border border-border bg-card p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-foreground/70">
                  5-year average package
                </p>
                <div className="mt-6 flex items-end justify-between gap-3">
                  {college.placementTrend.map((p) => {
                    const h = (p.package / maxPackage) * 100;
                    return (
                      <div key={p.year} className="flex flex-1 flex-col items-center gap-2">
                        <span className="font-mono-tight text-[10px] font-bold text-muted-foreground">
                          {feeSym === "₹"
                            ? `₹${(p.package / 100000).toFixed(0)}L`
                            : `$${(p.package / 1000).toFixed(0)}k`}
                        </span>
                        <div className="flex h-44 w-full items-end">
                          <div
                            className="w-full rounded-t-xl bg-gradient-to-t from-academic to-gold transition-all"
                            style={{ height: `${h}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-semibold text-muted-foreground">
                          {p.year}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-widest text-foreground/70">
                  Top recruiters
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {college.topRecruiters.map((r) => (
                    <span
                      key={r}
                      className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-semibold"
                    >
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Facilities */}
            <section id="facilities" className="scroll-mt-32">
              <SectionTitle eyebrow="On campus" title="Facilities" />
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {college.facilities.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4"
                  >
                    <div className="grid size-9 place-items-center rounded-xl bg-gold-soft text-gold">
                      <CheckCircle2 className="size-4" />
                    </div>
                    <span className="text-sm font-semibold">{f}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section id="reviews" className="scroll-mt-32">
              <SectionTitle eyebrow="Student voices" title="Reviews & ratings" />

              <div className="mt-6 grid gap-6 rounded-3xl border border-border bg-card p-6 md:grid-cols-[200px_1fr]">
                <div className="text-center md:border-r md:border-border md:pr-6">
                  <p className="font-display text-6xl font-semibold tracking-tight">
                    {college.rating}
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-4 ${i < Math.floor(college.rating) ? "fill-gold text-gold" : "text-border"}`}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {college.ratingCount.toLocaleString()} verified reviews
                  </p>
                </div>
                <div className="space-y-2">
                  {college.ratingDistribution.map((d) => (
                    <div key={d.stars} className="flex items-center gap-3 text-sm">
                      <span className="w-3 font-mono-tight font-bold">{d.stars}</span>
                      <Star className="size-3 fill-gold text-gold" />
                      <div className="flex-1 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-1.5 rounded-full bg-academic"
                          style={{ width: `${d.pct}%` }}
                        />
                      </div>
                      <span className="w-10 text-right font-mono-tight text-xs text-muted-foreground">
                        {d.pct}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {reviews.length > 0 ? (
                  reviews.map((r) => (
                    <article key={r.id} className="rounded-3xl border border-border bg-card p-6">
                      <Quote className="size-5 text-gold" />
                      <p className="font-display mt-3 text-lg">"{r.title}"</p>
                      <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>
                      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs">
                        <div>
                          <p className="font-bold text-foreground">{r.author}</p>
                          <p className="text-muted-foreground">
                            {r.course} • {r.year}
                          </p>
                        </div>
                        {r.verified && (
                          <span className="flex items-center gap-1 text-success font-bold">
                            <CheckCircle2 className="size-3" /> Verified
                          </span>
                        )}
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="rounded-3xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground md:col-span-2">
                    No reviews yet. Be the first to share your experience.
                  </div>
                )}
              </div>
            </section>

            {/* Similar */}
            <section id="similar" className="scroll-mt-32">
              <SectionTitle eyebrow="Explore further" title="Similar colleges" />
              <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {similar.map((c, i) => (
                  <CollegeCard key={c.slug} college={c} index={i} />
                ))}
              </div>
            </section>
          </main>

          {/* Sticky right CTA */}
          <aside className="lg:block">
            <div className="lg:sticky lg:top-[150px] space-y-4">
              <div className="rounded-3xl border border-border bg-card p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                  Quick facts
                </p>
                <div className="mt-5 space-y-4 text-sm">
                  <Row label="Annual fees" value={formatFees(college)} />
                  <Row label="Avg package" value={formatPackage(college)} />
                  <Row label="Placement" value={`${college.placementRate}%`} />
                  <Row label="Exams accepted" value={college.examsAccepted.join(", ")} />
                  <Row label="Established" value={String(college.established)} />
                </div>
                <button className="mt-6 w-full rounded-full bg-brand py-3 text-sm font-bold text-brand-foreground">
                  Apply now
                </button>
                <button className="mt-2 w-full rounded-full border border-border py-3 text-sm font-bold">
                  Download brochure
                </button>
              </div>

              <div className="rounded-3xl bg-brand p-6 text-brand-foreground">
                <Sparkles className="size-5 text-gold" />
                <p className="font-display mt-3 text-xl leading-tight">
                  Will you get in here?
                </p>
                <p className="mt-2 text-xs text-brand-foreground/70">
                  Use the predictor to see your real chances based on your
                  scores.
                </p>
                <Link
                  to="/college-predictor"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-bold text-brand"
                >
                  Try predictor <ArrowRight className="size-3" />
                </Link>
              </div>

              {!college.claimed && (
                <div className="rounded-3xl border border-dashed border-border p-5 text-sm">
                  <p className="font-bold">Represent this college?</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Claim the profile to manage info and respond to reviews.
                  </p>
                  <Link
                    to="/dashboard/college"
                    className="mt-3 inline-block text-xs font-bold text-academic underline underline-offset-4"
                  >
                    Claim this college →
                  </Link>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
        {eyebrow}
      </span>
      <h2 className="font-display mt-2 text-3xl tracking-tight md:text-4xl">{title}</h2>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon?: any;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${accent ? "border-academic/30 bg-academic/5" : "border-border bg-card"}`}
    >
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {Icon && <Icon className="size-3.5" />}
        {label}
      </div>
      <p className="font-display mt-2 text-2xl font-semibold tracking-tight text-foreground">
        {value}
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="text-right text-sm font-bold text-foreground">{value}</span>
    </div>
  );
}
