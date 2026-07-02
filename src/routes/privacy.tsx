import { createFileRoute } from "@tanstack/react-router";
import { PageShell, ProseCard } from "@/components/edufinder/page-shell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy policy — EduFinder" },
      {
        name: "description",
        content: "How EduFinder collects, uses and protects your personal data.",
      },
      { property: "og:title", content: "Privacy policy — EduFinder" },
      { property: "og:description", content: "How we collect, use and protect your data." },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    heading: "What we collect",
    body: "Account information you provide (name, email, education background), usage signals (pages viewed, searches, comparisons), and technical data (device, browser, approximate location). We do not sell personal data.",
  },
  {
    heading: "How we use it",
    body: "To personalise college and course recommendations, power the predictor, deliver product updates you opted into, and improve reliability. We use aggregated data to publish anonymised trends.",
  },
  {
    heading: "Who we share with",
    body: "Only with vetted processors (hosting, analytics, email) under strict data-processing agreements. We share your profile with an institution only when you explicitly submit an application to them.",
  },
  {
    heading: "Your rights",
    body: "You can access, correct, export or delete your data at any time from Settings → Privacy. EU/UK users have full GDPR rights; California residents have CCPA rights.",
  },
  {
    heading: "Cookies",
    body: "We use first-party cookies for authentication and preferences, plus limited third-party analytics. You can manage categories via the cookie banner.",
  },
  {
    heading: "Data retention",
    body: "We keep account data until you delete it, and product logs for up to 24 months. Backups are purged on a 90-day rolling window.",
  },
  {
    heading: "Contact",
    body: "Questions? Email privacy@edufinder.com. Our DPO responds within 72 hours.",
  },
];

function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Privacy"
      title="Your data, explained in plain English."
      lede="Last updated June 12, 2026. This policy describes what we collect, why, and what you control."
    >
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="hidden lg:block">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
            On this page
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {sections.map((s) => (
              <li key={s.heading}>
                <a
                  href={`#${slug(s.heading)}`}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {s.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ProseCard>
          {sections.map((s) => (
            <section key={s.heading} id={slug(s.heading)} className="scroll-mt-28">
              <h2 className="font-display text-2xl tracking-tight text-foreground">
                {s.heading}
              </h2>
              <p className="mt-3">{s.body}</p>
            </section>
          ))}
        </ProseCard>
      </div>
    </PageShell>
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
