import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { LayoutDashboard, Building2, BookOpen, Images, Award, Star, BarChart3, ShieldCheck } from "lucide-react";
import { PanelShell, type PanelNavGroup } from "@/components/panel/panel-shell";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/portal/college")({
  head: () => ({ meta: [{ title: "College portal · EduFinder" }] }),
  component: PortalLayout,
});

const groups: PanelNavGroup[] = [
  { label: "Overview", items: [{ label: "Dashboard", to: "/portal/college", icon: LayoutDashboard }] },
  {
    label: "Manage",
    items: [
      { label: "Institution profile", to: "/portal/college/profile", icon: Building2 },
      { label: "Courses & syllabus", to: "/portal/college/courses", icon: BookOpen, badge: "62" },
      { label: "Gallery", to: "/portal/college/gallery", icon: Images },
      { label: "Scholarships", to: "/portal/college/scholarships", icon: Award },
      { label: "Reviews & ratings", to: "/portal/college/reviews", icon: Star },
      { label: "Analytics", to: "/portal/college/analytics", icon: BarChart3 },
    ],
  },
];

function PortalLayout() {
  return (
    <PanelShell
      brand="MIT Manipal"
      brandBlurb="Verified · College dashboard"
      brandAccent="bg-academic"
      groups={groups}
      user={{ name: "Dr. Ravi Kumar", role: "Registrar", initials: "RK" }}
    >
      <div className="mb-4 flex items-center gap-2 text-xs">
        <Link to="/" className="text-muted-foreground hover:text-foreground">← Back to edufinder.com</Link>
        <span className="text-muted-foreground">·</span>
        <Badge className="border-0 bg-success/15 text-success"><ShieldCheck className="mr-1 size-3" /> Claim verified</Badge>
      </div>
      <Outlet />
    </PanelShell>
  );
}
