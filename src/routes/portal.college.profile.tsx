import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/panel/module-page";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/portal/college/profile")({ component: Profile });

function Profile() {
  return (
    <>
      <PageHeader
        eyebrow="Institution"
        title="Profile editor"
        description="Everything students see about your college — hero, accreditations, key stats, admissions contacts and campus story."
        actions={<Button className="bg-brand text-brand-foreground hover:bg-brand/90">Publish changes</Button>}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="space-y-5 p-6">
            <div>
              <h3 className="text-sm font-bold">Basics</h3>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><Label>Institution name</Label><Input defaultValue="Manipal Institute of Technology" /></div>
                <div className="space-y-1.5"><Label>Short name</Label><Input defaultValue="MIT Manipal" /></div>
                <div className="space-y-1.5"><Label>City</Label><Input defaultValue="Manipal" /></div>
                <div className="space-y-1.5"><Label>State</Label><Input defaultValue="Karnataka" /></div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold">About</h3>
              <Textarea
                rows={5}
                className="mt-3"
                defaultValue="MIT Manipal is a constituent institute of Manipal Academy of Higher Education, offering 20+ undergraduate and postgraduate engineering programs across a 313-acre residential campus."
              />
            </div>

            <div>
              <h3 className="text-sm font-bold">Admissions contact</h3>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5"><Label>Email</Label><Input defaultValue="admissions@manipal.edu" /></div>
                <div className="space-y-1.5"><Label>Phone</Label><Input defaultValue="+91 820 292 3000" /></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-bold">Accreditations</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {["NAAC A+", "NBA", "UGC", "AICTE", "NIRF #52"].map((a) => (
                  <Badge key={a} variant="secondary" className="font-bold">{a}</Badge>
                ))}
              </div>
              <Button variant="outline" className="mt-4 w-full">Manage documents</Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-bold">Quick stats</h3>
              <dl className="mt-3 space-y-2 text-sm">
                {[["Founded", "1957"],["Campus size", "313 acres"],["Total students", "28,400"],["Faculty", "1,120"]].map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between">
                    <dt className="text-muted-foreground">{k}</dt><dd className="font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
