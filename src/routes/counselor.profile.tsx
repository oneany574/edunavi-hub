import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/panel/module-page";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/counselor/profile")({ component: Profile });

function Profile() {
  return (
    <>
      <PageHeader
        eyebrow="Public profile"
        title="Your counselor profile"
        description="This is what students see when they book a session with you."
        actions={<Button className="bg-brand text-brand-foreground hover:bg-brand/90">Publish</Button>}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="space-y-6 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><Label>Display name</Label><Input defaultValue="Sneha Rao" /></div>
              <div className="space-y-1.5"><Label>Headline</Label><Input defaultValue="US/UK MS admissions · ex-Google" /></div>
              <div className="space-y-1.5"><Label>Model</Label><Input defaultValue="Independent" /></div>
              <div className="space-y-1.5"><Label>Languages</Label><Input defaultValue="English, Hindi, Kannada" /></div>
            </div>

            <div>
              <Label>Bio</Label>
              <Textarea rows={5} className="mt-1.5" defaultValue="9+ years guiding 800+ students into top MS programs across CS, DS and CE. Ex-Google, Stanford MS. I focus on data-backed shortlisting, deep SOP surgery, and honest profile evaluation." />
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-bold">Availability</h3>
              <div className="mt-3 space-y-2">
                {["Accepting new students","Available for weekend sessions","Available for async chat","Offer free 15-min intro"].map((label, i) => (
                  <div key={label} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                    <span className="text-sm">{label}</span>
                    <Switch defaultChecked={i < 3} />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-bold">Specialisations</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {["MS in CS", "MS in DS", "US Ivy League", "UK Russell Group", "SOP review", "Profile eval", "Scholarship strategy"].map((t) => (
                <Badge key={t} variant="secondary" className="font-bold">{t}</Badge>
              ))}
            </div>

            <h3 className="mt-6 text-sm font-bold">Credentials</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>🎓 MS Computer Science, Stanford</li>
              <li>💼 Ex-Software Engineer, Google</li>
              <li>🏆 Top 1% counselor 2025 & 2026</li>
              <li>📈 132 verified reviews · 4.9★</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
