import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import {
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Trophy,
} from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(128),
});

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — EduFinder" },
      {
        name: "description",
        content:
          "Log in to EduFinder to track applications, save colleges, and resume your admissions journey.",
      },
      { property: "og:title", content: "Log in — EduFinder" },
      {
        property: "og:description",
        content: "Resume your admissions journey on EduFinder.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const result = schema.safeParse({
      email: fd.get("email"),
      password: fd.get("password"),
    });
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of result.error.issues) {
        const k = issue.path[0] as keyof typeof errors;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Welcome back!", {
        description: "This is a UI preview — connect Lovable Cloud to enable real sign-in.",
      });
      navigate({ to: "/" });
    }, 700);
  }

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-32 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 size-[420px] rounded-full bg-gold/10 blur-3xl" />
        </div>

        <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
          {/* Left: brand panel */}
          <section className="relative hidden lg:flex flex-col justify-between rounded-3xl border border-border bg-brand p-10 text-brand-foreground">
            <div>
              <Link to="/" className="inline-flex items-center gap-2">
                <div className="grid size-10 place-items-center rounded-xl bg-gold text-brand">
                  <GraduationCap className="size-5" />
                </div>
                <span className="font-display text-2xl font-semibold tracking-tight">
                  EduFinder
                </span>
              </Link>
              <h1 className="font-display mt-12 text-4xl font-semibold leading-[1.05] tracking-tight">
                Pick up where you left off.
              </h1>
              <p className="mt-4 max-w-md text-sm text-brand-foreground/75">
                Resume your shortlists, track admission deadlines, and unlock the
                Predictor's full insights — all in one place.
              </p>
            </div>

            <ul className="mt-10 space-y-4">
              {[
                {
                  icon: Trophy,
                  title: "4,280 institutions, ranked & reviewed",
                  body: "Real student reviews, fee breakdowns, placement data.",
                },
                {
                  icon: Sparkles,
                  title: "Predictor with 92% accuracy",
                  body: "Personalised Safety / Match / Reach shortlists.",
                },
                {
                  icon: ShieldCheck,
                  title: "Counselor-verified data",
                  body: "Every score & fee number is double-checked.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <li
                  key={title}
                  className="flex items-start gap-3 rounded-2xl bg-brand-foreground/5 p-4"
                >
                  <div className="grid size-9 place-items-center rounded-xl bg-gold text-brand">
                    <Icon className="size-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="text-xs text-brand-foreground/70">{body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-xs text-brand-foreground/60">
              © {new Date().getFullYear()} EduFinder. Built for the curious.
            </p>
          </section>

          {/* Right: form */}
          <section className="rounded-3xl border border-border bg-card p-8 shadow-2xl shadow-brand/5 sm:p-10">
            <div className="mb-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold">
                Welcome back
              </p>
              <h2 className="font-display mt-2 text-3xl font-semibold tracking-tight">
                Log in to EduFinder
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                New here?{" "}
                <Link to="/join" className="font-semibold text-brand hover:underline">
                  Create a free account
                </Link>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <SocialButton label="Google" />
              <SocialButton label="Apple" />
            </div>

            <div className="my-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <span className="h-px flex-1 bg-border" />
              or with email
              <span className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={onSubmit} className="space-y-4" noValidate>
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
                  placeholder="••••••••"
                  icon={Lock}
                  error={errors.password}
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
                <div className="mt-2 flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-muted-foreground">
                    <input
                      type="checkbox"
                      className="size-3.5 rounded border-border accent-brand"
                    />
                    Remember me for 30 days
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      toast.info("Password reset", {
                        description:
                          "Enable Lovable Cloud to send real reset emails.",
                      })
                    }
                    className="font-semibold text-brand hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-brand-foreground transition-transform hover:-translate-y-px disabled:opacity-60"
              >
                {loading ? "Signing you in…" : "Log in"}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>

            <p className="mt-6 text-center text-[11px] text-muted-foreground">
              Protected by industry-standard encryption. By continuing you agree to our{" "}
              <Link to="/" className="underline hover:text-foreground">
                Terms
              </Link>{" "}
              &{" "}
              <Link to="/" className="underline hover:text-foreground">
                Privacy
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
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
}: {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  icon: React.ComponentType<{ className?: string }>;
  error?: string;
  rightSlot?: React.ReactNode;
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
          autoComplete={
            name === "password" ? "current-password" : name === "email" ? "email" : "on"
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
        toast.info(`${label} sign-in`, {
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
