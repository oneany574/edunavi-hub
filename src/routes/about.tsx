import { createFileRoute } from "@tanstack/react-router";
import { Compass, Heart, Lightbulb, Users } from "lucide-react";
import { PageShell } from "@/components/edufinder/page-shell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About EduFinder — Our mission" },
      {
        name: "description",
        content: "EduFinder helps students and parents make honest, data-backed decisions about education across 38 countries.",
      },
      { property: "og:title", content: "About EduFinder" },
      { property: "og:description", content: "Honest, data-backed education discovery." },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: Heart,
    title: "Student-first",
    body: "Every ranking, review and predictor exists to help a real student make a better call — not to serve an advertiser.",
  },
  {
    icon: Compass,
    title: "Radically transparent",
    body: "Fees, placement data and reviews are shown as-is. If we don't have it, we say so.",
  },
  {
    icon: Lightbulb,
    title: "Data over hype",
    body: "We fuse 5-year placement trends, verified student voices and admissions signals into decisions you can defend.",
  },
  {
    icon: Users,
    title: "Global by design",
    body: "4,000+ institutions across 38 countries — one platform, one bar for quality.",
  },
];

function AboutPage() {
  return (
    <PageShell
      eyebrow="About us"
      title="Education decisions deserve better than a glossy brochure."
      lede="EduFinder is an independent platform helping ambitious students discover, compare and get into the right college — anywhere in the world."
    >
      <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
            Our story
          </p>
          <h2 className="font-display mt-3 text-3xl tracking-tight">
            Built by students, for students.
          </h2>
          <p className="mt-4 text-foreground/75">
            We started EduFinder because picking a college is one of the biggest
            decisions a family makes — and the internet was full of paid rankings,
            outdated fees, and reviews with no receipts. So we rebuilt discovery
            from scratch: independent, opinionated, and grounded in data.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-3xl border border-border bg-card p-6"
            >
              <div className="grid size-10 place-items-center rounded-2xl bg-gold-soft text-gold">
                <v.icon className="size-5" />
              </div>
              <p className="font-display mt-4 text-xl">{v.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 grid gap-3 sm:grid-cols-4">
        {[
          { k: "4,280", v: "Institutions tracked" },
          { k: "38", v: "Countries covered" },
          { k: "120+", v: "Entrance exams" },
          { k: "1.2M", v: "Students helped" },
        ].map((s) => (
          <div
            key={s.v}
            className="rounded-2xl border border-border bg-card p-6 text-center"
          >
            <p className="font-display text-4xl tracking-tight text-academic">{s.k}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
              {s.v}
            </p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
