import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, RotateCcw, Trophy, XCircle } from "lucide-react";
import { toast } from "sonner";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { getMockTest, type MockTest } from "@/lib/edufinder-more";

export const Route = createFileRoute("/mock-tests/$slug")({
  loader: ({ params }) => {
    const test = getMockTest(params.slug);
    if (!test) throw notFound();
    return test;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Mock test"} — Free practice | EduFinder` },
      { name: "description", content: loaderData?.summary ?? "Free mock test with instant scoring." },
      { property: "og:title", content: `${loaderData?.title ?? "Mock test"} — EduFinder` },
      { property: "og:description", content: loaderData?.summary ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="container-page py-24 text-center">
        <h1 className="font-display text-4xl">Mock test not found</h1>
        <Link to="/mock-tests" className="mt-4 inline-block text-brand underline">Browse mock tests</Link>
      </div>
    </div>
  ),
  component: MockTestDetail,
});

type Stage = "intro" | "quiz" | "result";

function MockTestDetail() {
  const test = Route.useLoaderData() as MockTest;
  const [stage, setStage] = useState<Stage>("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(test.durationMin * 60);

  useEffect(() => {
    if (stage !== "quiz") return;
    if (timeLeft <= 0) {
      setStage("result");
      toast.info("Time's up — auto-submitted");
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [stage, timeLeft]);

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  const score = useMemo(() => {
    let s = 0;
    for (const q of test.questions) if (answers[q.id] === q.answer) s += 1;
    return s;
  }, [answers, test.questions]);

  function start() {
    setStage("quiz");
    setIdx(0);
    setAnswers({});
    setTimeLeft(test.durationMin * 60);
  }

  function reset() {
    setStage("intro");
    setAnswers({});
    setIdx(0);
    setTimeLeft(test.durationMin * 60);
  }

  const current = test.questions[idx];
  const answered = Object.keys(answers).length;
  const pct = Math.round((score / test.questions.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {stage === "intro" && (
        <>
          <section className={`bg-gradient-to-br ${test.heroAccent} text-white`}>
            <div className="container-page py-16">
              <Link to="/mock-tests" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white">
                <ArrowLeft className="size-4" /> All mock tests
              </Link>
              <span className="font-mono-tight mt-6 inline-block rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]">
                {test.exam} · {test.difficulty}
              </span>
              <h1 className="font-display mt-4 max-w-3xl text-4xl leading-[1.05] tracking-tight md:text-5xl">
                {test.title}
              </h1>
              <p className="mt-4 max-w-2xl text-white/85">{test.summary}</p>
            </div>
          </section>

          <div className="container-page grid gap-8 py-12 lg:grid-cols-[1fr_360px]">
            <div className="rounded-3xl border border-border bg-card p-8">
              <p className="font-display text-2xl">Before you start</p>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li>• {test.totalQuestions} questions · {test.durationMin} minutes · auto-submit at time-out</li>
                <li>• You can revisit and change answers before submitting</li>
                <li>• Answer key + explanations appear immediately after submission</li>
                <li>• Retake unlimited times — attempts are private</li>
              </ul>
              <p className="mt-6 text-xs font-bold uppercase tracking-widest text-foreground/70">What you'll practise</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {test.syllabus.map((s) => (
                  <span key={s} className="rounded-full bg-secondary px-3 py-1.5 text-xs">{s}</span>
                ))}
              </div>
              <button
                onClick={start}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-foreground hover:-translate-y-px transition-transform"
              >
                Start test <ArrowRight className="size-4" />
              </button>
            </div>

            <aside className="rounded-3xl bg-gradient-to-br from-brand to-academic p-6 text-white">
              <Trophy className="size-6 text-gold" />
              <p className="font-display mt-3 text-xl">Your score is saved locally</p>
              <p className="mt-2 text-sm text-white/80">
                Create a free account to save results across devices and track progress over time.
              </p>
              <Link to="/join" className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-bold text-brand">
                Join free <ArrowRight className="size-3" />
              </Link>
            </aside>
          </div>
        </>
      )}

      {stage === "quiz" && current && (
        <div className="container-page max-w-3xl py-10">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-widest text-foreground/70">
              Question {idx + 1} / {test.questions.length}
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm font-mono-tight font-bold tabular-nums">
              <Clock className="size-3.5" /> {mm}:{ss}
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full bg-brand transition-all" style={{ width: `${((idx + 1) / test.questions.length) * 100}%` }} />
          </div>

          <div className="mt-8 rounded-3xl border border-border bg-card p-8">
            <p className="font-display text-2xl leading-snug">{current.prompt}</p>
            <div className="mt-6 space-y-2">
              {current.options.map((opt, i) => {
                const chosen = answers[current.id] === i;
                return (
                  <button
                    key={i}
                    onClick={() => setAnswers((a) => ({ ...a, [current.id]: i }))}
                    className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left text-sm transition-all ${
                      chosen ? "border-brand bg-brand/5 ring-2 ring-brand/30" : "border-border hover:border-academic/50 hover:bg-secondary"
                    }`}
                  >
                    <span className={`grid size-7 place-items-center rounded-full font-mono-tight text-xs font-bold ${
                      chosen ? "bg-brand text-brand-foreground" : "bg-secondary"
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              disabled={idx === 0}
              onClick={() => setIdx((i) => Math.max(0, i - 1))}
              className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold disabled:opacity-40"
            >
              ← Previous
            </button>
            <p className="text-xs text-muted-foreground">Answered {answered}/{test.questions.length}</p>
            {idx < test.questions.length - 1 ? (
              <button
                onClick={() => setIdx((i) => i + 1)}
                className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => setStage("result")}
                className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      )}

      {stage === "result" && (
        <div className="container-page max-w-3xl py-12">
          <div className="rounded-3xl bg-gradient-to-br from-brand via-academic to-brand p-10 text-center text-white">
            <Trophy className="mx-auto size-12 text-gold" />
            <p className="font-mono-tight mt-4 text-xs font-bold uppercase tracking-[0.22em] text-white/80">Your score</p>
            <p className="font-display mt-2 text-6xl">{score}<span className="text-3xl text-white/60"> / {test.questions.length}</span></p>
            <p className="mt-2 text-lg font-semibold text-gold">{pct}%</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button onClick={reset} className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-brand">
                <RotateCcw className="size-4" /> Retake
              </button>
              <Link to="/mock-tests" className="rounded-full bg-white/15 px-5 py-2.5 text-sm font-bold backdrop-blur hover:bg-white/25">
                More tests
              </Link>
            </div>
          </div>

          <p className="font-display mt-10 text-2xl">Answer key</p>
          <div className="mt-4 space-y-3">
            {test.questions.map((q, i) => {
              const picked = answers[q.id];
              const correct = picked === q.answer;
              return (
                <div key={q.id} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-start gap-3">
                    {correct ? <CheckCircle2 className="mt-0.5 size-5 text-success" /> : <XCircle className="mt-0.5 size-5 text-destructive" />}
                    <div className="flex-1">
                      <p className="text-sm font-semibold">Q{i + 1}. {q.prompt}</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Your answer:{" "}
                        <span className={correct ? "text-success font-semibold" : "text-destructive font-semibold"}>
                          {picked !== undefined ? q.options[picked] : "— skipped —"}
                        </span>
                      </p>
                      {!correct && (
                        <p className="text-xs text-muted-foreground">
                          Correct answer: <span className="font-semibold text-foreground">{q.options[q.answer]}</span>
                        </p>
                      )}
                      {q.explain && <p className="mt-2 rounded-xl bg-secondary p-3 text-xs text-foreground/80">{q.explain}</p>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
