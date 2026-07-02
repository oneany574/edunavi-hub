import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Building2,
  ChevronRight,
  Compass,
  FileText,
  GraduationCap,
  LogIn,
  Menu,
  Search,
  Sparkles,
  UserPlus,
  X,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { openGlobalSearch } from "./global-search";
import { streams } from "@/lib/edufinder-data";

type Section = {
  label: string;
  icon: any;
  items: { label: string; to: any; hint?: string }[];
};

const sections: Section[] = [
  {
    label: "Discover",
    icon: Building2,
    items: [
      { label: "Colleges", to: "/colleges", hint: "4,280 institutions" },
      { label: "Courses", to: "/courses", hint: "Bachelor's, Master's, PhD" },
      { label: "Exams", to: "/exams", hint: "120+ entrance tests" },
      { label: "Scholarships", to: "/scholarships" },
    ],
  },
  {
    label: "Prepare",
    icon: GraduationCap,
    items: [
      { label: "Mock tests", to: "/mock-tests" },
      { label: "Exam prep", to: "/exam-prep" },
      { label: "College predictor", to: "/college-predictor" },
      { label: "Compare colleges", to: "/compare" },
    ],
  },
  {
    label: "Global",
    icon: Compass,
    items: [
      { label: "Study abroad", to: "/study-abroad" },
      { label: "Consultancies", to: "/consultancies" },
      { label: "News & updates", to: "/news" },
      { label: "Student Q&A", to: "/questions" },
    ],
  },
  {
    label: "Insights",
    icon: FileText,
    items: [
      { label: "Articles", to: "/articles" },
      { label: "Reviews", to: "/reviews" },
      { label: "Counseling", to: "/counseling" },
    ],
  },
];

export function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (open) setActiveIdx(0);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="lg:hidden grid size-10 place-items-center rounded-full text-foreground/70 hover:bg-secondary"
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full max-w-sm border-l-0 p-0 sm:max-w-sm"
      >
        <div className="flex h-full flex-col bg-background">
          {/* Header */}
          <div className="relative overflow-hidden bg-brand px-6 pb-8 pt-6 text-brand-foreground">
            <div className="absolute -right-10 -top-10 size-40 rounded-full bg-gold/25 blur-3xl" />
            <div className="relative flex items-center justify-between">
              <Link to="/" onClick={close} className="flex items-center gap-2">
                <div className="grid size-9 place-items-center rounded-xl bg-gold text-brand">
                  <GraduationCap className="size-5" />
                </div>
                <span className="font-display text-xl font-semibold tracking-tight">
                  EduFinder
                </span>
              </Link>
              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="grid size-9 place-items-center rounded-full bg-white/10 text-brand-foreground/90"
              >
                <X className="size-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                close();
                setTimeout(openGlobalSearch, 150);
              }}
              className="mt-6 flex w-full items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-left text-sm text-brand-foreground/80 backdrop-blur transition-colors hover:bg-white/15"
            >
              <Search className="size-4" />
              <span className="flex-1">Search anything…</span>
              <span className="rounded-md border border-white/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                ⌘K
              </span>
            </button>

            <div className="relative mt-6 grid grid-cols-2 gap-2">
              <Link
                to="/login"
                onClick={close}
                className="flex items-center justify-center gap-1.5 rounded-full border border-white/20 py-2.5 text-xs font-bold"
              >
                <LogIn className="size-3.5" /> Log in
              </Link>
              <Link
                to="/join"
                onClick={close}
                className="flex items-center justify-center gap-1.5 rounded-full bg-gold py-2.5 text-xs font-bold text-brand"
              >
                <UserPlus className="size-3.5" /> Join free
              </Link>
            </div>
          </div>

          {/* Section tabs */}
          <div className="flex gap-1.5 overflow-x-auto border-b border-border px-4 py-3">
            {sections.map((s, i) => {
              const active = i === activeIdx;
              return (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                    active
                      ? "bg-brand text-brand-foreground"
                      : "bg-secondary text-foreground/70"
                  }`}
                >
                  <s.icon className="size-3.5" />
                  {s.label}
                </button>
              );
            })}
          </div>

          {/* Section content */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div key={activeIdx} className="ef-fade-up space-y-1.5">
              {sections[activeIdx].items.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={close}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 transition-colors hover:border-academic/40 hover:bg-secondary/60"
                >
                  <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-gold-soft text-gold">
                    <ChevronRight className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground">
                      {item.label}
                    </p>
                    {item.hint && (
                      <p className="truncate text-[11px] text-muted-foreground">
                        {item.hint}
                      </p>
                    )}
                  </div>
                  <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>

            {activeIdx === 0 && (
              <div className="mt-6">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                  Popular streams
                </p>
                <div className="flex flex-wrap gap-2">
                  {streams.slice(0, 8).map((s) => (
                    <Link
                      key={s.slug}
                      to="/colleges"
                      onClick={close}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground/80"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="border-t border-border bg-surface px-4 py-4">
            <Link
              to="/college-predictor"
              onClick={close}
              className="flex items-center gap-3 rounded-2xl bg-brand px-4 py-3 text-brand-foreground"
            >
              <div className="grid size-9 place-items-center rounded-xl bg-gold text-brand">
                <Sparkles className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">Try the predictor</p>
                <p className="text-[11px] text-brand-foreground/70">
                  See your real admission chances
                </p>
              </div>
              <ChevronRight className="size-4 text-brand-foreground/60" />
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
