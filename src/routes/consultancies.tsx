import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, Building2, Filter, Globe, MapPin, Star, Users } from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { consultancies } from "@/lib/edufinder-more";

export const Route = createFileRoute("/consultancies")({
  head: () => ({
    meta: [
      { title: "Study Abroad Consultancies — Verified counsellors | EduFinder" },
      { name: "description", content: "Browse verified study abroad consultancies. Compare services, destinations, fees and reviews before booking a free counselling call." },
      { property: "og:title", content: "Study Abroad Consultancies — EduFinder" },
      { property: "og:description", content: "Verified consultancies for USA, UK, Canada, Australia, Europe and more." },
    ],
  }),
  component: ConsultanciesPage,
});

const destinations = ["All", "USA", "UK", "Canada", "Australia", "Germany", "France"] as const;

function ConsultanciesPage() {
  const [dest, setDest] = useState<(typeof destinations)[number]>("All");
  const [q, setQ] = useState("");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const list = useMemo(() => {
    return consultancies.filter((c) => {
      if (verifiedOnly && !c.verified) return false;
      if (dest !== "All" && !c.destinations.includes(dest)) return false;
      if (q && !`${c.name} ${c.city} ${c.tagline}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [dest, q, verifiedOnly]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="bg-gradient-to-br from-brand via-academic to-brand text-white">
        <div className="container-page py-16">
          <span className="font-mono-tight rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] backdrop-blur">
            {consultancies.length}+ verified consultancies
          </span>
          <h1 className="font-display mt-5 max-w-3xl text-4xl leading-[1.05] tracking-tight md:text-6xl">
            Find the right study-abroad partner.
          </h1>
          <p className="mt-4 max-w-2xl text-white/85">
            Compare consultancies by destination, services, success rate and real student reviews. Book a free discovery call in minutes.
          </p>
        </div>
      </section>

      <div className="container-page py-10">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or city…"
            className="w-full rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-academic/40 md:max-w-sm"
          />
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter className="size-4 shrink-0 text-muted-foreground" />
            {destinations.map((d) => (
              <button
                key={d}
                onClick={() => setDest(d)}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest ${
                  dest === d ? "bg-brand text-brand-foreground" : "bg-secondary text-foreground/70"
                }`}
              >
                {d}
              </button>
            ))}
            <label className="ml-2 inline-flex cursor-pointer items-center gap-2 text-xs">
              <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} className="accent-academic" />
              Verified only
            </label>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {list.map((c) => (
            <Link
              key={c.slug}
              to="/consultancies/$slug"
              params={{ slug: c.slug }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/10"
            >
              <div className={`bg-gradient-to-br ${c.heroAccent} p-6 text-white`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-2xl">{c.name}</p>
                    <p className="mt-1 text-sm text-white/80">{c.tagline}</p>
                  </div>
                  {c.verified && (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold text-brand">
                      <BadgeCheck className="size-3" /> Verified
                    </span>
                  )}
                </div>
                <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-white/80">
                  <MapPin className="size-3.5" /> {c.city}, {c.country} · est. {c.founded}
                </p>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <Stat icon={<Star className="size-3.5 fill-gold text-gold" />} label="Rating" value={`${c.rating} · ${c.reviews}`} />
                  <Stat icon={<Users className="size-3.5 text-academic" />} label="Placed" value={c.studentsPlaced.toLocaleString()} />
                  <Stat icon={<Globe className="size-3.5 text-academic" />} label="Success" value={`${c.successRate}%`} />
                </div>
                <div className="mt-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/60">Destinations</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {c.destinations.map((d) => (
                      <span key={d} className="rounded-full bg-secondary px-2.5 py-1 text-xs">{d}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xs font-semibold text-muted-foreground">{c.fees}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-brand group-hover:gap-2 transition-all">
                    View profile <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand to-academic p-8 text-white md:p-10">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xl">
              <Building2 className="size-8 text-gold" />
              <p className="font-display mt-3 text-3xl">Run a consultancy?</p>
              <p className="mt-2 text-sm text-white/85">
                Claim your listing to update services, respond to reviews and access lead analytics — free forever.
              </p>
            </div>
            <Link
              to="/claim-consultancy"
              className="rounded-full bg-gold px-6 py-3 text-sm font-bold text-brand hover:-translate-y-px transition-transform"
            >
              Claim your consultancy
            </Link>
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-xl bg-secondary p-3">
      <div className="flex items-center gap-1.5">{icon}<span className="text-[10px] font-bold uppercase tracking-widest text-foreground/60">{label}</span></div>
      <p className="mt-1 text-sm font-bold">{value}</p>
    </div>
  );
}
