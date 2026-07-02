import { createFileRoute } from "@tanstack/react-router";
import { Linkedin, Twitter } from "lucide-react";
import { PageShell } from "@/components/edufinder/page-shell";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "The team — EduFinder" },
      {
        name: "description",
        content: "Meet the people building EduFinder — engineers, designers, editors and educators from around the world.",
      },
      { property: "og:title", content: "The team — EduFinder" },
      { property: "og:description", content: "Engineers, designers, editors and educators." },
    ],
  }),
  component: TeamPage,
});

const leadership = [
  { name: "Ishaan Mehta", role: "Co-founder & CEO", bio: "Previously PM at Coursera. Wharton MBA." },
  { name: "Priya Nair", role: "Co-founder & CTO", bio: "Ex-Google. Built ranking systems at scale." },
  { name: "Amelia Chen", role: "Head of Editorial", bio: "10+ years covering higher-ed. Ex-The Atlantic." },
  { name: "Marco Silva", role: "Head of Design", bio: "Led design at Duolingo and Notion." },
  { name: "Sara Khan", role: "VP, Partnerships", bio: "Former Dean of Admissions, INSEAD." },
  { name: "Tom Wallace", role: "Head of Data", bio: "PhD in Econ. Ex-World Bank education data." },
];

function TeamPage() {
  return (
    <PageShell
      eyebrow="Team"
      title="Small team, big surface area."
      lede="We hire senior operators who care about students. Everyone here has shipped, published, or taught."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {leadership.map((p) => (
          <article
            key={p.name}
            className="rounded-3xl border border-border bg-card p-6"
          >
            <div className="flex items-center gap-4">
              <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-academic to-brand text-lg font-bold text-white">
                {p.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <p className="font-display text-xl leading-tight">{p.name}</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-academic">
                  {p.role}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{p.bio}</p>
            <div className="mt-4 flex gap-2">
              <a
                href="#"
                aria-label="LinkedIn"
                className="grid size-8 place-items-center rounded-full border border-border text-muted-foreground hover:border-academic hover:text-academic"
              >
                <Linkedin className="size-3.5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="grid size-8 place-items-center rounded-full border border-border text-muted-foreground hover:border-academic hover:text-academic"
              >
                <Twitter className="size-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16 rounded-3xl bg-brand p-10 text-brand-foreground">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
          Behind the scenes
        </p>
        <p className="font-display mt-3 max-w-2xl text-3xl tracking-tight">
          52 people. 14 countries. One rule: make the student's decision easier.
        </p>
      </div>
    </PageShell>
  );
}
