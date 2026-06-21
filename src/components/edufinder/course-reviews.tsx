import { useMemo, useState } from "react";
import { CheckCircle2, Flag, Quote, ShieldCheck, Star, ThumbsUp } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import type { CourseReview } from "@/lib/edufinder-data";

const subRatings = [
  { key: "teaching", label: "Teaching" },
  { key: "curriculum", label: "Curriculum" },
  { key: "careerOutcomes", label: "Career outcomes" },
  { key: "valueForMoney", label: "Value for money" },
] as const;

const reviewSchema = z.object({
  author: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  authorEmail: z.string().trim().email("Enter a valid email").max(255),
  graduationYear: z
    .number({ invalid_type_error: "Graduation year required" })
    .int()
    .min(1970)
    .max(2035),
  title: z.string().trim().min(8, "Title is too short").max(120),
  body: z.string().trim().min(60, "Tell us at least 60 characters").max(2000),
  pros: z.string().trim().max(280).optional().or(z.literal("")),
  cons: z.string().trim().max(280).optional().or(z.literal("")),
  rating: z.number().min(1).max(5),
  ratings: z.object({
    teaching: z.number().min(1).max(5),
    curriculum: z.number().min(1).max(5),
    careerOutcomes: z.number().min(1).max(5),
    valueForMoney: z.number().min(1).max(5),
  }),
  recommend: z.boolean(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm you've actually attended this program" }),
  }),
});

export function CourseReviews({
  courseSlug,
  courseName,
  initial,
}: {
  courseSlug: string;
  courseName: string;
  initial: CourseReview[];
}) {
  const [items, setItems] = useState<CourseReview[]>(initial);
  const [showForm, setShowForm] = useState(false);

  const avg = useMemo(() => {
    if (items.length === 0) return 0;
    return items.reduce((s, r) => s + r.rating, 0) / items.length;
  }, [items]);

  const distribution = useMemo(() => {
    const buckets = [5, 4, 3, 2, 1].map((stars) => {
      const count = items.filter((r) => Math.round(r.rating) === stars).length;
      return { stars, pct: items.length ? Math.round((count / items.length) * 100) : 0 };
    });
    return buckets;
  }, [items]);

  function handleHelpful(id: string) {
    setItems((prev) =>
      prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r)),
    );
    toast.success("Thanks for the signal");
  }
  function handleReport(id: string) {
    setItems((prev) =>
      prev.map((r) => (r.id === id ? { ...r, reportedCount: r.reportedCount + 1 } : r)),
    );
    toast("Reported — our moderation team will review it.", { icon: "🛡️" });
  }

  return (
    <div>
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="font-mono-tight text-[10px] font-bold uppercase tracking-[0.22em] text-academic">
            Student voices
          </p>
          <h2 className="font-display mt-2 text-3xl leading-tight tracking-tight md:text-4xl">
            Reviews & ratings
          </h2>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground"
        >
          {showForm ? "Close form" : "Write a review"}
        </button>
      </div>

      {/* Summary */}
      <div className="mt-6 grid gap-6 rounded-3xl border border-border bg-card p-6 md:grid-cols-[200px_1fr]">
        <div className="text-center md:border-r md:border-border md:pr-6">
          <p className="font-display text-6xl font-semibold tracking-tight">
            {avg.toFixed(1)}
          </p>
          <div className="mt-2 flex items-center justify-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-4 ${i < Math.round(avg) ? "fill-gold text-gold" : "text-border"}`}
              />
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {items.length.toLocaleString()} verified reviews
          </p>
        </div>
        <div className="space-y-2">
          {distribution.map((d) => (
            <div key={d.stars} className="flex items-center gap-3 text-sm">
              <span className="w-3 font-mono-tight font-bold">{d.stars}</span>
              <Star className="size-3 fill-gold text-gold" />
              <div className="flex-1 overflow-hidden rounded-full bg-secondary">
                <div className="h-1.5 rounded-full bg-academic" style={{ width: `${d.pct}%` }} />
              </div>
              <span className="w-10 text-right font-mono-tight text-xs text-muted-foreground">
                {d.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Submission form */}
      {showForm && (
        <ReviewForm
          courseSlug={courseSlug}
          courseName={courseName}
          onSubmitted={(r) => {
            setItems((prev) => [r, ...prev]);
            setShowForm(false);
          }}
        />
      )}

      {/* Reviews list */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.length > 0 ? (
          items.map((r) => (
            <article key={r.id} className="rounded-3xl border border-border bg-card p-6">
              <div className="flex items-start justify-between gap-3">
                <Quote className="size-5 text-gold" />
                <div className="flex items-center gap-1 text-xs">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-3.5 ${i < Math.round(r.rating) ? "fill-gold text-gold" : "text-border"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="font-display mt-3 text-lg">"{r.title}"</p>
              <p className="mt-2 text-sm text-muted-foreground">{r.body}</p>

              {(r.pros || r.cons) && (
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {r.pros && (
                    <div className="rounded-xl bg-gold-soft px-3 py-2 text-xs">
                      <p className="font-bold text-brand">Pros</p>
                      <p className="text-foreground/80">{r.pros}</p>
                    </div>
                  )}
                  {r.cons && (
                    <div className="rounded-xl bg-secondary px-3 py-2 text-xs">
                      <p className="font-bold">Cons</p>
                      <p className="text-foreground/80">{r.cons}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs">
                <div>
                  <p className="font-bold text-foreground">{r.author}</p>
                  <p className="text-muted-foreground">Class of {r.graduationYear}</p>
                </div>
                <div className="flex items-center gap-2">
                  {r.verified && (
                    <span className="flex items-center gap-1 text-success font-bold">
                      <ShieldCheck className="size-3" /> Verified
                    </span>
                  )}
                  <button
                    onClick={() => handleHelpful(r.id)}
                    className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-1 font-semibold hover:bg-secondary"
                  >
                    <ThumbsUp className="size-3" /> {r.helpfulCount}
                  </button>
                  <button
                    onClick={() => handleReport(r.id)}
                    aria-label="Report review"
                    className="inline-flex items-center rounded-full border border-border p-1 hover:bg-secondary"
                  >
                    <Flag className="size-3" />
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-3xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground md:col-span-2">
            No reviews yet. Be the first to share your experience.
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewForm({
  courseSlug,
  courseName,
  onSubmitted,
}: {
  courseSlug: string;
  courseName: string;
  onSubmitted: (r: CourseReview) => void;
}) {
  const [rating, setRating] = useState(5);
  const [ratings, setRatings] = useState({
    teaching: 5, curriculum: 5, careerOutcomes: 5, valueForMoney: 5,
  });
  const [recommend, setRecommend] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      author: String(fd.get("author") ?? ""),
      authorEmail: String(fd.get("authorEmail") ?? ""),
      graduationYear: Number(fd.get("graduationYear") ?? 0),
      title: String(fd.get("title") ?? ""),
      body: String(fd.get("body") ?? ""),
      pros: String(fd.get("pros") ?? ""),
      cons: String(fd.get("cons") ?? ""),
      rating,
      ratings,
      recommend,
      consent: fd.get("consent") === "on",
    };
    const parsed = reviewSchema.safeParse(payload);
    if (!parsed.success) {
      const flat: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        flat[issue.path.join(".")] = issue.message;
      }
      setErrors(flat);
      setSubmitting(false);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setErrors({});

    const review: CourseReview = {
      id: `cr-${Date.now()}`,
      courseSlug,
      author: parsed.data.author,
      authorEmail: parsed.data.authorEmail,
      graduationYear: parsed.data.graduationYear,
      rating,
      ratings,
      title: parsed.data.title,
      body: parsed.data.body,
      pros: parsed.data.pros || undefined,
      cons: parsed.data.cons || undefined,
      recommend,
      helpfulCount: 0,
      reportedCount: 0,
      verified: false,
      language: "en",
      submittedAt: new Date().toISOString(),
      status: "pending",
    };

    onSubmitted(review);
    toast.success("Review submitted — pending moderation", {
      description: `Thanks for reviewing ${courseName}. It'll appear once approved.`,
    });
    setSubmitting(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 rounded-3xl border border-border bg-card p-6 space-y-6"
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-academic">
        <CheckCircle2 className="size-4" /> Share your experience
      </div>

      {/* Overall rating */}
      <div>
        <label className="text-xs font-bold uppercase tracking-widest text-foreground/70">
          Overall rating
        </label>
        <div className="mt-2 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              onClick={() => setRating(n)}
              aria-label={`Rate ${n} stars`}
              className="p-1"
            >
              <Star
                className={`size-7 transition-transform hover:scale-110 ${
                  n <= rating ? "fill-gold text-gold" : "text-border"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Sub-ratings */}
      <div className="grid gap-3 sm:grid-cols-2">
        {subRatings.map((s) => (
          <div key={s.key} className="rounded-2xl border border-border bg-background px-4 py-3">
            <p className="text-xs font-semibold">{s.label}</p>
            <div className="mt-1 flex gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  type="button"
                  key={n}
                  onClick={() =>
                    setRatings((prev) => ({ ...prev, [s.key]: n }))
                  }
                  aria-label={`${s.label} ${n} stars`}
                >
                  <Star
                    className={`size-4 ${
                      n <= ratings[s.key] ? "fill-gold text-gold" : "text-border"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" name="author" error={errors.author} placeholder="Anonymous OK" />
        <Field
          label="Email (kept private)"
          name="authorEmail"
          type="email"
          error={errors.authorEmail}
          placeholder="you@school.edu"
        />
        <Field
          label="Graduation year"
          name="graduationYear"
          type="number"
          defaultValue={new Date().getFullYear()}
          error={errors.graduationYear}
        />
        <div className="flex items-end gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={recommend}
              onChange={(e) => setRecommend(e.target.checked)}
              className="size-4 accent-academic"
            />
            I'd recommend this course
          </label>
        </div>
      </div>

      <Field label="Headline" name="title" error={errors.title} placeholder="Sum it up in one line" />

      <TextArea
        label="Your detailed review"
        name="body"
        error={errors.body}
        rows={5}
        placeholder="What worked, what didn't, what surprised you. Be specific — 60+ characters."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <TextArea
          label="Pros (optional)"
          name="pros"
          error={errors.pros}
          rows={3}
          placeholder="What this course does well"
        />
        <TextArea
          label="Cons (optional)"
          name="cons"
          error={errors.cons}
          rows={3}
          placeholder="What could be better"
        />
      </div>

      <label className="flex items-start gap-3 text-xs text-muted-foreground">
        <input type="checkbox" name="consent" className="mt-0.5 size-4 accent-academic" />
        <span>
          I confirm I attended this program and that this review reflects my honest experience.
          Submissions go through moderation before publishing.
          {errors.consent && (
            <span className="block mt-1 font-semibold text-destructive">{errors.consent}</span>
          )}
        </span>
      </label>

      <div className="flex items-center justify-end gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-foreground disabled:opacity-50"
        >
          {submitting ? "Submitting…" : "Submit for review"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  error,
  defaultValue,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  defaultValue?: string | number;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest text-foreground/70">
        {label}
      </span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`mt-1.5 w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-academic/40 ${
          error ? "border-destructive" : "border-border"
        }`}
      />
      {error && <span className="mt-1 block text-xs font-semibold text-destructive">{error}</span>}
    </label>
  );
}

function TextArea({
  label,
  name,
  rows = 4,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  rows?: number;
  placeholder?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest text-foreground/70">
        {label}
      </span>
      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        className={`mt-1.5 w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-academic/40 ${
          error ? "border-destructive" : "border-border"
        }`}
      />
      {error && <span className="mt-1 block text-xs font-semibold text-destructive">{error}</span>}
    </label>
  );
}
