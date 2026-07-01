import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, ArrowLeft, Award, Building2, CheckCircle2, FileBadge, ShieldCheck, Upload } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { consultancies } from "@/lib/edufinder-more";

type Search = { consultancy?: string };

export const Route = createFileRoute("/claim-consultancy")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    consultancy: typeof s.consultancy === "string" ? s.consultancy : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Claim your consultancy — EduFinder" },
      { name: "description", content: "Claim and verify your consultancy profile on EduFinder. Manage services, respond to reviews, and get admissions leads." },
      { property: "og:title", content: "Claim your consultancy — EduFinder" },
      { property: "og:description", content: "Verify your consultancy and manage your EduFinder profile." },
    ],
  }),
  component: ClaimConsultancyPage,
});

const STEPS = ["Identity", "Business details", "Documents", "Review"] as const;
type StepIdx = 0 | 1 | 2 | 3 | 4;

const identitySchema = z.object({
  consultancySlug: z.string().min(1, "Select your consultancy"),
  officialName: z.string().trim().min(2, "Enter the official business name").max(120),
  contactName: z.string().trim().min(2).max(80),
  designation: z.string().trim().min(2).max(80),
  workEmail: z.string().trim().email().max(255).refine(
    (e) => !/@(gmail|yahoo|outlook|hotmail|icloud)\./i.test(e),
    "Please use your business email address",
  ),
  workPhone: z.string().trim().min(7).max(20).regex(/^[+\d\s()-]+$/, "Invalid characters"),
});

const businessSchema = z.object({
  website: z.string().trim().url().max(255),
  registrationNo: z.string().trim().min(3, "Business registration required").max(80),
  yearsInOperation: z.coerce.number().min(0).max(80),
  hqAddress: z.string().trim().min(6).max(240),
});

const documentsSchema = z.object({
  primaryDoc: z.enum(["Business registration", "GST / Tax ID", "MEA / ICEF certificate"]),
  agreesTerms: z.literal(true, { errorMap: () => ({ message: "You must agree to platform terms" }) }),
});

function ClaimConsultancyPage() {
  const search = Route.useSearch();
  const initial = useMemo(
    () => (search.consultancy && consultancies.some((c) => c.slug === search.consultancy) ? search.consultancy : ""),
    [search.consultancy],
  );

  const [step, setStep] = useState<StepIdx>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    consultancySlug: initial,
    officialName: "",
    contactName: "",
    designation: "",
    workEmail: "",
    workPhone: "",
    website: "",
    registrationNo: "",
    yearsInOperation: "" as unknown as number,
    hqAddress: "",
    primaryDoc: "Business registration",
    fileName: "",
    agreesTerms: false,
  });

  function set<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function validateAndAdvance() {
    let parsed;
    if (step === 0) parsed = identitySchema.safeParse(form);
    else if (step === 1) parsed = businessSchema.safeParse(form);
    else if (step === 2) parsed = documentsSchema.safeParse(form);
    else parsed = { success: true } as const;

    if (!parsed.success) {
      const flat: Record<string, string> = {};
      for (const i of parsed.error.issues) flat[i.path.join(".")] = i.message;
      setErrors(flat);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setErrors({});
    setStep((s) => (s + 1) as StepIdx);
    if (step === 3) {
      toast.success("Claim submitted", { description: "We'll verify within 2 business days." });
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-gradient-to-br from-brand via-academic to-brand text-white">
        <div className="container-page py-16">
          <span className="font-mono-tight rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] backdrop-blur">
            For consultancies
          </span>
          <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.05] tracking-tight md:text-5xl">
            Claim your consultancy profile.
          </h1>
          <p className="mt-4 max-w-2xl text-white/85">
            Verified consultancies get lead analytics, review responses, and premium visibility across EduFinder.
          </p>
        </div>
      </section>

      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_320px]">
        <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
          <Stepper step={step} />

          {step === 4 ? (
            <SubmittedCard />
          ) : (
            <div className="mt-8">
              {step === 0 && (
                <StepShell title="Identity verification" icon={<ShieldCheck className="size-4" />}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <Select label="Which consultancy do you represent?" value={form.consultancySlug} onChange={(v) => set("consultancySlug", v)} error={errors.consultancySlug}>
                        <option value="">Search directory…</option>
                        {consultancies.map((c) => (
                          <option key={c.slug} value={c.slug}>{c.name} — {c.city}</option>
                        ))}
                      </Select>
                    </div>
                    <Field label="Official business name" value={form.officialName} onChange={(v) => set("officialName", v)} error={errors.officialName} />
                    <Field label="Your full name" value={form.contactName} onChange={(v) => set("contactName", v)} error={errors.contactName} />
                    <Field label="Your designation" value={form.designation} onChange={(v) => set("designation", v)} placeholder="Founder, Director…" error={errors.designation} />
                    <Field label="Work email" type="email" value={form.workEmail} onChange={(v) => set("workEmail", v)} placeholder="you@company.com" error={errors.workEmail} />
                    <Field label="Work phone" value={form.workPhone} onChange={(v) => set("workPhone", v)} placeholder="+91 98…" error={errors.workPhone} />
                  </div>
                </StepShell>
              )}

              {step === 1 && (
                <StepShell title="Business details" icon={<Building2 className="size-4" />}>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Website" value={form.website} onChange={(v) => set("website", v)} placeholder="https://" error={errors.website} />
                    <Field label="Business registration no." value={form.registrationNo} onChange={(v) => set("registrationNo", v)} error={errors.registrationNo} />
                    <Field label="Years in operation" type="number" value={String(form.yearsInOperation ?? "")} onChange={(v) => set("yearsInOperation", Number(v) as number)} error={errors.yearsInOperation} />
                    <div className="sm:col-span-2">
                      <Field label="Head office address" value={form.hqAddress} onChange={(v) => set("hqAddress", v)} error={errors.hqAddress} />
                    </div>
                  </div>
                </StepShell>
              )}

              {step === 2 && (
                <StepShell title="Upload documents" icon={<FileBadge className="size-4" />}>
                  <Select label="Primary verification document" value={form.primaryDoc} onChange={(v) => set("primaryDoc", v)}>
                    {["Business registration", "GST / Tax ID", "MEA / ICEF certificate"].map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </Select>
                  <label className="mt-5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border p-8 text-center text-sm text-muted-foreground hover:border-academic/50 hover:bg-secondary/40">
                    <Upload className="size-6 text-academic" />
                    <p className="font-semibold text-foreground">{form.fileName || "Click to upload PDF or image"}</p>
                    <p className="text-xs">Max 10 MB. Files stay private and are used only for verification.</p>
                    <input
                      type="file"
                      accept="application/pdf,image/*"
                      className="hidden"
                      onChange={(e) => set("fileName", e.target.files?.[0]?.name ?? "")}
                    />
                  </label>
                  <label className="mt-5 flex items-start gap-3 text-xs text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={form.agreesTerms}
                      onChange={(e) => set("agreesTerms", e.target.checked)}
                      className="mt-0.5 size-4 accent-academic"
                    />
                    <span>
                      I confirm I'm authorised to represent this consultancy and agree to EduFinder's listing terms.
                      {errors.agreesTerms && <span className="mt-1 block font-semibold text-destructive">{errors.agreesTerms}</span>}
                    </span>
                  </label>
                </StepShell>
              )}

              {step === 3 && (
                <StepShell title="Review & submit" icon={<Award className="size-4" />}>
                  <ReviewRow label="Consultancy" value={consultancies.find((c) => c.slug === form.consultancySlug)?.name ?? "—"} />
                  <ReviewRow label="Contact" value={`${form.contactName} · ${form.designation}`} />
                  <ReviewRow label="Work email" value={form.workEmail} />
                  <ReviewRow label="Phone" value={form.workPhone} />
                  <ReviewRow label="Website" value={form.website} />
                  <ReviewRow label="Registration no." value={form.registrationNo} />
                  <ReviewRow label="Document" value={`${form.primaryDoc}${form.fileName ? ` · ${form.fileName}` : ""}`} />
                  <p className="mt-6 rounded-2xl bg-gold-soft p-4 text-xs text-brand">
                    On submission our admin team will review within <strong>2 business days</strong>. You'll receive a confirmation at your work email.
                  </p>
                </StepShell>
              )}

              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep((s) => (Math.max(0, s - 1) as StepIdx))}
                  disabled={step === 0}
                  className="inline-flex items-center gap-1 rounded-full border border-border px-5 py-2.5 text-sm font-semibold disabled:opacity-40"
                >
                  <ArrowLeft className="size-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={validateAndAdvance}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-foreground"
                >
                  {step === 3 ? "Submit claim" : "Continue"} <ArrowRight className="size-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-foreground/70">Claim workflow</p>
            <ol className="mt-4 space-y-3 text-sm">
              {["Identity verification", "Business documents", "Admin review", "Approved", "Consultancy dashboard"].map((s, i) => (
                <li key={s} className="flex items-start gap-3">
                  <div className="grid size-7 shrink-0 place-items-center rounded-full bg-gold-soft font-mono-tight text-[10px] font-bold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-brand to-academic p-6 text-white">
            <ShieldCheck className="size-6 text-gold" />
            <p className="font-display mt-3 text-xl">Already verified?</p>
            <p className="mt-2 text-sm text-white/80">Head to your consultancy dashboard to manage leads and reviews.</p>
            <Link to="/dashboard/consultancy" className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-bold text-brand">
              Open dashboard <ArrowRight className="size-3" />
            </Link>
          </div>
        </aside>
      </div>

      <SiteFooter />
    </div>
  );
}

function Stepper({ step }: { step: StepIdx }) {
  return (
    <ol className="grid gap-2 sm:grid-cols-4">
      {STEPS.map((label, i) => {
        const done = i < step || step === 4;
        const active = i === step;
        return (
          <li
            key={label}
            className={`flex items-center gap-3 rounded-2xl border p-3 ${
              active ? "border-brand bg-brand/5" : done ? "border-success/30 bg-success/5" : "border-border"
            }`}
          >
            <div
              className={`grid size-8 shrink-0 place-items-center rounded-full font-mono-tight text-xs font-bold ${
                done ? "bg-success text-white" : active ? "bg-brand text-brand-foreground" : "bg-secondary text-foreground/60"
              }`}
            >
              {done ? <CheckCircle2 className="size-4" /> : i + 1}
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/60">Step {i + 1}</p>
              <p className="truncate text-sm font-semibold">{label}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function StepShell({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-2">
        <div className="grid size-9 place-items-center rounded-xl bg-brand text-brand-foreground">{icon}</div>
        <p className="font-display text-2xl">{title}</p>
      </div>
      {children}
    </div>
  );
}

function SubmittedCard() {
  return (
    <div className="mt-8 rounded-3xl border border-success/30 bg-success/5 p-10 text-center">
      <CheckCircle2 className="mx-auto size-12 text-success" />
      <h2 className="font-display mt-4 text-3xl">Claim submitted</h2>
      <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
        Our verification team will review your submission within 2 business days. You'll be notified via your work email.
      </p>
      <Link to="/consultancies" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground">
        Browse consultancies <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}

function Field({
  label, value, onChange, type = "text", placeholder, error,
}: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; error?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest text-foreground/70">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        placeholder={placeholder}
        className={`mt-1.5 w-full rounded-xl border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-academic/40 ${
          error ? "border-destructive" : "border-border"
        }`}
      />
      {error && <span className="mt-1 block text-xs font-semibold text-destructive">{error}</span>}
    </label>
  );
}

function Select({
  label, value, onChange, error, children,
}: { label: string; value: string; onChange: (v: string) => void; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest text-foreground/70">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
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

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border py-3 text-sm last:border-0">
      <span className="text-xs font-bold uppercase tracking-widest text-foreground/60">{label}</span>
      <span className="text-right font-semibold text-foreground">{value || "—"}</span>
    </div>
  );
}
