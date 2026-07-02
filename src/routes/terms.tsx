import { createFileRoute } from "@tanstack/react-router";
import { PageShell, ProseCard } from "@/components/edufinder/page-shell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of service — EduFinder" },
      {
        name: "description",
        content: "The rules for using EduFinder — acceptable use, accounts, content and liability.",
      },
      { property: "og:title", content: "Terms of service — EduFinder" },
      { property: "og:description", content: "Rules for using EduFinder." },
    ],
  }),
  component: TermsPage,
});

const sections = [
  {
    heading: "Accepting these terms",
    body: "By creating an account or using EduFinder you agree to these terms and our Privacy Policy. If you're under 16, a parent or guardian must accept on your behalf.",
  },
  {
    heading: "Your account",
    body: "You're responsible for keeping your credentials safe and for any activity under your account. Notify us immediately at security@edufinder.com if you suspect a breach.",
  },
  {
    heading: "Acceptable use",
    body: "Don't scrape, disrupt, reverse-engineer, or misuse the service. Reviews and Q&A must be your own experience — no paid reviews, no impersonation, no hate speech.",
  },
  {
    heading: "Content you post",
    body: "You keep ownership of the reviews, answers and photos you post. You grant us a worldwide, royalty-free licence to display and distribute that content on EduFinder.",
  },
  {
    heading: "Institution data",
    body: "Fees, placements and rankings are best-effort estimates aggregated from public sources and partners. Always verify with the institution before financial decisions.",
  },
  {
    heading: "Payments & subscriptions",
    body: "Some services are paid (advanced mock tests, counseling). Refunds are handled per the tier's terms shown at checkout.",
  },
  {
    heading: "Termination",
    body: "You can delete your account any time. We can suspend accounts that violate these terms, with notice where possible.",
  },
  {
    heading: "Liability",
    body: "EduFinder is provided \"as is\". We're not liable for admissions decisions made by institutions, visa outcomes, or the choice of a program.",
  },
  {
    heading: "Changes",
    body: "We'll notify registered users of material changes at least 30 days before they take effect.",
  },
];

function TermsPage() {
  return (
    <PageShell
      eyebrow="Terms"
      title="The rules of the road."
      lede="Effective June 12, 2026. Short, readable, and written before the lawyers touched it."
    >
      <ProseCard>
        {sections.map((s, i) => (
          <section key={s.heading}>
            <h2 className="font-display text-2xl tracking-tight text-foreground">
              {i + 1}. {s.heading}
            </h2>
            <p className="mt-3">{s.body}</p>
          </section>
        ))}
        <p className="pt-6 text-xs text-muted-foreground">
          Questions? Reach us at legal@edufinder.com.
        </p>
      </ProseCard>
    </PageShell>
  );
}
