import { Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/edufinder/site-header";
import { SiteFooter } from "@/components/edufinder/site-footer";

export function ComingSoon({
  title,
  eyebrow,
  blurb,
}: {
  title: string;
  eyebrow: string;
  blurb: string;
}) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container-page py-28 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/70">
          <Sparkles className="size-3 text-gold" />
          {eyebrow}
        </span>
        <h1 className="font-display mx-auto mt-6 max-w-3xl text-5xl tracking-tight md:text-7xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">{blurb}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-brand-foreground"
          >
            <ArrowLeft className="size-4" /> Back to home
          </Link>
          <Link
            to="/colleges"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-bold"
          >
            Browse colleges
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
