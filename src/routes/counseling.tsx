import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Clock, Phone, ShieldCheck, Sparkles, Users } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { streams } from "@/lib/edufinder-data";

export const Route = createFileRoute("/counseling")({
  head: () => ({
    meta: [
      { title: "Talk to a counselor — Free admissions help | EduFinder" },
      {
        name: "description",
        content:
          "Free 15-minute call with an unbiased EduFinder counselor. Shortlist colleges, plan exams, and review applications.",
      },
      { property: "og:title", content: "Talk to a counselor — EduFinder" },
      {
        property: "og:description",
        content: "Book a free 15-minute counseling call. Unbiased. No upsells.",
      },
    ],
  }),
  component: CounselingPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20)
    .regex(/^[+\d\s()-]+$/, "Use digits, spaces, +, -, ( )"),
  country: z.string().trim().min(2).max(60),
  stream: z.string().min(1, "Pick a stream of interest"),
  studyLevel: z.enum(["UG", "PG", "Doctorate", "Diploma"]),
  intake: z.enum(["Fall 2026", "Spring 2027", "Fall 2027", "Later"]),
  budget: z.enum(["< $15k", "$15k – $40k", "$40k – $80k", "$80k+", "Need scholarship"]),
  message: z.string().trim().max(800).optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please consent to be contacted" }),
  }),
});

function CounselingPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      country: String(fd.get("country") ?? ""),
      stream: String(fd.get("stream") ?? ""),
      studyLevel: String(fd.get("studyLevel") ?? "UG"),
      intake: String(fd.get("intake") ?? "Fall 2026"),
      budget: String(fd.get("budget") ?? "$15k – $40k"),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
    };
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      const flat: Record<string, string> = {};
      for (const i of parsed.error.issues) flat[i.path.join(".")] = i.message;
      setErrors(flat);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setErrors({});
    setSubmitted(true);
    toast.success("Enquiry received", {
      description: "A counselor will reach out within one business day.",
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-gradient-to-br from-brand via-academic to-brand text-white">
        <div className="container-page py-16 md:py-20">
          <span className="font-mono-tight rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] backdrop-blur">
            Counseling
          </span>
          <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.05] tracking-tight md:text-6xl">
            Talk to an unbiased counselor.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">
            Free 15-minute call. We don't sell admissions packages. We help you build a shortlist
            that actually fits your scores, budget, and goals.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-white/85">
            <span className="flex items-center gap-2">
              <Clock className="size-4 text-gold" /> 15-minute session
            </span>
            <span className="flex items-center gap-2">
              <Users className="size-4 text-gold" /> 240+ counselors
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-gold" /> Zero pressure, zero upsells
            </span>
          </div>
        </div>
      </section>

      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_360px]">
        {submitted ? (
          <div className="rounded-3xl border border-success/30 bg-success/5 p-10 text-center">
            <CheckCircle2 className="mx-auto size-12 text-success" />
            <h2 className="font-display mt-4 text-3xl">Enquiry received</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              A counselor will reach out within one business day. You'll also get a confirmation
              email with a shortlist of colleges that already match your profile.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Link
                to="/colleges"
                className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground"
              >
                Browse colleges
              </Link>
              <Link
                to="/college-predictor"
                className="rounded-full border border-border px-5 py-2.5 text-sm font-bold hover:bg-secondary"
              >
                Run the predictor
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-xl bg-brand text-brand-foreground">
                <Phone className="size-4" />
              </div>
              <p className="font-display text-2xl">Book a free session</p>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" error={errors.name} />
              <Field label="Email" name="email" type="email" error={errors.email} />
              <Field label="Phone (with country code)" name="phone" error={errors.phone} placeholder="+1 415 555 0142" />
              <Field label="Country" name="country" error={errors.country} defaultValue="United States" />

              <Select label="Stream of interest" name="stream" error={errors.stream}>
                <option value="">Select stream</option>
                {streams.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </Select>
              <Select label="Study level" name="studyLevel" defaultValue="UG">
                {["UG", "PG", "Doctorate", "Diploma"].map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </Select>
              <Select label="Target intake" name="intake" defaultValue="Fall 2026">
                {["Fall 2026", "Spring 2027", "Fall 2027", "Later"].map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </Select>
              <Select label="Annual budget" name="budget" defaultValue="$15k – $40k">
                {["< $15k", "$15k – $40k", "$40k – $80k", "$80k+", "Need scholarship"].map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </Select>
            </div>

            <label className="mt-5 block">
              <span className="text-xs font-bold uppercase tracking-widest text-foreground/70">
                What do you want help with? (optional)
              </span>
              <textarea
                name="message"
                rows={4}
                placeholder="e.g. shortlisting MBA programs in Europe, SAT prep plan, scholarship strategy…"
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-academic/40"
              />
            </label>

            <label className="mt-5 flex items-start gap-3 text-xs text-muted-foreground">
              <input type="checkbox" name="consent" className="mt-0.5 size-4 accent-academic" />
              <span>
                I agree to be contacted by EduFinder counselors via email and phone. I can opt out at any
                time. Read our{" "}
                <Link to="/" className="font-bold text-academic underline underline-offset-4">
                  privacy policy
                </Link>
                .
                {errors.consent && (
                  <span className="block mt-1 font-semibold text-destructive">{errors.consent}</span>
                )}
              </span>
            </label>

            <button
              type="submit"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-foreground"
            >
              Request my session <ArrowRight className="size-4" />
            </button>
          </form>
        )}

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-foreground/70">
              What you'll get
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                "Personalized shortlist of 5–8 colleges",
                "Honest read on your competitiveness",
                "Calendar of exams and deadlines",
                "Scholarship leads tailored to your profile",
                "Application plan for the next 90 days",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-academic" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-brand to-academic p-6 text-white">
            <Sparkles className="size-6 text-gold" />
            <p className="font-display mt-3 text-xl">Why students trust us</p>
            <p className="mt-2 text-sm text-white/80">
              Counselors are paid salaries, not commissions. We don't sell admissions packages.
              Recommendations are anchored to your scores, not our partners.
            </p>
          </div>
        </aside>
      </div>

      <SiteFooter />
    </div>
  );
}

function Field({
  label, name, type = "text", placeholder, defaultValue, error,
}: {
  label: string; name: string; type?: string; placeholder?: string; defaultValue?: string; error?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest text-foreground/70">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
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
