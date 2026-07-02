import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { PageShell } from "@/components/edufinder/page-shell";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers at EduFinder — Join our team" },
      {
        name: "description",
        content: "Help us reshape how students discover colleges. Open roles across engineering, design, editorial and partnerships.",
      },
      { property: "og:title", content: "Careers at EduFinder" },
      { property: "og:description", content: "Join us in reshaping education discovery." },
    ],
  }),
  component: CareersPage,
});

const roles = [
  { team: "Engineering", title: "Senior Full-Stack Engineer", loc: "Remote / Bengaluru", type: "Full-time" },
  { team: "Design", title: "Product Designer, Discovery", loc: "Remote", type: "Full-time" },
  { team: "Editorial", title: "Editor — Study Abroad", loc: "London", type: "Full-time" },
  { team: "Partnerships", title: "Institutional Partnerships Lead", loc: "Remote / NY", type: "Full-time" },
  { team: "Data", title: "Data Analyst — Rankings", loc: "Remote", type: "Contract" },
  { team: "Marketing", title: "Content Marketing Manager", loc: "Bengaluru", type: "Full-time" },
];

const perks = [
  "Fully remote-friendly with quarterly meetups",
  "Equity from day one",
  "Learning stipend $2k / year",
  "Health cover for you + dependents",
  "4-day workweeks in July & December",
  "Home office setup budget",
];

function CareersPage() {
  return (
    <PageShell
      eyebrow="Careers"
      title="Do the best work of your career, on a mission that compounds."
      lede="We're a small, senior team building the discovery layer for global education. If you care about students and craft, we should talk."
    >
      <div className="grid gap-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
          Open roles
        </p>
        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          {roles.map((r) => (
            <div
              key={r.title}
              className="group grid grid-cols-[1fr_auto] items-center gap-4 border-b border-border px-6 py-5 last:border-0 sm:grid-cols-[140px_1fr_auto_auto]"
            >
              <span className="col-span-2 text-[10px] font-bold uppercase tracking-widest text-academic sm:col-span-1">
                {r.team}
              </span>
              <p className="font-display text-lg text-foreground">{r.title}</p>
              <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
                <MapPin className="size-3" /> {r.loc}
              </span>
              <button className="flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-xs font-bold text-foreground transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                {r.type} <ArrowRight className="size-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
          Life at EduFinder
        </p>
        <h2 className="font-display mt-3 text-3xl tracking-tight">The perks</h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((p) => (
            <div
              key={p}
              className="rounded-2xl border border-border bg-card px-5 py-4 text-sm font-medium text-foreground/85"
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
