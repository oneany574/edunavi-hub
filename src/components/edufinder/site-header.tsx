import { Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ChevronDown,
  GraduationCap,
  Menu,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { streams } from "@/lib/edufinder-data";

const navItems = [
  { label: "Colleges", to: "/colleges", hasMega: true },
  { label: "Courses", to: "/courses", hasMega: false },
  { label: "Exams", to: "/exams", hasMega: false },
  { label: "Compare", to: "/compare", hasMega: false },
  { label: "Predictor", to: "/college-predictor", hasMega: false },
  { label: "Articles", to: "/articles", hasMega: false },
] as const;

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      {/* Announcement */}
      <div className="bg-brand text-brand-foreground">
        <div className="container-page flex items-center justify-between py-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
          <span className="hidden items-center gap-2 sm:flex">
            <Sparkles className="size-3.5 text-gold" />
            Admissions 2027 are open — track 120+ exams in one place
          </span>
          <span className="sm:hidden">Admissions 2027 open</span>
          <Link to="/college-predictor" className="hover:text-gold transition-colors">
            Try the predictor →
          </Link>
        </div>
      </div>

      <div className="container-page flex h-18 items-center justify-between py-4">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-2 text-foreground">
            <div className="grid size-9 place-items-center rounded-xl bg-brand text-brand-foreground">
              <GraduationCap className="size-5" />
            </div>
            <span className="font-display text-2xl font-semibold tracking-tight">
              EduFinder
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={() => item.hasMega && setMegaOpen(true)}
                onMouseLeave={() => item.hasMega && setMegaOpen(false)}
              >
                <Link
                  to={item.to}
                  className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                  activeProps={{ className: "text-foreground bg-secondary" }}
                >
                  {item.label}
                  {item.hasMega && <ChevronDown className="size-3.5 opacity-60" />}
                </Link>

                {item.hasMega && megaOpen && (
                  <div className="absolute left-1/2 top-full z-50 w-[640px] -translate-x-1/2 pt-3">
                    <div className="ef-fade-up rounded-3xl border border-border bg-card p-6 shadow-2xl shadow-brand/10">
                      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                        Browse by stream
                      </p>
                      <div className="grid grid-cols-2 gap-1">
                        {streams.slice(0, 8).map((s) => (
                          <Link
                            key={s.slug}
                            to="/colleges"
                            search={{ stream: s.slug }}
                            className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-secondary"
                          >
                            <div className="mt-0.5 size-2 rounded-full bg-academic group-hover:bg-gold" />
                            <div className="min-w-0">
                              <p className="text-sm font-semibold text-foreground">
                                {s.name}
                              </p>
                              <p className="truncate text-xs text-muted-foreground">
                                {s.blurb}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-5 flex items-center justify-between rounded-2xl bg-brand p-4 text-brand-foreground">
                        <div>
                          <p className="text-sm font-semibold">All 4,280 institutions</p>
                          <p className="text-xs text-brand-foreground/70">
                            Filter by fees, ranking, exams, country
                          </p>
                        </div>
                        <Link
                          to="/colleges"
                          className="rounded-full bg-gold px-4 py-2 text-xs font-bold text-brand"
                        >
                          Browse all
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Search"
            className="hidden md:grid size-10 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Search className="size-4" />
          </button>
          <button className="hidden md:inline-flex items-center text-sm font-medium text-foreground/80 px-3 py-2 hover:text-foreground">
            Log in
          </button>
          <button className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-transform hover:-translate-y-px hover:bg-brand/90">
            Join free
          </button>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden grid size-10 place-items-center rounded-full text-foreground/70 hover:bg-secondary"
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-page flex flex-col py-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-foreground/80 hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
