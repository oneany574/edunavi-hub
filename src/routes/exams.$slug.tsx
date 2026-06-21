import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Gauge,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { colleges, exams, getExam } from "@/lib/edufinder-data";

export const Route = createFileRoute("/exams/$slug")({
  loader: ({ params }) => {
    const exam = getExam(params.slug);
    if (!exam) throw notFound();
    return exam;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Dates, Pattern, Syllabus | EduFinder` },
          {
            name: "description",
            content: `${loaderData.fullName} (${loaderData.name}) by ${loaderData.conductingBody}. Exam date ${loaderData.examDate}. Pattern, syllabus, eligibility, and participating colleges.`,
          },
          { property: "og:title", content: `${loaderData.name} — ${loaderData.fullName}` },
          {
            property: "og:description",
            content: loaderData.about?.slice(0, 160) ?? "Entrance exam details on EduFinder.",
          },
        ]
      : [{ title: "Exam — EduFinder" }],
    links: loaderData ? [{ rel: "canonical", href: `/exams/${loaderData.slug}` }] : [],
  }),
  component: ExamDetailPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container-page py-32 text-center">
        <h1 className="font-display text-5xl">Exam not found</h1>
        <p className="mt-3 text-muted-foreground">We couldn't find this exam.</p>
        <Link
          to="/exams"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-brand-foreground"
        >
          <ArrowLeft className="size-4" /> Browse all exams
        </Link>
      </div>
      <SiteFooter />
    </div>
  ),
});

const sections = [
  { id: "overview", label: "Overview" },
  { id: "pattern", label: "Pattern" },
  { id: "syllabus", label: "Syllabus" },
  { id: "dates", label: "Important dates" },
  { id: "eligibility", label: "Eligibility" },
  { id: "colleges", label: "Participating colleges" },
  { id: "prep", label: "Prep tips" },
] as const;

function ExamDetailPage() {
  const exam = Route.useLoaderData() as NonNullable<ReturnType<typeof getExam>>;
  const accent = exam.heroAccent ?? "from-brand to-academic";
  const participating = (exam.participatingColleges ?? [])
    .map((s) => colleges.find((c) => c.slug === s))
    .filter(Boolean) as typeof colleges;
  const similar = exams.filter((e) => e.slug !== exam.slug && e.stream === exam.stream).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${accent} text-white`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
        <div className="container-page relative py-16 md:py-20">
          <Link
            to="/exams"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80 hover:text-white"
          >
            <ArrowLeft className="size-3" /> All exams
          </Link>

          <div className="mt-6 grid items-end gap-10 md:grid-cols-[1fr_auto]">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono-tight rounded-full bg-black/25 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur">
                  {exam.level}
                </span>
                <span className="rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-brand">
                  {exam.stream}
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur">
                  Difficulty · {exam.difficulty}
                </span>
              </div>
              <h1 className="font-display mt-4 text-4xl leading-[1.05] tracking-tight md:text-6xl">
                {exam.name}
              </h1>
              <p className="mt-2 text-base text-white/80">{exam.fullName}</p>
              <p className="mt-5 max-w-2xl text-base text-white/85">{exam.about}</p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
                <span className="flex items-center gap-1.5">
                  <Building2 className="size-4" /> {exam.conductingBody}
                </span>
                {exam.modeOfExam && (
                  <span className="flex items-center gap-1.5">
                    <Gauge className="size-4" /> {exam.modeOfExam}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-4" /> Exam: <strong>{exam.examDate}</strong>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                to="/college-predictor"
                className="flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-bold text-brand"
              >
                Predict colleges <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/counseling"
                className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-3 text-sm font-bold backdrop-blur"
              >
                Talk to a counselor
              </Link>
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
              className="shrink-0 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-foreground/70 hover:bg-secondary hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <main className="space-y-16">
            {/* Overview stats */}
            <section id="overview" className="scroll-mt-32">
              <SectionTitle eyebrow="At a glance" title="Quick overview" />
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Stat label="Duration" value={exam.durationMinutes ? `${exam.durationMinutes} min` : "—"} />
                <Stat label="Total marks" value={exam.totalMarks?.toString() ?? "—"} accent />
                <Stat label="Questions" value={exam.questionCount?.toString() ?? "—"} />
                <Stat label="Fee" value={exam.registrationFee ?? "—"} />
              </div>
            </section>

            {/* Pattern */}
            {exam.pattern && exam.pattern.length > 0 && (
              <section id="pattern" className="scroll-mt-32">
                <SectionTitle eyebrow="Format" title="Exam pattern" />
                <div className="mt-6 overflow-hidden rounded-3xl border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-surface text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      <tr>
                        <th className="px-5 py-4">Section</th>
                        <th className="px-5 py-4 text-right">Questions</th>
                        <th className="px-5 py-4 text-right">Marks</th>
                        <th className="px-5 py-4 text-right">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      {exam.pattern.map((p) => (
                        <tr key={p.section}>
                          <td className="px-5 py-4 font-semibold">{p.section}</td>
                          <td className="px-5 py-4 text-right font-mono-tight">{p.questions}</td>
                          <td className="px-5 py-4 text-right font-mono-tight">{p.marks}</td>
                          <td className="px-5 py-4 text-right font-mono-tight">{p.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Syllabus */}
            {exam.syllabus && exam.syllabus.length > 0 && (
              <section id="syllabus" className="scroll-mt-32">
                <SectionTitle eyebrow="What to study" title="Syllabus" />
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {exam.syllabus.map((s) => (
                    <div key={s.subject} className="rounded-3xl border border-border bg-card p-6">
                      <div className="flex items-center gap-2">
                        <BookOpen className="size-4 text-academic" />
                        <p className="font-display text-xl">{s.subject}</p>
                      </div>
                      <ul className="mt-4 space-y-2 text-sm">
                        {s.topics.map((t) => (
                          <li key={t} className="flex items-start gap-2">
                            <CheckCircle2 className="mt-0.5 size-3.5 text-academic" /> {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Important dates */}
            {exam.importantDates && exam.importantDates.length > 0 && (
              <section id="dates" className="scroll-mt-32">
                <SectionTitle eyebrow="Calendar" title="Important dates" />
                <ol className="mt-6 space-y-3">
                  {exam.importantDates.map((d, i) => (
                    <li
                      key={d.label}
                      className="flex items-center gap-5 rounded-3xl border border-border bg-card p-5"
                    >
                      <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gold-soft text-brand font-bold font-mono-tight">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="flex-1">
                        <p className="font-display text-lg leading-tight">{d.label}</p>
                      </div>
                      <span className="font-mono-tight font-bold text-academic">{d.date}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Eligibility */}
            {exam.eligibility && exam.eligibility.length > 0 && (
              <section id="eligibility" className="scroll-mt-32">
                <SectionTitle eyebrow="Who can apply" title="Eligibility" />
                <div className="mt-6 rounded-3xl border border-border bg-card p-6">
                  <ul className="space-y-3">
                    {exam.eligibility.map((e) => (
                      <li key={e} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="mt-0.5 size-4 text-academic" />
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Participating colleges */}
            <section id="colleges" className="scroll-mt-32">
              <SectionTitle eyebrow="Where it gets you in" title="Participating colleges" />
              {participating.length > 0 ? (
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {participating.map((c) => (
                    <Link
                      key={c.slug}
                      to="/colleges/$slug"
                      params={{ slug: c.slug }}
                      className="group flex items-start gap-4 rounded-3xl border border-border bg-card p-5 hover:border-academic/40"
                    >
                      <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-academic/10 text-academic">
                        <GraduationCap className="size-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-lg leading-tight">{c.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {c.city}, {c.country} • Rank #{c.ranking}
                        </p>
                      </div>
                      <ArrowRight className="mt-2 size-4 text-academic opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="mt-6 rounded-3xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                  College mapping for this exam is in editorial review.
                </div>
              )}
            </section>

            {/* Prep tips */}
            {exam.prepTips && exam.prepTips.length > 0 && (
              <section id="prep" className="scroll-mt-32">
                <SectionTitle eyebrow="From toppers" title="Prep tips" />
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {exam.prepTips.map((t, i) => (
                    <div key={t} className="rounded-3xl bg-gradient-to-br from-brand to-academic p-5 text-white">
                      <p className="font-mono-tight text-[10px] font-bold uppercase tracking-widest text-gold">
                        Tip {i + 1}
                      </p>
                      <p className="font-display mt-3 text-lg leading-tight">{t}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Similar */}
            {similar.length > 0 && (
              <section className="scroll-mt-32">
                <SectionTitle eyebrow="Keep exploring" title="Related exams" />
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {similar.map((e) => (
                    <Link
                      key={e.slug}
                      to="/exams/$slug"
                      params={{ slug: e.slug }}
                      className="rounded-3xl border border-border bg-card p-5 hover:-translate-y-0.5 transition-transform"
                    >
                      <Award className="size-5 text-academic" />
                      <p className="font-display mt-3 text-xl">{e.name}</p>
                      <p className="text-xs text-muted-foreground">{e.conductingBody}</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </main>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-[170px] lg:self-start">
            <div className="rounded-3xl border border-border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-foreground/70">
                Registration
              </p>
              <p className="font-display mt-2 text-3xl font-semibold text-academic">
                {exam.registrationStatus}
              </p>

              <div className="mt-5 space-y-3 border-t border-border pt-5 text-sm">
                <Row icon={Calendar} label="Opens" value={exam.applicationOpens} />
                <Row icon={Calendar} label="Closes" value={exam.applicationCloses} />
                <Row icon={Clock} label="Exam" value={exam.examDate} />
                <Row icon={Award} label="Result" value={exam.resultDate} />
              </div>

              <button className="mt-6 w-full rounded-full bg-brand px-5 py-3 text-sm font-bold text-brand-foreground">
                Set exam reminder
              </button>
              <Link
                to="/college-predictor"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-bold hover:bg-secondary"
              >
                <Sparkles className="size-4 text-gold" /> Predict your colleges
              </Link>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-brand to-academic p-6 text-white">
              <BookOpen className="size-6 text-gold" />
              <p className="font-display mt-3 text-xl">Need a study plan?</p>
              <p className="mt-2 text-sm text-white/80">
                A counselor will benchmark your prep and recommend a 90-day plan.
              </p>
              <Link
                to="/counseling"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-bold text-brand"
              >
                Book a free call <ArrowRight className="size-3" />
              </Link>
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

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        accent ? "border-gold/40 bg-gold-soft" : "border-border bg-card"
      }`}
    >
      <p className="font-mono-tight text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p
        className={`font-display mt-2 text-2xl font-semibold ${
          accent ? "text-brand" : "text-foreground"
        }`}
      >
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
      <span className="font-semibold text-right">{value}</span>
    </div>
  );
}
