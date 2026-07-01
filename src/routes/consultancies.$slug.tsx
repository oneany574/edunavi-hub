import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BadgeCheck, Building2, CheckCircle2, Globe, Mail, MapPin, Phone, Star, Users } from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";
import { getConsultancy, type Consultancy } from "@/lib/edufinder-more";

export const Route = createFileRoute("/consultancies/$slug")({
  loader: ({ params }) => {
    const c = getConsultancy(params.slug);
    if (!c) throw notFound();
    return c;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Consultancy"} — Reviews, services & fees | EduFinder` },
      { name: "description", content: loaderData?.about ?? "Verified consultancy profile on EduFinder." },
      { property: "og:title", content: `${loaderData?.name ?? "Consultancy"} — EduFinder` },
      { property: "og:description", content: loaderData?.tagline ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="container-page py-24 text-center">
        <h1 className="font-display text-4xl">Consultancy not found</h1>
        <Link to="/consultancies" className="mt-4 inline-block text-brand underline">Browse consultancies</Link>
      </div>
    </div>
  ),
  component: ConsultancyDetail,
});

function ConsultancyDetail() {
  const c = Route.useLoaderData() as Consultancy;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className={`bg-gradient-to-br ${c.heroAccent} text-white`}>
        <div className="container-page py-14">
          <Link to="/consultancies" className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white">
            <ArrowLeft className="size-4" /> All consultancies
          </Link>
          <div className="mt-6 flex flex-wrap items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-4xl md:text-5xl leading-tight tracking-tight">{c.name}</h1>
                {c.verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold text-brand">
                    <BadgeCheck className="size-3" /> Verified
                  </span>
                )}
              </div>
              <p className="mt-2 max-w-xl text-white/85">{c.tagline}</p>
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-white/80">
                <MapPin className="size-4" /> {c.city}, {c.country} · est. {c.founded}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href={`mailto:${c.contact.email}`} className="rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-brand">
                Book free counselling
              </a>
              {!c.claimed && (
                <Link
                  to="/claim-consultancy"
                  search={{ consultancy: c.slug }}
                  className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-bold backdrop-blur hover:bg-white/10"
                >
                  Claim this listing
                </Link>
              )}
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            <HStat icon={<Star className="size-4 fill-gold text-gold" />} label="Rating" value={`${c.rating} / 5 · ${c.reviews} reviews`} />
            <HStat icon={<Users className="size-4" />} label="Students placed" value={c.studentsPlaced.toLocaleString()} />
            <HStat icon={<Globe className="size-4" />} label="Success rate" value={`${c.successRate}%`} />
            <HStat icon={<Building2 className="size-4" />} label="Fees" value={c.fees} />
          </div>
        </div>
      </section>

      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_360px]">
        <div className="space-y-10">
          <section>
            <p className="font-display text-3xl">About</p>
            <p className="mt-3 text-muted-foreground">{c.about}</p>
          </section>

          <section>
            <p className="font-display text-3xl">Services</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {c.services.map((s) => (
                <div key={s} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                  <p className="text-sm font-medium">{s}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="font-display text-3xl">How they work</p>
            <ol className="mt-5 space-y-4">
              {c.process.map((p, i) => (
                <li key={p.step} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
                  <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold-soft font-mono-tight text-sm font-bold text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <p className="font-semibold">{p.step}</p>
                    <p className="text-sm text-muted-foreground">{p.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <p className="font-display text-3xl">Team</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {c.team.map((m) => (
                <div key={m.name} className="rounded-2xl border border-border bg-card p-5 text-center">
                  <div className="mx-auto grid size-14 place-items-center rounded-full bg-brand font-display text-lg text-brand-foreground">
                    {m.initials}
                  </div>
                  <p className="mt-3 font-semibold">{m.name}</p>
                  <p className="text-xs text-muted-foreground">{m.role}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <p className="font-display text-3xl">Student stories</p>
            <div className="mt-4 space-y-3">
              {c.testimonials.map((t) => (
                <div key={t.name} className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-sm italic text-foreground/90">“{t.quote}”</p>
                  <p className="mt-3 text-xs font-semibold text-muted-foreground">— {t.name}, {t.university}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-foreground/70">Contact</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2"><Mail className="size-4 text-academic" /> {c.contact.email}</li>
              <li className="flex items-center gap-2"><Phone className="size-4 text-academic" /> {c.contact.phone}</li>
              <li className="flex items-center gap-2"><Globe className="size-4 text-academic" /> {c.contact.website}</li>
            </ul>
            <p className="mt-5 text-[10px] font-bold uppercase tracking-widest text-foreground/60">Destinations</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {c.destinations.map((d) => <span key={d} className="rounded-full bg-secondary px-2.5 py-1 text-xs">{d}</span>)}
            </div>
            <p className="mt-5 text-[10px] font-bold uppercase tracking-widest text-foreground/60">Languages</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {c.languages.map((l) => <span key={l} className="rounded-full bg-secondary px-2.5 py-1 text-xs">{l}</span>)}
            </div>
          </div>

          <Link
            to="/counseling"
            className="flex items-center justify-between rounded-3xl bg-gradient-to-br from-brand to-academic p-6 text-white"
          >
            <div>
              <p className="font-display text-xl">Talk to a counsellor</p>
              <p className="mt-1 text-xs text-white/80">Free 30-minute discovery call</p>
            </div>
            <ArrowRight className="size-5" />
          </Link>
        </aside>
      </div>

      <SiteFooter />
    </div>
  );
}

function HStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
      <div className="flex items-center gap-1.5 text-white/80">{icon}<span className="text-[10px] font-bold uppercase tracking-widest">{label}</span></div>
      <p className="mt-1 text-sm font-bold">{value}</p>
    </div>
  );
}
