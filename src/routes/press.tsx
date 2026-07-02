import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Download } from "lucide-react";
import { PageShell } from "@/components/edufinder/page-shell";

export const Route = createFileRoute("/press")({
  head: () => ({
    meta: [
      { title: "Press & media — EduFinder" },
      {
        name: "description",
        content: "Press releases, media coverage and brand assets for EduFinder.",
      },
      { property: "og:title", content: "Press & media — EduFinder" },
      { property: "og:description", content: "Press releases, coverage and brand assets." },
    ],
  }),
  component: PressPage,
});

const releases = [
  { date: "Jun 12, 2026", title: "EduFinder crosses 4,000 verified institutions across 38 countries" },
  { date: "Apr 03, 2026", title: "Launching the College Predictor with 92% forecast accuracy" },
  { date: "Feb 18, 2026", title: "Series B: $34M to expand study-abroad discovery" },
  { date: "Nov 09, 2025", title: "Free mock tests for IELTS, SAT and PTE — now live" },
];

const coverage = [
  { outlet: "TechCrunch", quote: "Rebuilding college discovery for the internet's second act." },
  { outlet: "Forbes", quote: "The rare edtech that treats students as the customer." },
  { outlet: "The Guardian", quote: "A no-nonsense counterweight to paid rankings." },
];

function PressPage() {
  return (
    <PageShell
      eyebrow="Press"
      title="News, releases, and everything you need to write about us."
      lede="For interviews or embargoed briefings, reach press@edufinder.com."
    >
      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
            Press releases
          </p>
          <div className="mt-4 overflow-hidden rounded-3xl border border-border bg-card">
            {releases.map((r) => (
              <a
                key={r.title}
                href="#"
                className="group flex items-center justify-between gap-6 border-b border-border px-6 py-5 last:border-0 hover:bg-secondary/60"
              >
                <div>
                  <p className="font-mono-tight text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    {r.date}
                  </p>
                  <p className="font-display mt-1 text-lg text-foreground">{r.title}</p>
                </div>
                <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>

          <p className="mt-12 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
            In the media
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {coverage.map((c) => (
              <div
                key={c.outlet}
                className="rounded-3xl border border-border bg-card p-6"
              >
                <p className="font-display text-xl">{c.outlet}</p>
                <p className="mt-3 text-sm text-muted-foreground">"{c.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl bg-brand p-6 text-brand-foreground">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
              Media kit
            </p>
            <p className="font-display mt-2 text-2xl">Brand assets & logos</p>
            <p className="mt-2 text-xs text-brand-foreground/70">
              Logos (SVG/PNG), colour palette, product screenshots, executive bios.
            </p>
            <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-bold text-brand">
              <Download className="size-3.5" /> Download kit
            </button>
          </div>
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="font-display text-lg">Press contact</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Ada Roy, Head of Communications
            </p>
            <p className="mt-1 text-sm font-semibold text-academic">
              press@edufinder.com
            </p>
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
