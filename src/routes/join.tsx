import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowRight,
  BookOpen,
  Check,
  Compass,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  School,
  Sparkles,
  User,
} from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";

const personas = [
  {
    id: "student",
    label: "Student",
    desc: "Shortlist, apply, track",
    icon: GraduationCap,
  },
  { id: "parent", label: "Parent", desc: "Guide my child", icon: Compass },
  { id: "counselor", label: "Counselor", desc: "Manage cohorts", icon: BookOpen },
  { id: "institution", label: "Institution", desc: "Claim & engage", icon: School },
] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z
    .string()
    .min(8, "Use at least 8 characters")
    .max(128)
    .regex(/[A-Z]/, "Add an uppercase letter")
    .regex(/[0-9]/, "Add a number"),
  persona: z.enum(["student", "parent", "counselor", "institution"]),
  agree: z.literal(true, { message: "Please accept the terms to continue" }),
});

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join free — EduFinder" },
      {
        name: "description",
        content:
          "Create your free EduFinder account. Shortlist colleges, track exams, and get personalised admission predictions in minutes.",
      },
      { property: "og:title", content: "Join EduFinder — free forever" },
      {
        property: "og:description",
        content:
          "Personalised college shortlists, exam tracking, and admission predictions.",
      },
    ],
  }),
  component: JoinPage,
});

function JoinPage() {
  const navigate = useNavigate();
  const [persona, setPersona] = useState<(typeof personas)[number]["id"]>("student");
  const [showPw, setShowPw] = useState(false);
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const strength = useMemo(() => scorePassword(password), [password]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      password,
      persona,
      agree,
    });
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as string;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Account ready 🎉", {
        description:
          "This is a UI preview — connect Lovable Cloud to start storing real accounts.",
      });
      navigate({ to: "/" });
    }, 800);
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 right-1/3 size-[640px] rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 size-[460px] rounded-full bg-brand/10 blur-3xl" />
        </div>

        <div className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_1.05fr] lg:py-24">
          {/* Left: form */}
          <section className="order-2 rounded-3xl border border-border bg-card p-8 shadow-2xl shadow-brand/5 sm:p-10 lg:order-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
              Free forever
            </p>
            <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Create your EduFinder account
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Already with us?{" "}
              <Link to="/login" className="font-semibold text-brand hover:underline">
                Log in
              </Link>
            </p>

            {/* Persona picker */}
            <div className="mt-7">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground/70">
                I am a…
              </p>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {personas.map((p) => {
                  const Icon = p.icon;
                  const active = persona === p.id;
                  return (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => setPersona(p.id)}
                      className={`group flex flex-col items-start gap-2 rounded-2xl border p-3 text-left transition-all ${
                        active
                          ? "border-brand bg-brand/5 ring-2 ring-brand/15"
                          : "border-border bg-background hover:border-brand/40"
                      }`}
                    >
                      <span
                        className={`grid size-8 place-items-center rounded-xl ${
                          active
                            ? "bg-brand text-brand-foreground"
                            : "bg-secondary text-foreground"
                        }`}
                      >
                        <Icon className="size-4" />
                      </span>
                      <span className="text-sm font-semibold text-foreground">
                        {p.label}
                      </span>
                      <span className="text-[11px] leading-tight text-muted-foreground">
                        {p.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={onSubmit} className="mt-6 space-y-4" noValidate>
              <Field
                label="Full name"
                name="name"
                type="text"
                placeholder="Aarav Sharma"
                icon={User}
                error={errors.name}
              />
              <Field
                label="Email"
                name="email"
                type="email"
                placeholder="you@school.edu"
                icon={Mail}
                error={errors.email}
              />

              <div>
                <Field
                  label="Password"
                  name="password"
                  type={showPw ? "text" : "password"}
                  placeholder="At least 8 characters"
                  icon={Lock}
                  error={errors.password}
                  value={password}
                  onChange={setPassword}
                  rightSlot={
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      className="text-muted-foreground hover:text-foreground"
                      aria-label={showPw ? "Hide password" : "Show password"}
                    >
                      {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  }
                />
                <PasswordStrength score={strength} />
              </div>

              <label className="flex items-start gap-2.5 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-0.5 size-3.5 rounded border-border accent-brand"
                />
                <span>
                  I agree to the{" "}
                  <Link to="/" className="underline hover:text-foreground">
                    Terms
                  </Link>{" "}
                  &{" "}
                  <Link to="/" className="underline hover:text-foreground">
                    Privacy Policy
                  </Link>{" "}
                  and to receive admission updates.
                </span>
              </label>
              {errors.agree && (
                <p className="text-xs font-medium text-destructive">{errors.agree}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-transform hover:-translate-y-px disabled:opacity-60"
              >
                {loading ? "Creating your account…" : "Create free account"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <div className="my-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <span className="h-px flex-1 bg-border" />
                or sign up with
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <SocialButton label="Google" />
                <SocialButton label="Apple" />
              </div>
            </form>
          </section>

          {/* Right: value props */}
          <section className="order-1 relative flex flex-col justify-between rounded-3xl border border-border bg-gradient-to-br from-brand via-brand to-academic p-10 text-brand-foreground lg:order-2">
            <div>
              <Link to="/" className="inline-flex items-center gap-2">
                <div className="grid size-10 place-items-center rounded-xl bg-gold text-brand">
                  <GraduationCap className="size-5" />
                </div>
                <span className="font-display text-2xl font-semibold tracking-tight">
                  EduFinder
                </span>
              </Link>
              <h2 className="font-display mt-10 text-4xl font-semibold leading-[1.05] tracking-tight">
                Your admissions
                <br />
                command center.
              </h2>
              <p className="mt-4 max-w-md text-sm text-brand-foreground/75">
                Join 2.4M+ students using EduFinder to make confident,
                evidence-backed college decisions.
              </p>
            </div>

            <ul className="mt-10 space-y-3">
              {[
                "Personalised shortlists across 4,280 institutions",
                "Real-time exam calendar with 120+ entrance tests",
                "Predictor with Safety / Match / Reach scoring",
                "Verified student reviews & placement data",
                "Free 1:1 counselor session worth $49",
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 rounded-2xl bg-brand-foreground/5 px-4 py-3"
                >
                  <span className="mt-0.5 grid size-5 place-items-center rounded-full bg-gold text-brand">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  <span className="text-sm text-brand-foreground/90">{line}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-center gap-4 rounded-2xl bg-brand-foreground/5 p-4">
              <div className="grid size-10 place-items-center rounded-xl bg-gold text-brand">
                <Sparkles className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">No credit card. Cancel anytime.</p>
                <p className="text-xs text-brand-foreground/70">
                  Core features are free for life.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function scorePassword(pw: string): number {
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(s, 4);
}

function PasswordStrength({ score }: { score: number }) {
  const labels = ["Too weak", "Weak", "Okay", "Strong", "Excellent"];
  const colors = [
    "bg-destructive",
    "bg-destructive/70",
    "bg-gold",
    "bg-academic",
    "bg-brand",
  ];
  return (
    <div className="mt-2 flex items-center gap-2">
      <div className="flex flex-1 gap-1">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i < score ? colors[score] : "bg-secondary"
            }`}
          />
        ))}
      </div>
      <span className="w-20 text-right text-[11px] font-semibold text-muted-foreground">
        {labels[score]}
      </span>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  placeholder,
  icon: Icon,
  error,
  rightSlot,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  icon: React.ComponentType<{ className?: string }>;
  error?: string;
  rightSlot?: React.ReactNode;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground/70">
        {label}
      </span>
      <span
        className={`flex items-center gap-2 rounded-2xl border bg-background px-4 py-3 transition-colors focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15 ${
          error ? "border-destructive/60" : "border-border"
        }`}
      >
        <Icon className="size-4 text-muted-foreground" />
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          {...(value !== undefined
            ? { value, onChange: (e) => onChange?.(e.target.value) }
            : {})}
          autoComplete={
            name === "password"
              ? "new-password"
              : name === "email"
                ? "email"
                : name === "name"
                  ? "name"
                  : "on"
          }
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        {rightSlot}
      </span>
      {error && (
        <span className="mt-1 block text-xs font-medium text-destructive">{error}</span>
      )}
    </label>
  );
}

function SocialButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() =>
        toast.info(`${label} sign-up`, {
          description: "Enable Lovable Cloud to wire this up in seconds.",
        })
      }
      className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-background px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
    >
      <span
        aria-hidden
        className="grid size-5 place-items-center rounded-full bg-secondary text-[10px] font-bold"
      >
        {label[0]}
      </span>
      Continue with {label}
    </button>
  );
}
