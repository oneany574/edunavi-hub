import { Link } from "@tanstack/react-router";
import { GraduationCap, Instagram, Linkedin, Twitter } from "lucide-react";

const columns = [
  {
    title: "Discover",
    links: [
      { label: "Colleges", to: "/colleges" },
      { label: "Courses", to: "/courses" },
      { label: "Exams", to: "/exams" },
      { label: "Scholarships", to: "/scholarships" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Compare colleges", to: "/compare" },
      { label: "College predictor", to: "/college-predictor" },
      { label: "Student reviews", to: "/reviews" },
      { label: "Q&A", to: "/questions" },
    ],
  },
  {
    title: "For institutions",
    links: [
      { label: "Claim your college", to: "/dashboard/college" },
      { label: "Admissions partners", to: "/" },
      { label: "Advertise", to: "/" },
      { label: "Brand kit", to: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/" },
      { label: "Press", to: "/" },
      { label: "Privacy", to: "/" },
      { label: "Terms", to: "/" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-brand text-brand-foreground">
      <div className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_3fr]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-xl bg-gold text-brand">
                <GraduationCap className="size-5" />
              </div>
              <span className="font-display text-2xl font-semibold tracking-tight">
                EduFinder
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-brand-foreground/60">
              Honest, data-backed discovery for students and parents — across
              4,000+ institutions in 38 countries. Built for the decisions that
              shape a life.
            </p>
            <div className="mt-8 flex gap-3">
              {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social link"
                  className="grid size-10 place-items-center rounded-full border border-white/10 text-brand-foreground/80 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                  {col.title}
                </p>
                <ul className="space-y-3 text-sm text-brand-foreground/75">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="transition-colors hover:text-brand-foreground">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-brand-foreground/50">
            © 2026 EduFinder. Independent. Student-first.
          </p>
          <p className="font-mono-tight text-[11px] uppercase tracking-[0.2em] text-brand-foreground/40">
            v1.0 — built for the ambitious
          </p>
        </div>
      </div>
    </footer>
  );
}
