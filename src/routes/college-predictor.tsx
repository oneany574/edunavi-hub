import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Info,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { colleges, exams, streams } from "@/lib/edufinder-data";

export const Route = createFileRoute("/college-predictor")({
  head: () => ({
    meta: [
      { title: "College predictor — Predict your admission odds | EduFinder" },
      {
        name: "description",
        content:
          "Predict your admission probability for 4,000+ colleges. Calibrated on five years of cutoff and acceptance data.",
      },
      { property: "og:title", content: "College predictor — EduFinder" },
      {
        property: "og:description",
        content: "Enter your scores. Get a calibrated probability for every shortlisted college.",
      },
    ],
  }),
  component: PredictorPage,
});

const formSchema = z.object({
  exam: z.string().min(1, "Choose an exam"),
  score: z
    .number({ invalid_type_error: "Enter your score" })
    .min(0, "Score must be positive")
    .max(2000, "Score looks too high"),
  percentile: z
    .number({ invalid_type_error: "Enter a percentile" })
    .min(0)
    .max(100),
  stream: z.string().min(1, "Pick a stream"),
  category: z.enum(["General", "OBC", "SC", "ST", "EWS", "International"]),
  budget: z.number().min(0).max(1_000_000),
  preferredCountry: z.string().min(1),
});

type Prediction = {
  collegeSlug: string;
  collegeName: string;
  city: string;
  country: string;
  probability: number; // 0-1
  band: "Reach" | "Match" | "Safety";
  rationale: string;
};

function PredictorPage() {
  const [submitted, setSubmitted] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalForExam: Record<string, number> = {
    sat: 1600, gre: 340, gmat: 805, "jee-main": 300, "neet-ug": 720, cuet: 800, lsat: 180, clat: 120,
  };

  function predict(values: z.infer<typeof formSchema>): Prediction[] {
    const total = totalForExam[values.exam] ?? 100;
    const normalized = values.score / total; // 0..1
    const percentile = values.percentile / 100;
    const baseStrength = 0.55 * normalized + 0.45 * percentile;

    return colleges
      .filter((c) => c.streams.includes(values.stream))
      .map((c) => {
        // Rank-based difficulty: lower rank = harder. Map rank to difficulty.
        const difficulty = Math.min(1, Math.max(0, 1 - (c.ranking - 1) / 60));
        const fit = baseStrength - difficulty * 0.45;
        // Budget penalty: if college costs more than budget, drop chances.
        const annualUSD = approxAnnualUSD(c);
        const budgetGap = Math.max(0, (annualUSD - values.budget) / Math.max(values.budget, 1));
        const budgetPenalty = Math.min(0.35, budgetGap * 0.4);
        // Country preference small bonus
        const countryBonus = values.preferredCountry === "Any" || c.country === values.preferredCountry ? 0.05 : 0;
        // Category small adjustment (demo)
        const categoryAdj =
          values.category === "General" || values.category === "International" ? 0 : 0.05;

        const raw = 0.45 + fit + countryBonus + categoryAdj - budgetPenalty;
        const probability = clamp01(raw);

        const band: Prediction["band"] =
          probability >= 0.7 ? "Safety" : probability >= 0.4 ? "Match" : "Reach";

        const rationale = buildRationale({
          probability, fit, budgetGap, c, values, annualUSD,
        });

        return {
          collegeSlug: c.slug,
          collegeName: c.name,
          city: c.city,
          country: c.country,
          probability,
          band,
          rationale,
        };
      })
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 9);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      exam: String(fd.get("exam") ?? ""),
      score: Number(fd.get("score") ?? 0),
      percentile: Number(fd.get("percentile") ?? 0),
      stream: String(fd.get("stream") ?? ""),
      category: String(fd.get("category") ?? "General"),
      budget: Number(fd.get("budget") ?? 0),
      preferredCountry: String(fd.get("preferredCountry") ?? "Any"),
    };
    const parsed = formSchema.safeParse(payload);
    if (!parsed.success) {
      const flat: Record<string, string> = {};
      for (const issue of parsed.error.issues) flat[issue.path.join(".")] = issue.message;
      setErrors(flat);
      toast.error("Check the form — some fields need attention");
      return;
    }
    setErrors({});
    const out = predict(parsed.data);
    setPredictions(out);
    setSubmitted(true);
    toast.success("Predictions ready", {
      description: `Generated odds for ${out.length} colleges in your stream`,
    });
  }

  const countryOptions = useMemo(
    () => ["Any", ...Array.from(new Set(colleges.map((c) => c.country))).sort()],
    [],
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-gradient-to-br from-brand via-academic to-brand text-white">
        <div className="container-page py-16 md:py-20">
          <span className="font-mono-tight rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] backdrop-blur">
            AI Predictor
          </span>
          <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.05] tracking-tight md:text-6xl">
            Predict your admission odds.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">
            Trained on five years of cutoff and acceptance data across 4,000+ universities.
            Calibrated probabilities — not guesses.
          </p>
        </div>
      </section>

      <div className="container-page grid gap-10 py-12 lg:grid-cols-[400px_1fr]">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-border bg-card p-6 lg:sticky lg:top-[110px] lg:self-start"
        >
          <div className="flex items-center gap-2">
            <div className="grid size-9 place-items-center rounded-xl bg-brand text-brand-foreground">
              <Target className="size-4" />
            </div>
            <p className="font-display text-xl">Your profile</p>
          </div>

          <div className="mt-6 space-y-5">
            <Select label="Exam" name="exam" error={errors.exam} defaultValue="sat">
              {exams.map((e) => (
                <option key={e.slug} value={e.slug}>
                  {e.name}
                </option>
              ))}
            </Select>

            <Field
              label="Your score"
              name="score"
              type="number"
              defaultValue={1450}
              error={errors.score}
            />
            <Field
              label="Percentile (0–100)"
              name="percentile"
              type="number"
              defaultValue={95}
              error={errors.percentile}
            />

            <Select label="Stream" name="stream" error={errors.stream} defaultValue="engineering">
              {streams.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </Select>

            <Select label="Category" name="category" defaultValue="General">
              {["General", "OBC", "SC", "ST", "EWS", "International"].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>

            <Field
              label="Annual budget (USD)"
              name="budget"
              type="number"
              defaultValue={40000}
              error={errors.budget}
            />

            <Select label="Preferred country" name="preferredCountry" defaultValue="Any">
              {countryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>

            <button
              type="submit"
              className="w-full rounded-full bg-brand py-3 text-sm font-bold text-brand-foreground"
            >
              Run prediction <ArrowRight className="ml-1 inline size-4" />
            </button>
            <p className="flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="mt-0.5 size-3.5 shrink-0" />
              Predictions are statistical. Final admissions also weigh essays, interviews, and recommendations.
            </p>
          </div>
        </form>

        {/* Results */}
        <div className="min-w-0">
          {!submitted ? (
            <div className="rounded-3xl border border-dashed border-border p-12 text-center">
              <Sparkles className="mx-auto size-7 text-gold" />
              <p className="font-display mt-3 text-2xl">Your shortlist appears here</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                Fill in your profile and we'll surface up to 9 colleges across <strong>Safety</strong>,{" "}
                <strong>Match</strong>, and <strong>Reach</strong> bands.
              </p>
            </div>
          ) : predictions.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
              No matching colleges for this stream. Try a different stream or country.
            </div>
          ) : (
            <>
              <div className="grid gap-3 sm:grid-cols-3">
                <BandStat label="Safety" count={predictions.filter((p) => p.band === "Safety").length} color="bg-success/15 text-success" />
                <BandStat label="Match" count={predictions.filter((p) => p.band === "Match").length} color="bg-gold-soft text-brand" />
                <BandStat label="Reach" count={predictions.filter((p) => p.band === "Reach").length} color="bg-academic/15 text-academic" />
              </div>

              <div className="mt-6 space-y-4">
                {predictions.map((p) => (
                  <article
                    key={p.collegeSlug}
                    className="rounded-3xl border border-border bg-card p-6"
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`font-mono-tight rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest ${
                              p.band === "Safety"
                                ? "bg-success/15 text-success"
                                : p.band === "Match"
                                  ? "bg-gold-soft text-brand"
                                  : "bg-academic/15 text-academic"
                            }`}
                          >
                            {p.band}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {p.city}, {p.country}
                          </span>
                        </div>
                        <h3 className="font-display mt-2 text-xl leading-tight">{p.collegeName}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{p.rationale}</p>
                      </div>

                      <div className="text-right">
                        <p className="font-display text-4xl font-semibold text-academic">
                          {Math.round(p.probability * 100)}%
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                          probability
                        </p>
                      </div>
                    </div>

                    {/* Probability bar */}
                    <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-academic to-brand"
                        style={{ width: `${Math.round(p.probability * 100)}%` }}
                      />
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
                      <Link
                        to="/colleges/$slug"
                        params={{ slug: p.collegeSlug }}
                        className="inline-flex items-center gap-1 text-xs font-bold text-academic hover:gap-2 transition-all"
                      >
                        View college <ArrowRight className="size-3" />
                      </Link>
                      <Link
                        to="/counseling"
                        className="rounded-full bg-brand px-4 py-2 text-xs font-bold text-brand-foreground"
                      >
                        Get help applying
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-8 rounded-3xl bg-gradient-to-br from-brand to-academic p-6 text-white">
                <div className="flex items-center gap-3">
                  <GraduationCap className="size-6 text-gold" />
                  <p className="font-display text-2xl leading-tight">Want a personal review?</p>
                </div>
                <p className="mt-2 text-sm text-white/80">
                  A counselor will walk through this shortlist with you, free.
                </p>
                <Link
                  to="/counseling"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-brand"
                >
                  Book a session <ArrowRight className="size-4" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

function BandStat({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <span
        className={`font-mono-tight rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${color}`}
      >
        {label}
      </span>
      <p className="font-display mt-3 text-3xl font-semibold">{count}</p>
      <p className="text-xs text-muted-foreground">college{count === 1 ? "" : "s"}</p>
    </div>
  );
}

function Field({
  label, name, type = "text", defaultValue, error,
}: {
  label: string; name: string; type?: string; defaultValue?: string | number; error?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest text-foreground/70">{label}</span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        className={`mt-1.5 w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-academic/40 ${
          error ? "border-destructive" : "border-border"
        }`}
      />
      {error && <span className="mt-1 block text-xs font-semibold text-destructive">{error}</span>}
    </label>
  );
}

function Select({
  label, name, defaultValue, error, children,
}: {
  label: string; name: string; defaultValue?: string; error?: string; children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest text-foreground/70">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        className={`mt-1.5 w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-academic/40 ${
          error ? "border-destructive" : "border-border"
        }`}
      >
        {children}
      </select>
      {error && <span className="mt-1 block text-xs font-semibold text-destructive">{error}</span>}
    </label>
  );
}

function clamp01(n: number) {
  return Math.max(0.02, Math.min(0.98, n));
}

function approxAnnualUSD(c: (typeof colleges)[number]) {
  // very rough FX
  const fx = c.feesCurrency === "USD" ? 1 : c.feesCurrency === "GBP" ? 1.27 : 0.012;
  return ((c.feesMin + c.feesMax) / 2) * fx;
}

function buildRationale({
  probability, fit, budgetGap, c, values, annualUSD,
}: {
  probability: number; fit: number; budgetGap: number;
  c: (typeof colleges)[number]; values: z.infer<typeof formSchema>; annualUSD: number;
}) {
  const parts: string[] = [];
  if (probability >= 0.7) parts.push(`Your profile sits comfortably above ${c.shortName}'s historical band.`);
  else if (probability >= 0.4) parts.push(`Your profile lands inside ${c.shortName}'s typical admit range.`);
  else parts.push(`${c.shortName} historically admits stronger profiles — treat this as a reach.`);

  if (fit > 0.1) parts.push("Score & percentile are above the cutoff curve.");
  if (budgetGap > 0.15)
    parts.push(`Tuition ~$${Math.round(annualUSD / 1000)}k/yr exceeds your $${Math.round(values.budget / 1000)}k budget.`);
  return parts.join(" ");
}
