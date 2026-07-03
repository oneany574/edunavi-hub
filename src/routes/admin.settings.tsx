import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/panel/module-page";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const Route = createFileRoute("/admin/settings")({ component: Settings });

function Settings() {
  return (
    <>
      <PageHeader
        eyebrow="Platform"
        title="Settings"
        description="Configure branding, team access, notifications and integrations for the EduFinder platform."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="space-y-6 p-6">
            <div>
              <h3 className="text-sm font-bold">Organisation</h3>
              <p className="text-xs text-muted-foreground">This appears in emails, invoices and public pages.</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><Label>Legal name</Label><Input defaultValue="EduFinder Technologies Pvt. Ltd." /></div>
                <div className="space-y-1.5"><Label>Support email</Label><Input defaultValue="hello@edufinder.com" /></div>
                <div className="space-y-1.5"><Label>Default region</Label><Input defaultValue="India" /></div>
                <div className="space-y-1.5"><Label>Timezone</Label><Input defaultValue="Asia/Kolkata (IST)" /></div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-bold">Notifications</h3>
              <div className="mt-4 space-y-3">
                {[
                  ["New claim submitted", true],
                  ["Content flagged 3+ times", true],
                  ["Weekly analytics digest", false],
                  ["Counselor payout ready", true],
                ].map(([label, on]) => (
                  <div key={label as string} className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                    <span className="text-sm">{label}</span>
                    <Switch defaultChecked={on as boolean} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Discard</Button>
              <Button className="bg-brand text-brand-foreground hover:bg-brand/90">Save changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-bold">Team & roles</h3>
            <ul className="mt-4 space-y-3">
              {[
                { name: "Priya Kapoor", role: "Super admin" },
                { name: "Rahul Verma", role: "Editor" },
                { name: "Neha Gupta", role: "Moderator" },
                { name: "Karan Iyer", role: "Analyst" },
              ].map((m) => (
                <li key={m.name} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-semibold">{m.name}</p>
                    <p className="text-[11px] text-muted-foreground">{m.role}</p>
                  </div>
                  <Badge variant="secondary" className="text-[10px] font-bold uppercase">Active</Badge>
                </li>
              ))}
            </ul>
            <Button variant="outline" className="mt-4 w-full">Invite teammate</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
