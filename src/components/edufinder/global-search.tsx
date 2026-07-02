import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  BookOpen,
  Compass,
  FileText,
  GraduationCap,
  Newspaper,
  Search,
  Sparkles,
  Trophy,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { colleges, courses, exams, articles, popularSearches } from "@/lib/edufinder-data";
import { scholarships, newsItems, destinations } from "@/lib/edufinder-extras";

const GLOBAL_SEARCH_EVENT = "efn:open-search";

export function openGlobalSearch() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(GLOBAL_SEARCH_EVENT));
  }
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener(GLOBAL_SEARCH_EVENT, onOpen);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener(GLOBAL_SEARCH_EVENT, onOpen);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const groups = useMemo(
    () => [
      {
        heading: "Colleges",
        icon: Building2,
        items: colleges.slice(0, 40).map((c) => ({
          id: `c-${c.slug}`,
          label: c.name,
          hint: `${c.city}, ${c.country}`,
          keywords: [c.shortName, c.city, c.country, ...c.streams],
          go: () => navigate({ to: "/colleges/$slug", params: { slug: c.slug } }),
        })),
      },
      {
        heading: "Courses",
        icon: BookOpen,
        items: courses.slice(0, 30).map((c) => ({
          id: `co-${c.slug}`,
          label: c.name,
          hint: `${c.level} • ${c.stream}`,
          keywords: [c.shortName, c.stream, c.level],
          go: () => navigate({ to: "/courses/$slug", params: { slug: c.slug } }),
        })),
      },
      {
        heading: "Exams",
        icon: GraduationCap,
        items: exams.slice(0, 20).map((e) => ({
          id: `e-${e.slug}`,
          label: e.name,
          hint: e.conductingBody,
          keywords: [e.slug],
          go: () => navigate({ to: "/exams/$slug", params: { slug: e.slug } }),
        })),
      },
      {
        heading: "Scholarships",
        icon: Trophy,
        items: scholarships.slice(0, 20).map((s) => ({
          id: `s-${s.slug}`,
          label: s.name,
          hint: s.provider,
          keywords: [s.region, s.type],
          go: () => navigate({ to: "/scholarships/$slug", params: { slug: s.slug } }),
        })),
      },
      {
        heading: "Study Abroad",
        icon: Compass,
        items: destinations.slice(0, 20).map((d) => ({
          id: `d-${d.slug}`,
          label: d.country,
          hint: "Study abroad destination",
          keywords: [d.region],
          go: () => navigate({ to: "/study-abroad/$slug", params: { slug: d.slug } }),
        })),
      },
      {
        heading: "News",
        icon: Newspaper,
        items: newsItems.slice(0, 20).map((n) => ({
          id: `n-${n.slug}`,
          label: n.title,
          hint: n.category,
          keywords: [n.source],
          go: () => navigate({ to: "/news/$slug", params: { slug: n.slug } }),
        })),
      },
      {
        heading: "Articles",
        icon: FileText,
        items: articles.slice(0, 20).map((a) => ({
          id: `a-${a.slug}`,
          label: a.title,
          hint: a.category,
          keywords: [a.author],
          go: () => navigate({ to: "/articles/$slug", params: { slug: a.slug } }),
        })),
      },
    ],
    [navigate],
  );

  const quickLinks: Array<{ label: string; to: any; params?: any }> = [
    { label: "Compare colleges", to: "/compare" },
    { label: "College predictor", to: "/college-predictor" },
    { label: "Mock tests", to: "/mock-tests" },
    { label: "Consultancies", to: "/consultancies" },
    { label: "Exam prep", to: "/exam-prep" },
    { label: "Q&A", to: "/questions" },
  ];

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div className="border-b border-border bg-gradient-to-r from-brand/[0.02] via-transparent to-gold/[0.03]">
        <CommandInput
          placeholder="Search colleges, courses, exams, scholarships, news…"
          className="text-base"
        />
      </div>
      <CommandList className="max-h-[70vh]">
        <CommandEmpty>
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <div className="grid size-12 place-items-center rounded-2xl bg-gold-soft text-gold">
              <Search className="size-5" />
            </div>
            <p className="text-sm font-semibold text-foreground">Nothing matched</p>
            <p className="text-xs text-muted-foreground">
              Try a college name, exam, or country.
            </p>
          </div>
        </CommandEmpty>

        <CommandGroup heading="Trending">
          {popularSearches.slice(0, 6).map((q) => (
            <CommandItem
              key={q}
              value={`trend ${q}`}
              onSelect={() => {
                setOpen(false);
                navigate({ to: "/colleges" });
              }}
              className="gap-3"
            >
              <Sparkles className="size-4 text-gold" />
              <span className="text-sm">{q}</span>
              <ArrowRight className="ml-auto size-3.5 text-muted-foreground" />
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Jump to">
          {quickLinks.map((q) => (
            <CommandItem
              key={q.label}
              value={`nav ${q.label}`}
              onSelect={() => {
                setOpen(false);
                navigate({ to: q.to });
              }}
              className="gap-3"
            >
              <Compass className="size-4 text-academic" />
              <span className="text-sm font-medium">{q.label}</span>
              <ArrowRight className="ml-auto size-3.5 text-muted-foreground" />
            </CommandItem>
          ))}
        </CommandGroup>

        {groups.map((g) => (
          <div key={g.heading}>
            <CommandSeparator />
            <CommandGroup heading={g.heading}>
              {g.items.map((it) => (
                <CommandItem
                  key={it.id}
                  value={`${g.heading} ${it.label} ${it.keywords.join(" ")}`}
                  onSelect={() => {
                    setOpen(false);
                    it.go();
                  }}
                  className="gap-3"
                >
                  <g.icon className="size-4 text-academic" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {it.label}
                    </p>
                    <p className="truncate text-[11px] text-muted-foreground">
                      {it.hint}
                    </p>
                  </div>
                  <ArrowRight className="size-3.5 text-muted-foreground" />
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        ))}
      </CommandList>

      <div className="flex items-center justify-between gap-2 border-t border-border bg-surface px-4 py-2.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        <span className="flex items-center gap-2">
          <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono-tight">
            ↑↓
          </kbd>
          navigate
          <kbd className="ml-2 rounded border border-border bg-background px-1.5 py-0.5 font-mono-tight">
            ↵
          </kbd>
          open
        </span>
        <span className="hidden sm:flex items-center gap-1">
          <kbd className="rounded border border-border bg-background px-1.5 py-0.5 font-mono-tight">
            esc
          </kbd>
          close
        </span>
      </div>
    </CommandDialog>
  );
}
