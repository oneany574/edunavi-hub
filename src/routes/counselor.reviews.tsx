import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/panel/module-page";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/counselor/reviews")({ component: Reviews });

const reviews = [
  { name: "Ananya S.", rating: 5, when: "2d", text: "Sneha helped me shortlist 8 unis for MS CS in under a week. Every recommendation was backed by data — my profile actually fits these programs." },
  { name: "Rohit B.", rating: 5, when: "1w", text: "The SOP review was surgical. Cut 30% of fluff and added the punch every essay needed." },
  { name: "Kabir V.", rating: 5, when: "2w", text: "Best MBA profile evaluation I've had. Honest about my weak spots and told me exactly what to fix." },
  { name: "Meera D.", rating: 4, when: "1mo", text: "Very structured. Would love slightly longer sessions for test-prep discussions." },
];

function Reviews() {
  return (
    <>
      <PageHeader
        eyebrow="Reputation"
        title="Reviews"
        description="Your public rating is 4.9 / 5 across 132 verified sessions."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {reviews.map((r, i) => (
          <Card key={i}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid size-9 place-items-center rounded-full bg-academic text-[11px] font-bold text-white">
                    {r.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{r.name}</p>
                    <p className="text-[11px] text-muted-foreground">{r.when} ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className={`size-3.5 ${j < r.rating ? "fill-gold text-gold" : "text-muted-foreground/30"}`} />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm text-foreground/85">{r.text}</p>
              <Badge variant="secondary" className="mt-3 text-[10px] font-bold uppercase">Verified session</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
