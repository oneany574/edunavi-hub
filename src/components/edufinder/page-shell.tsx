import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

type Props = {
  eyebrow: string;
  title: string;
  lede?: string;
  children: ReactNode;
};

export function PageShell({ eyebrow, title, lede, children }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-brand via-brand to-[color-mix(in_oklab,var(--brand)_75%,black)] text-brand-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.12),transparent_55%)]" />
        <div className="absolute -right-10 top-10 size-72 rounded-full bg-gold/20 blur-3xl" />
        <div className="container-page relative py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-foreground/70 hover:text-brand-foreground"
          >
            <ArrowLeft className="size-3" /> Back home
          </Link>
          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.28em] text-gold">
            {eyebrow}
          </p>
          <h1 className="font-display mt-3 max-w-3xl text-4xl leading-[1.05] tracking-tight md:text-6xl">
            {title}
          </h1>
          {lede && (
            <p className="mt-6 max-w-2xl text-lg text-brand-foreground/80">{lede}</p>
          )}
        </div>
      </section>
      <main className="container-page py-16">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function ProseCard({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 rounded-3xl border border-border bg-card p-8 text-[15px] leading-relaxed text-foreground/85">
      {children}
    </div>
  );
}
