import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, Star, TrendingUp } from "lucide-react";
import { type College, formatFees, formatPackage } from "@/lib/edufinder-data";

export function CollegeCard({ college, index = 0 }: { college: College; index?: number }) {
  return (
    <Link
      to="/colleges/$slug"
      params={{ slug: college.slug }}
      className="group ef-fade-up flex flex-col overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-academic/30 hover:shadow-[0_30px_60px_-30px] hover:shadow-brand/30"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${college.heroAccent}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(0,0,0,0.25),transparent_60%)]" />
        <div className="absolute left-5 top-5 flex items-center gap-2">
          <span className="font-mono-tight rounded-full bg-black/30 backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
            #{college.ranking} {college.rankingLabel}
          </span>
          {college.claimed && (
            <span className="rounded-full bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-brand">
              Claimed
            </span>
          )}
        </div>
        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-white">
          <p className="font-display text-2xl leading-tight">{college.shortName}</p>
          <span className="flex items-center gap-1 rounded-full bg-white/15 backdrop-blur px-2.5 py-1 text-xs font-semibold">
            <Star className="size-3 fill-gold text-gold" />
            {college.rating}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-bold text-foreground group-hover:text-academic transition-colors">
              {college.name}
            </h3>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              {college.city}, {college.country} • {college.ownership}
            </p>
          </div>
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-academic" />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-4">
          <div>
            <p className="font-mono-tight text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Avg fees
            </p>
            <p className="mt-1 text-sm font-bold text-foreground">{formatFees(college)}</p>
          </div>
          <div>
            <p className="font-mono-tight text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Avg package
            </p>
            <p className="mt-1 flex items-center gap-1 text-sm font-bold text-foreground">
              <TrendingUp className="size-3 text-success" />
              {formatPackage(college)}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {college.examsAccepted.slice(0, 3).map((e) => (
            <span
              key={e}
              className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-foreground/70"
            >
              {e}
            </span>
          ))}
          <span className="rounded-full bg-academic/10 px-2 py-0.5 text-[10px] font-semibold text-academic">
            {college.courseCount} courses
          </span>
        </div>
      </div>
    </Link>
  );
}
