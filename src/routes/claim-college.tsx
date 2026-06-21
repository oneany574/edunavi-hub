import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Award,
  Building2,
  CheckCircle2,
  FileBadge,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { colleges } from "@/lib/edufinder-data";

type Search = { college?: string };

export const Route = createFileRoute("/claim-college")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    college: typeof search.college === "string" ? search.college : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Claim your college — Verify your institution | EduFinder" },
      {
        name: "description",
        content:
          "Claim and verify your college profile on EduFinder. Update info, respond to reviews, and manage your institution's presence.",
      },
      { property: "og:title", content: "Claim your college — EduFinder" },
      {
        property: "og:description",
        content: "Verify your institution and manage your EduFinder profile.",
      },
    ],
  }),
  component: ClaimCollegePage,
});

const schema = z.object({
  collegeSlug: z.string().min(1, "Pick the college you represent"),
  officialName: z.string().trim().min(2, "Enter the official college name").max(120),
  contactName: z.string().trim().min(2, "Enter your name").max(80),
  designation: z.string().trim().min(2, "Enter your role").max(80),
  workEmail: z
    .string()
    .trim()
    .email("Enter a valid email")
    .max(255)
    .refine(
      (e) => !/@(gmail|yahoo|outlook|hotmail|icloud)\./i.test(e),
      "Please use your institutional email address",
    ),
  workPhone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20)
    .regex(/^[+\d\s()-]+$/, "Use digits, spaces, +, -, ( )"),
  website: z.string().trim().url("Enter a valid URL").max(255),
  proofType: z.enum(["Domain email", "Authorization letter", "Government ID"]),
  notes: z.string().trim().max(800).optional().or(z.literal("")),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm you are authorized to claim this profile" }),
  }),
});

function ClaimCollegePage() {
  const search = Route.useSearch();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const initialCollege = useMemo(
    () => (search.college && colleges.some((c) => c.slug === search.college) ? search.college : ""),
    [search.college],
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      collegeSlug: String(fd.get("collegeSlug") ?? ""),
      officialName: String(fd.get("officialName") ?? ""),
      contactName: String(fd.get("contactName") ?? ""),
      designation: String(fd.get("designation") ?? ""),
      workEmail: String(fd.get("workEmail") ?? ""),
      workPhone: String(fd.get("workPhone") ?? ""),
      website: String(fd.get("website") ?? ""),
      proofType: String(fd.get("proofType") ?? "Domain email"),
      notes: String(fd.get("notes") ?? ""),
      consent: fd.get("consent") === "on",
    };
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      const flat: Record<string, string> = {};
      for (const i of parsed.error.issues) flat[i.path.join(".")] = i.message;
      setErrors(flat);
      toast.error("Some details need attention");
      return;
    }
    setErrors({});
    setSubmitted(true);
    toast.success("Claim submitted", {
      description: "Our verification team will review and respond within 2 business days.",
    });
  }

  const steps = [
    { icon: FileBadge, title: "Submit claim", body: "Identify the college and your role." },
    { icon: ShieldCheck, title: "Verify", body: "We confirm using your institutional email." },
    { icon: Building2, title: "Manage profile", body: "Edit info, respond to reviews, post events." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-gradient-to-br from-brand via-academic to-brand text-white">
        <div className="container-page py-16 md:py-20">
          <span className="font-mono-tight rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] backdrop-blur">
            For institutions
          </span>
          <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.05] tracking-tight md:text-6xl">
            Claim your college profile.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">
            Verified institutions can update info, publish courses and fees, respond to reviews,
            and access engagement analytics. Free, and always will be.
          </p>
        </div>
      </section>

      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_360px]">
        {submitted ? (
          <div className="rounded-3xl border border-success/30 bg-success/5 p-10 text-center">
            <CheckCircle2 className="mx-auto size-12 text-success" />
            <h2 className="font-display mt-4 text-3xl">Claim submitted</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              Our verification team will review your submission within 2 business days. We'll send
              a confirmation to your work email.
            </p>
            <Link
              to="/colleges"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-brand-foreground"
            >
              Browse colleges <ArrowRight className="size-4" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-6 md:p-8">
            <div className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-xl bg-brand text-brand-foreground">
                <Award className="size-4" />
              </div>
              <p className="font-display text-2xl">Tell us about your institution</p>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Select label="Select your college" name="collegeSlug" defaultValue={initialCollege} error={errors.collegeSlug}>
                  <option value="">Search the directory…</option>
                  {colleges.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name} — {c.city}, {c.country}
                    </option>
                  ))}
                </Select>
              </div>

              <Field label="Official institution name" name="officialName" error={errors.officialName} />
              <Field label="Official website" name="website" placeholder="https://" error={errors.website} />
              <Field label="Your full name" name="contactName" error={errors.contactName} />
              <Field label="Your designation" name="designation" placeholder="Dean, Admissions Director…" error={errors.designation} />
              <Field
                label="Work email"
                name="workEmail"
                type="email"
                placeholder="you@institution.edu"
                error={errors.workEmail}
              />
              <Field label="Work phone" name="workPhone" placeholder="+1 415 555 0142" error={errors.workPhone} />

              <div className="sm:col-span-2">
                <Select label="Verification method" name="proofType" defaultValue="Domain email" error={errors.proofType}>
                  {["Domain email", "Authorization letter", "Government ID"].map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <label className="mt-5 block">
              <span className="text-xs font-bold uppercase tracking-widest text-foreground/70">
                Anything else we should know? (optional)
              </span>
              <textarea
                name="notes"
                rows={4}
                placeholder="Links to your faculty page, LinkedIn, or anything that helps us verify quickly."
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-academic/40"
              />
            </label>

            <div className="mt-6 rounded-2xl border border-dashed border-border p-4 text-xs text-muted-foreground">
              <Upload className="mb-1.5 inline size-4 text-academic" /> Document upload is enabled
              after our team approves the first verification step — keeps your file private.
            </div>

            <label className="mt-5 flex items-start gap-3 text-xs text-muted-foreground">
              <input type="checkbox" name="consent" className="mt-0.5 size-4 accent-academic" />
              <span>
                I confirm I am authorized by the institution above to claim and manage this profile.
                {errors.consent && (
                  <span className="block mt-1 font-semibold text-destructive">{errors.consent}</span>
                )}
              </span>
            </label>

            <button
              type="submit"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-bold text-brand-foreground"
            >
              Submit claim <ArrowRight className="size-4" />
            </button>
          </form>
        )}

        <aside className="space-y-4">
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-foreground/70">
              How verification works
            </p>
            <ol className="mt-4 space-y-4">
              {steps.map((s, i) => (
                <li key={s.title} className="flex items-start gap-3">
                  <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-gold-soft text-brand font-mono-tight font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-brand to-academic p-6 text-white">
            <ShieldCheck className="size-6 text-gold" />
            <p className="font-display mt-3 text-xl">Already claimed?</p>
            <p className="mt-2 text-sm text-white/80">
              Head to your dashboard to edit your profile or respond to reviews.
            </p>
            <Link
              to="/dashboard/college"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-bold text-brand"
            >
              Open dashboard <ArrowRight className="size-3" />
            </Link>
          </div>
        </aside>
      </div>

      <SiteFooter />
    </div>
  );
}

function Field({
  label, name, type = "text", placeholder, error,
}: {
  label: string; name: string; type?: string; placeholder?: string; error?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest text-foreground/70">{label}</span>
      <input
        name={name}
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
