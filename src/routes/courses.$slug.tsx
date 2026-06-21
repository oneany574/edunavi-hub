import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Clock,
  Download,
  GraduationCap,
  Heart,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { CollegeCard } from "@/components/edufinder/college-card";
import { colleges, courses, getCourse, getCourseReviews, getStream } from "@/lib/edufinder-data";
import { CourseReviews } from "@/components/edufinder/course-reviews";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return course;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Fees, Curriculum, Careers | EduFinder` },
          {
            name: "description",
            content: `${loaderData.name}. ${loaderData.description} Fees ${loaderData.feesRange}. Avg salary ${loaderData.avgSalary}.`,
          },
          { property: "og:title", content: loaderData.name },
          { property: "og:description", content: loaderData.description.slice(0, 160) },
        ]
      : [{ title: "Course — EduFinder" }],
    links: loaderData ? [{ rel: "canonical", href: `/courses/${loaderData.slug}` }] : [],
  }),
  component: CourseDetailPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container-page py-32 text-center">
        <h1 className="font-display text-5xl">Course not found</h1>
        <p className="mt-3 text-muted-foreground">
          We couldn't find this course. It may have been renamed or removed.
        </p>
        <Link
          to="/courses"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-brand-foreground"
        >
          <ArrowLeft className="size-4" /> Browse all courses
        </Link>
      </div>
      <SiteFooter />
    </div>
  ),
});

const sections = [
  { id: "overview", label: "Overview" },
  { id: "curriculum", label: "Curriculum" },
  { id: "careers", label: "Careers" },
  { id: "colleges", label: "Top colleges" },
  { id: "reviews", label: "Reviews" },
  { id: "eligibility", label: "Eligibility" },
  { id: "similar", label: "Similar" },
] as const;

function CourseDetailPage() {
  const course = Route.useLoaderData() as NonNullable<ReturnType<typeof getCourse>>;
  const stream = getStream(course.stream);
  const dur =
    course.durationMonths >= 12
      ? `${(course.durationMonths / 12).toFixed(course.durationMonths % 12 === 0 ? 0 : 1)} years`
      : `${course.durationMonths} months`;
  const topColleges = course.topColleges
    .map((s) => colleges.find((c) => c.slug === s))
    .filter(Boolean) as typeof colleges;
  const similar = courses
    .filter((c) => c.slug !== course.slug && (c.stream === course.stream || c.level === course.level))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${course.heroAccent} text-white`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,255,255,0.18),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_85%,rgba(0,0,0,0.3),transparent_60%)]" />
        <div className="container-page relative py-16 md:py-20">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80 hover:text-white"
          >
            <ArrowLeft className="size-3" /> All courses
          </Link>

          <div className="mt-6 grid items-end gap-10 md:grid-cols-[1fr_auto]">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono-tight rounded-full bg-black/30 backdrop-blur px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]">
                  {course.level} • {course.mode}
                </span>
                {stream && (
                  <span className="rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
                    {stream.name}
                  </span>
                )}
              </div>
              <h1 className="font-display mt-4 text-4xl leading-[1.05] tracking-tight md:text-6xl">
                {course.name}
              </h1>
              <p className="mt-5 max-w-2xl text-base text-white/85 md:text-lg">{course.longDescription}</p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
                <span className="flex items-center gap-1.5">
                  <Clock className="size-4" /> {dur}
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="size-4" /> {course.collegesOffering.toLocaleString()} colleges
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="size-4" /> {course.studentsEnrolled} enrolled
                </span>
                <span className="flex items-center gap-1.5">
                  <Star className="size-4 fill-gold text-gold" />
                  <strong className="text-white">{course.rating}</strong>
                  <span className="text-white/60">({course.ratingCount.toLocaleString()})</span>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-brand">
                Find colleges <ArrowRight className="size-4" />
              </button>
              <button className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-3 text-sm font-bold backdrop-blur">
                <Download className="size-4" /> Syllabus PDF
              </button>
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

      {/* Sticky nav */}
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
          <main className="space-y-16">
            {/* Overview */}
            <section id="overview" className="scroll-mt-32">
              <SectionTitle eyebrow="Overview" title="At a glance" />

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="Duration" value={dur} />
                <Stat label="Avg salary" value={course.avgSalary} accent />
                <Stat label="Highest salary" value={course.highestSalary} />
                <Stat label="Mode" value={course.mode} />
              </div>

              <div className="mt-8 rounded-3xl border border-border bg-card p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-foreground/70">Why choose this</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                  {course.whyChoose.map((w) => (
                    <li key={w} className="flex items-start gap-3">
                      <div className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-gold-soft text-gold">
                        <CheckCircle2 className="size-4" />
                      </div>
                      <p className="text-sm font-medium">{w}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 rounded-3xl border border-border bg-card p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-foreground/70">Skills you'll build</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {course.skills.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1 rounded-full bg-academic/10 px-3 py-1.5 text-xs font-bold text-academic"
                    >
                      <Sparkles className="size-3" /> {s}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Curriculum */}
            <section id="curriculum" className="scroll-mt-32">
              <SectionTitle eyebrow="What you'll study" title="Curriculum" />
              <ol className="mt-6 space-y-4">
                {course.curriculum.map((c, i) => (
                  <li
                    key={c.term}
                    className="relative rounded-3xl border border-border bg-card p-6 pl-20"
                  >
                    <div className="absolute left-6 top-6 grid size-9 place-items-center rounded-full bg-brand text-xs font-bold text-brand-foreground">
                      {i + 1}
                    </div>
                    <p className="font-display text-xl">{c.term}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {c.topics.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-foreground/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Careers */}
            <section id="careers" className="scroll-mt-32">
              <SectionTitle eyebrow="After graduation" title="Career paths & salary" />

              <div className="mt-6 overflow-hidden rounded-3xl border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-surface text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    <tr>
                      <th className="px-5 py-4">Role</th>
                      <th className="px-5 py-4 text-right">Salary range</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    {course.careerPaths.map((cp) => (
                      <tr key={cp.role} className="transition-colors hover:bg-secondary/50">
                        <td className="px-5 py-4 font-semibold text-foreground">
                          <span className="inline-flex items-center gap-2">
                            <Briefcase className="size-4 text-academic" />
                            {cp.role}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right font-mono-tight font-bold text-academic">
                          {cp.salary}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6">
                <p className="text-xs font-bold uppercase tracking-widest text-foreground/70">Top recruiters</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {course.topRecruiters.map((r) => (
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

            {/* Top colleges */}
            <section id="colleges" className="scroll-mt-32">
              <SectionTitle eyebrow="Where to study" title="Top colleges offering this course" />
              {topColleges.length > 0 ? (
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  {topColleges.map((c, i) => (
                    <CollegeCard key={c.slug} college={c} index={i} />
                  ))}
                </div>
              ) : (
                <p className="mt-6 text-sm text-muted-foreground">College mapping coming soon.</p>
              )}
            </section>

            {/* Reviews */}
            <section id="reviews" className="scroll-mt-32">
              <CourseReviews
                courseSlug={course.slug}
                courseName={course.name}
                initial={getCourseReviews(course.slug)}
              />
            </section>

            {/* Eligibility */}
            <section id="eligibility" className="scroll-mt-32">
              <SectionTitle eyebrow="Admissions" title="Eligibility & entrance exams" />

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-border bg-card p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-foreground/70">Eligibility</p>
                  <ul className="mt-4 space-y-3">
                    {course.eligibility.map((e) => (
                      <li key={e} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-academic" />
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border border-border bg-card p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-foreground/70">
                    Accepted entrance exams
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {course.relatedExams.map((e) => (
                      <Link
                        key={e}
                        to="/exams"
                        className="inline-flex items-center gap-2 rounded-full bg-gold-soft px-3 py-1.5 text-xs font-bold text-brand hover:bg-gold/80"
                      >
                        <Award className="size-3" /> {e}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Similar */}
            <section id="similar" className="scroll-mt-32">
              <SectionTitle eyebrow="Keep exploring" title="Similar courses" />
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {similar.map((c) => (
                  <Link
                    key={c.slug}
                    to="/courses/$slug"
                    params={{ slug: c.slug }}
                    className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${c.heroAccent} p-5 text-white transition-transform hover:-translate-y-1`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.3),transparent_60%)]" />
                    <div className="relative">
                      <p className="font-mono-tight text-[10px] font-bold uppercase tracking-widest opacity-80">
                        {c.level} • {c.mode}
                      </p>
                      <p className="font-display mt-2 text-xl leading-tight">{c.shortName}</p>
                      <p className="mt-2 line-clamp-2 text-xs opacity-80">{c.description}</p>
                      <p className="font-mono-tight mt-4 text-xs font-bold">{c.feesRange}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-[170px] lg:self-start">
            <div className="rounded-3xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-foreground/70">Total fees</p>
              <p className="font-display mt-2 text-3xl font-semibold text-academic">{course.feesRange}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Across {course.collegesOffering.toLocaleString()} colleges
              </p>

              <div className="mt-5 space-y-3 border-t border-border pt-5">
                <Row icon={Clock} label="Duration" value={dur} />
                <Row icon={GraduationCap} label="Level" value={course.level} />
                <Row icon={Users} label="Mode" value={course.mode} />
                <Row icon={TrendingUp} label="Avg salary" value={course.avgSalary} />
                <Row icon={Award} label="Highest" value={course.highestSalary} />
              </div>

              <Link
                to="/colleges"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-brand-foreground"
              >
                See colleges <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/college-predictor"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-bold hover:bg-secondary"
              >
                <Sparkles className="size-4 text-gold" /> Predict admission
              </Link>
            </div>

            <div className="rounded-3xl border border-border bg-gradient-to-br from-brand to-academic p-6 text-white">
              <BookOpen className="size-6 text-gold" />
              <p className="font-display mt-3 text-xl leading-tight">Talk to a counselor</p>
              <p className="mt-2 text-sm text-white/80">
                15-minute call with an unbiased EduFinder advisor. Free for students.
              </p>
              <button className="mt-4 w-full rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-brand">
                Book a slot
              </button>
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
      <p className="font-mono-tight text-[10px] font-bold uppercase tracking-[0.22em] text-academic">
        {eyebrow}
      </p>
      <h2 className="font-display mt-2 text-3xl leading-tight tracking-tight md:text-4xl">{title}</h2>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent ? "border-gold/40 bg-gold-soft" : "border-border bg-card"
      }`}
    >
      <p className="font-mono-tight text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className={`font-display mt-2 text-2xl font-semibold ${accent ? "text-brand" : "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="inline-flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4" /> {label}
      </span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
